import { Suspense } from "react";
import { getForecasts } from "@/lib/getForecasts";
import { SearchBar } from "@/components/SearchBar";
import { ForecastCard } from "@/components/ForecastCard";
import { Highlights } from "@/components/Highlights";
import { SpotForm } from "@/components/SpotForm";

export default async function Home({
  searchParams,
}: {
  searchParams?: { q?: string | string[] };
}) {
  const queryParam = searchParams?.q;
  const query = Array.isArray(queryParam) ? queryParam[0] : queryParam;
  const forecasts = await getForecasts(query);

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 sm:px-8">
      <section className="relative overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-slate-900/60 via-slate-900/20 to-slate-900/60 p-10 shadow-2xl shadow-emerald-900/30">
        <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl" />
        <p className="text-xs uppercase tracking-[0.5em] text-emerald-200/80">Realtime intel</p>
        <div className="mt-4 flex flex-wrap items-end gap-6">
          <div className="max-w-2xl space-y-3">
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
              South Shore & Cape Cod bite windows before the text thread even lights up.
            </h1>
            <p className="text-lg text-slate-200/80">
              TideGlass watches Plymouth through Provincetown—mixing tides, moon, and crew-sourced Supabase logs—to
              surface which beaches, rips, and flats are actually firing today.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-right text-sm">
            <p className="text-slate-200/70">Supabase sync</p>
            <p className="font-mono text-lg text-emerald-300">
              {process.env.NEXT_PUBLIC_SUPABASE_URL ? "connected" : "standby"}
            </p>
          </div>
        </div>
        <div className="mt-8">
          <Suspense fallback={<div className="h-12 animate-pulse rounded-full bg-white/10" />}>
            <SearchBar />
          </Suspense>
        </div>
      </section>

      <Highlights forecasts={forecasts} />

      {forecasts.length === 0 ? (
        <p className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-lg text-slate-200">
          No intel yet for that search. Drop a note below or remove filters.
        </p>
      ) : (
        <section className="grid gap-6 lg:grid-cols-2">
          {forecasts.map((forecast) => (
            <ForecastCard key={forecast.id} forecast={forecast} />
          ))}
        </section>
      )}

      <SpotForm />
    </main>
  );
}
