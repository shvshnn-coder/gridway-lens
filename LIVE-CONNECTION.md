# Lens public GridWay connection

Overview and Events now load the existing public `events_pwa` feed. No sign-in, new SQL, private analytics access or service credentials are required. All visitors to the deployed dashboard can see this public event inventory.

Live values: current event count, city count, free event count, category supply, event names/dates/venues/prices and available registration links. City/search filters apply to these values. The reporting window is the feed's current public active events, using its Kuala Lumpur date filter, rather than a fabricated historical period. Refresh re-fetches the feed; this is not a realtime subscription.

Audience, Discovery, Venue and Revenue retain their design previews with a prominent demo label. Activity, save, attendance, demand and revenue metrics are not connected. Existing feed limitations (null images, category mapping and registration-only links) remain database work.

## Configuration and deployment

Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to the SAME public values used by the live GridWay project. Use a Supabase anon key or publishable key, never a service-role or secret key. These values are included in the browser build by design.

For local use put them in ignored `.env.local`, using `.env.example` as the template. For Vercel, set them in the Lens project's environment variables for the intended deployment environment, then deploy the updated working source and rebuild. Configuring variables alone does not update old dashboard code. The public feed and underlying venue/event SELECT access must remain available to anon.

After deployment open Overview: verify a successful update timestamp and reconcile event names with GridWay. Try city/search filters, Events, Refresh, a no-match search and an unavailable connection. The app does not substitute demos for failed or empty live results. Other tabs display their explicit demo notice.

## Verification

`npm test` passes three data tests covering free-versus-unknown prices, pagination and failure handling. Production build passes, including PWA generation. New data/component modules are checked with ESLint. The install repaired missing optional dependency metadata in the existing lockfile. No live HTTP connection, browser visual check or Vercel deployment has been confirmed for this change.

No environment values are included in this branch. Match the public configuration to the live GridWay Vercel environment before deployment. Setting variables alone does not upload this source change. Merge the branch connected to Vercel or deploy this directory through Vercel CLI.
