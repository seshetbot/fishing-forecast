"use client";

import { useActionState } from "react";
import { addForecast } from "@/app/actions/addForecast";

const initialState = { status: "idle", message: "" };

export function SpotForm() {
  const [state, formAction] = useActionState(addForecast, initialState);

  return (
    <form
      action={formAction}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white backdrop-blur"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-200/70">Share intel</p>
          <h3 className="text-xl font-semibold">Log a local pattern</h3>
        </div>
        <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-slate-200">
          Beta
        </span>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <label className="space-y-1 text-sm">
          <span className="text-slate-200/80">Location</span>
          <input name="location" className="input" placeholder="Cape May, NJ" required />
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-slate-200/80">Region/system</span>
          <input name="region" className="input" placeholder="Delaware Bay" required />
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-slate-200/80">Target species (comma separated)</span>
          <input name="species" className="input" placeholder="Striped Bass, Weakfish" required />
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-slate-200/80">Tide phase</span>
          <input name="tidePhase" className="input" placeholder="First light incoming" required />
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-slate-200/80">Moon</span>
          <input name="moonPhase" className="input" placeholder="Waning gibbous" required />
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-slate-200/80">Wind</span>
          <input name="wind" className="input" placeholder="SW 10 kt" required />
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-slate-200/80">Air temp</span>
          <input name="temperature" className="input" placeholder="65°F" required />
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-slate-200/80">Water temp</span>
          <input name="waterTemp" className="input" placeholder="58°F" required />
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-slate-200/80">Window start</span>
          <input type="datetime-local" name="windowStart" className="input" required />
        </label>
        <label className="space-y-1 text-sm">
          <span className="text-slate-200/80">Window end</span>
          <input type="datetime-local" name="windowEnd" className="input" required />
        </label>
      </div>

      <label className="mt-4 block space-y-1 text-sm">
        <span className="text-slate-200/80">Tactics + notes</span>
        <textarea
          name="notes"
          rows={3}
          className="input resize-none"
          placeholder="Slack tide? Retrieve cadence? Bait mix?"
        />
      </label>

      {state.status !== "idle" && (
        <p
          className={`mt-3 text-sm ${state.status === "success" ? "text-emerald-200" : "text-rose-200"}`}
        >
          {state.message}
        </p>
      )}

      <button
        type="submit"
        className="mt-5 w-full rounded-full bg-emerald-400/90 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={state.status === "pending"}
      >
        Push intel to Supabase
      </button>
      <p className="mt-2 text-xs text-slate-300/70">
        Form posts only once Supabase keys are wired. Without them it’s a demo surface.
      </p>
    </form>
  );
}
