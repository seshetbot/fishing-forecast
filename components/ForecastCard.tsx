import { format, formatDistanceStrict } from "date-fns";
import { Forecast } from "@/types";

const ratingCopy = [
  "Tough bite",
  "Fair",
  "Worth a look",
  "Dialed-in",
  "Fire",
];

export function ForecastCard({ forecast }: { forecast: Forecast }) {
  const start = new Date(forecast.windowStart);
  const end = new Date(forecast.windowEnd);

  return (
    <article className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/60 via-slate-900/20 to-slate-900/40 p-6 shadow-xl shadow-slate-900/20 backdrop-blur">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-emerald-300/70">
            {forecast.region}
          </p>
          <h3 className="text-2xl font-semibold text-white">{forecast.location}</h3>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400">Best window</p>
          <p className="font-mono text-base text-white">
            {format(start, "EEE, MMM d")} · {format(start, "p")} – {format(end, "p")}
          </p>
          <p className="text-xs text-slate-500">
            {formatDistanceStrict(end, start)} of current
          </p>
        </div>
      </header>

      <dl className="mt-5 grid grid-cols-2 gap-4 text-sm text-slate-200 sm:grid-cols-4">
        <div>
          <dt className="text-xs uppercase tracking-[0.3em] text-slate-400">Tide</dt>
          <dd className="font-medium text-white">{forecast.tidePhase}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.3em] text-slate-400">Moon</dt>
          <dd className="font-medium text-white">{forecast.moonPhase}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.3em] text-slate-400">Wind</dt>
          <dd className="font-medium text-white">{forecast.wind}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.3em] text-slate-400">Temps</dt>
          <dd className="font-medium text-white">
            {forecast.temperature} · {forecast.waterTemp}
          </dd>
        </div>
      </dl>

      <footer className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Targets</p>
          <div className="mt-1 flex flex-wrap gap-2">
            {forecast.species.map((species) => (
              <span
                key={species}
                className="rounded-full border border-emerald-400/40 px-3 py-1 text-xs font-medium text-emerald-200"
              >
                {species}
              </span>
            ))}
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400">Confidence</p>
          <p className="text-2xl font-semibold text-emerald-300">
            {forecast.rating}/5
          </p>
          <p className="text-xs text-emerald-200/80">
            {ratingCopy[forecast.rating - 1] ?? "Solid"}
          </p>
        </div>
      </footer>

      <p className="mt-4 rounded-2xl border border-white/5 bg-white/5 p-4 text-sm text-slate-100">
        {forecast.notes}
      </p>
    </article>
  );
}
