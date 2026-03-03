# TideGlass · South Shore & Cape Cod Forecast

A Massachusetts-focused fishing forecast board (Plymouth → Provincetown) built with Next.js 15 (App Router), Tailwind, and Supabase. It surfaces dialed-in bite windows, tide + moon intel, and lets the crew drop new spots straight into Supabase. Designed to deploy on Vercel.

## Stack

- **Next.js 15** with the App Router, server actions, and Suspense
- **Tailwind CSS** for glassy gradients and fast layout work
- **Supabase** (Postgres + Auth) as the live intel store
- **Vercel** for hosting, edge caching, and env orchestration

## Local Development

```bash
npm install
npm run dev
# http://localhost:3000
```

Create a `.env.local` based on the sample:

```bash
cp .env.example .env.local
```

## Supabase

1. `supabase projects create` (or use the dashboard) and grab:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
2. Run this SQL in the SQL editor to create the table TideGlass expects:

```sql
create table public.forecasts (
  id uuid primary key default gen_random_uuid(),
  location text not null,
  region text not null,
  species text[] default '{}',
  tide_phase text,
  moon_phase text,
  wind text,
  temperature text,
  water_temp text,
  rating int default 4,
  window_start timestamptz not null,
  window_end timestamptz not null,
  notes text,
  inserted_at timestamptz default now()
);

alter table public.forecasts enable row level security;
create policy "Anon can read forecasts"
  on public.forecasts for select using (true);
create policy "Service role can insert"
  on public.forecasts for insert with check (true);
```

Server actions that write require the service role key (kept server side only). Reads on the client use the anon key.

## Deploying on Vercel

```bash
npm install -g vercel
vercel login   # once
vercel link    # inside repo
vercel env pull .env.local
vercel --prod
```

Or use the GitHub integration and set the three Supabase env vars in the Vercel dashboard.

## Repo Scripts

- `npm run dev` – local dev server
- `npm run build` – production build
- `npm run lint` – Next.js linting

## Roadmap

- Hook to real marine + solunar APIs for auto-updated context
- User auth for private crews
- SMS/push alerts 90 minutes before the best window

PRs + feedback welcome.
