export async function fetchPublicEvents({ url, key, signal, fetcher = fetch }) {
  if (!url || !key) throw new Error('Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to connect GridWay.');
  const endpoint = new URL('/rest/v1/events_pwa', url);
  if (endpoint.protocol !== 'https:') throw new Error('The Supabase URL must use HTTPS.');
  endpoint.searchParams.set('select', 'id,event_name,category,city,start_date,start_time,venue,price,currency,link');
  endpoint.searchParams.set('order', 'start_date.asc,id.asc');
  const events = [];
  // Range pagination prevents a default 1,000-row response becoming a false total.
  for (let offset = 0; offset < 10000; offset += 500) {
    const response = await fetcher(endpoint.toString(), {
      signal,
      cache: 'no-store',
      headers: { apikey: key, Range: `${offset}-${offset + 499}`, 'Range-Unit': 'items', Prefer: 'count=exact' },
    });
    if (!response.ok) throw new Error(`GridWay event feed could not be loaded (HTTP ${response.status}).`);
    const page = await response.json();
    if (!Array.isArray(page) || page.some(e => !e || typeof e.id !== 'string' || typeof e.event_name !== 'string')) {
      throw new Error('GridWay returned an unexpected event response.');
    }
    events.push(...page);
    const range = response.headers.get('content-range');
    const total = range && /\/(\d+)$/.exec(range);
    if (total && events.length >= Number(total[1])) return events;
    if (!total && page.length < 500) return events;
    if (!page.length) throw new Error('The event feed changed during loading. Please refresh.');
  }
  throw new Error('The event feed exceeds this dashboard’s inventory limit. Narrow reporting is required.');
}

export function summarizeEvents(events) {
  const categories = new Map();
  for (const event of events) {
    const name = event.category || 'Other';
    categories.set(name, (categories.get(name) || 0) + 1);
  }
  return {
    total: events.length,
    cities: new Set(events.map(e => e.city).filter(Boolean)).size,
    free: events.filter(e => e.price !== null && e.price !== '' && Number(e.price) === 0).length,
    categories: [...categories].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count),
  };
}
