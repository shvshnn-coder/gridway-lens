import test from 'node:test';
import assert from 'node:assert/strict';
import { fetchPublicEvents, summarizeEvents } from './src/eventData.js';

test('inventory distinguishes unknown prices from free events', () => {
  assert.deepEqual(summarizeEvents([
    { city: 'KL', category: 'Concert', price: null },
    { city: 'KL', category: 'Concert', price: 0 },
    { city: 'PJ', category: 'Workshop', price: 30 },
  ]), { total: 3, cities: 2, free: 1, categories: [{ name: 'Concert', count: 2 }, { name: 'Workshop', count: 1 }] });
});
test('paginates according to server totals and uses public event fields only', async () => {
  let calls = 0;
  const events = await fetchPublicEvents({ url: 'https://example.supabase.co', key: 'public-key', fetcher: async (url, options) => {
    assert.equal(new URL(url).pathname, '/rest/v1/events_pwa');
    assert.equal(options.headers.Range, calls === 0 ? '0-499' : '500-999');
    calls++;
    return new Response(JSON.stringify(Array.from({ length: calls === 1 ? 500 : 1 }, (_, i) => ({ id: `${calls}-${i}`, event_name: 'Event' }))), {
      headers: { 'content-range': calls === 1 ? '0-499/501' : '500-500/501' },
    });
  } });
  assert.equal(calls, 2);
  assert.equal(events.length, 501);
});
test('errors do not become empty success or demo data', async () => {
  await assert.rejects(fetchPublicEvents({}), /Set VITE/);
  await assert.rejects(fetchPublicEvents({ url: 'https://example.supabase.co', key: 'key', fetcher: async () => new Response('', { status: 403 }) }), /HTTP 403/);
  await assert.rejects(fetchPublicEvents({ url: 'https://example.supabase.co', key: 'key', fetcher: async () => new Response('{}') }), /unexpected/);
});
