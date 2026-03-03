import { createClient } from "@supabase/supabase-js";
import { Forecast } from "@/types";
import { fallbackForecasts } from "@/data/fallbackForecasts";

const FALLBACK_DELAY_MS = 300;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getForecasts(searchTerm?: string): Promise<Forecast[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    if (searchTerm) {
      return fallbackForecasts.filter((forecast) =>
        forecast.location.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    return fallbackForecasts;
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    });

    let query = supabase.from("forecasts").select("*").order("windowStart", { ascending: true });

    if (searchTerm && searchTerm.trim().length) {
      query = query.ilike("location", `%${searchTerm}%`);
    }

    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      await delay(FALLBACK_DELAY_MS);
      return fallbackForecasts;
    }

    return data.map((row) => ({
      id: row.id ?? crypto.randomUUID(),
      location: row.location,
      region: row.region,
      tidePhase: row.tide_phase,
      moonPhase: row.moon_phase,
      wind: row.wind,
      temperature: row.temperature,
      waterTemp: row.water_temp,
      species: row.species ?? [],
      rating: row.rating ?? 3,
      windowStart: row.window_start,
      windowEnd: row.window_end,
      notes: row.notes ?? "",
    }));
  } catch (err) {
    console.error("Failed to fetch forecasts from Supabase", err);
    await delay(FALLBACK_DELAY_MS);
    return fallbackForecasts;
  }
}
