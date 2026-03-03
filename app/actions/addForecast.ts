"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const formSchema = z.object({
  location: z.string().min(3, "Add a location"),
  region: z.string().min(2),
  species: z.string().min(2),
  tidePhase: z.string().min(2),
  moonPhase: z.string().min(2),
  wind: z.string().min(2),
  temperature: z.string().min(2),
  waterTemp: z.string().min(2),
  windowStart: z.string(),
  windowEnd: z.string(),
  notes: z.string().optional(),
});

export async function addForecast(prevState: { status: string; message: string }, formData: FormData) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return {
      status: "error",
      message: "Supabase credentials missing. Add them to deploy the form.",
    };
  }

  const parsed = formSchema.safeParse({
    location: formData.get("location")?.toString() ?? "",
    region: formData.get("region")?.toString() ?? "",
    species: formData.get("species")?.toString() ?? "",
    tidePhase: formData.get("tidePhase")?.toString() ?? "",
    moonPhase: formData.get("moonPhase")?.toString() ?? "",
    wind: formData.get("wind")?.toString() ?? "",
    temperature: formData.get("temperature")?.toString() ?? "",
    waterTemp: formData.get("waterTemp")?.toString() ?? "",
    windowStart: formData.get("windowStart")?.toString() ?? "",
    windowEnd: formData.get("windowEnd")?.toString() ?? "",
    notes: formData.get("notes")?.toString() ?? undefined,
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Invalid submission",
    };
  }

  try {
    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false },
    });

    const payload = {
      location: parsed.data.location,
      region: parsed.data.region,
      species: parsed.data.species.split(",").map((s) => s.trim()),
      tide_phase: parsed.data.tidePhase,
      moon_phase: parsed.data.moonPhase,
      wind: parsed.data.wind,
      temperature: parsed.data.temperature,
      water_temp: parsed.data.waterTemp,
      window_start: parsed.data.windowStart,
      window_end: parsed.data.windowEnd,
      rating: 4,
      notes: parsed.data.notes ?? "",
    };

    const { error } = await supabase.from("forecasts").insert(payload);

    if (error) {
      return { status: "error", message: error.message };
    }

    revalidatePath("/");
    return { status: "success", message: "Spot logged!" };
  } catch (error) {
    console.error("Failed to add forecast", error);
    return { status: "error", message: "Could not reach Supabase" };
  }
}
