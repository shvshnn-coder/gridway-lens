import { useEffect, useState } from 'react';
import { fetchPublicEvents, summarizeEvents } from './eventData.js';
import './live-events.css';

function publicLink(link) {
  try { return new URL(link).protocol === 'https:' ? link : null; } catch { return null; }
}

export default function LiveEvents({ overview }) {
  const [result, setResult] = useState({ loading: true, events: [], error: '', updated: null });
  const [refresh, setRefresh] = useState(0);
  const [city, setCity] = useState('');
  const [search, setSearch] = useState('');
  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    fetchPublicEvents({
      url: import.meta.env.VITE_SUPABASE_URL,
      key: import.meta.env.VITE_SUPABASE_ANON_KEY,
      signal: controller.signal,
    }).then(events => {
      if (active && !controller.signal.aborted) setResult({ loading: false, events, error: '', updated: new Date() });
    }).catch(error => {
      if (!active) return;
      setResult({ loading: false, events: [], updated: null,
        error: controller.signal.aborted ? 'The feed request timed out. Please refresh.' : error.message });
    }).finally(() => clearTimeout(timeout));
    return () => { active = false; clearTimeout(timeout); controller.abort(); };
  }, [refresh]);

  const cities = [...new Set(result.events.map(e => e.city).filter(Boolean))].sort();
  const visible = result.events.filter(e => (!city || e.city === city)
    && `${e.event_name} ${e.venue || ''} ${e.category || ''}`.toLowerCase().includes(search.toLowerCase()));
  const stats = summarizeEvents(visible);
  return <section className="gl-live" aria-label="Live GridWay events">
    <div className="gl-live-status">
      <div><b>GridWay public event feed</b><br />
        <span>{result.loading ? 'Connecting…' : result.error ? 'Connection unavailable' : `Updated ${result.updated.toLocaleString('en-MY', { timeZone: 'Asia/Kuala_Lumpur' })} MYT`}</span>
      </div>
      <button onClick={() => { setResult({ loading: true, events: [], error: '', updated: null }); setRefresh(n => n + 1); }} disabled={result.loading}>Refresh</button>
    </div>
    <p>Current public events from the same feed as GridWay. Dates use Asia/Kuala_Lumpur. Activity, attendance and revenue are not connected.</p>
    {result.loading ? <p role="status">Loading current events…</p> : result.error ? <p role="alert">{result.error}</p> : <>
      <div className="gl-live-controls">
        <label>City <select value={city} onChange={e => setCity(e.target.value)}><option value="">All cities</option>{cities.map(c => <option key={c}>{c}</option>)}</select></label>
        <label>Search <input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Event, category or venue" /></label>
      </div>
      <div className="gl-kpi-row">
        {[["Current events", stats.total], ["Cities", stats.cities], ["Free events", stats.free]].map(([label, value]) => <div className="gl-kpi" key={label}><div className="gl-kpi-label">{label}</div><div className="gl-kpi-value">{value}</div></div>)}
      </div>
      {overview && <div className="gl-panel"><div className="gl-panel-title">Event supply by category</div>
        <div className="gl-live-categories">{stats.categories.map(c => <span key={c.name}>{c.name}: <b>{c.count}</b></span>)}</div>
      </div>}
      <div className="gl-panel gl-live-table">
        <div className="gl-panel-title">{overview ? 'Current event inventory' : 'Published events'} · {visible.length}</div>
        {!visible.length ? <p>No current events match. This is live data, with no sample fallback.</p> : <table className="gl-table">
          <thead><tr><th>Event</th><th>Date</th><th>City</th><th>Venue</th><th>Category</th><th>Price</th></tr></thead>
          <tbody>{visible.map(event => <tr key={event.id}>
            <td className="gl-strong">{publicLink(event.link) ? <a href={publicLink(event.link)} target="_blank" rel="noopener noreferrer">{event.event_name}</a> : event.event_name}</td>
            <td>{event.start_date} {event.start_time?.slice(0, 5)}</td><td>{event.city}</td><td>{event.venue || 'Not provided'}</td><td>{event.category || 'Other'}</td>
            <td>{event.price === null ? 'Unknown' : Number(event.price) === 0 ? 'Free' : `${event.currency || 'Currency unspecified'} ${event.price}`}</td>
          </tr>)}</tbody>
        </table>}
      </div>
    </>}
  </section>;
}
