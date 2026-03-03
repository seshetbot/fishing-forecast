import { Forecast } from "@/types";

function getWarmestWaterLocation(forecasts: Forecast[]) {
  return forecasts
    .slice()
    .sort((a, b) => parseInt(b.waterTemp, 10) - parseInt(a.waterTemp, 10))[0]?.location;
}

function getTrendingSpecies(forecasts: Forecast[]) {
  const counts = forecasts
    .flatMap((forecast) => forecast.species)
    .reduce<Record<string, number>>((acc, species) => {
      acc[species] = (acc[species] ?? 0) + 1;
      return acc;
    }, {});
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([species]) => species)
    .join(" + ");
}

export function Highlights({ forecasts }: { forecasts: Forecast[] }) {
  const warmest = getWarmestWaterLocation(forecasts) ?? "Need data";
  const trending = getTrendingSpecies(forecasts) || "Share intel";

  return (
    <section className="grid gap-4 md:grid-cols-3">
      <div className="rounded-3xl border border-emerald-400/30 bg-emerald-500/10 p-4">
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/80">Prime bite windows</p>
        <p className="mt-2 text-3xl font-semibold text-white">{forecasts.length}</p>
        <p className="text-sm text-emerald-50/70">Dialed-in spots ready to run</p>
      </div>
      <div className="rounded-3xl border border-slate-400/20 bg-slate-900/40 p-4">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-300/70">Warmest water</p>
        <p className="mt-2 text-3xl font-semibold text-white">{warmest}</p>
        <p className="text-sm text-slate-200/80">Perfect for topwater confidence</p>
      </div>
      <div className="rounded-3xl border border-indigo-400/30 bg-indigo-500/10 p-4">
        <p className="text-xs uppercase tracking-[0.3em] text-indigo-200/80">Targets trending</p>
        <p className="mt-2 text-3xl font-semibold text-white">{trending}</p>
        <p className="text-sm text-indigo-50/70">Based on current hot runs</p>
      </div>
    </section>
  );
}
