import { Forecast } from "@/types";

export const fallbackForecasts: Forecast[] = [
  {
    id: "sf-bay",
    location: "San Francisco Bay, CA",
    region: "Pacific Northwest Swell",
    tidePhase: "Incoming (6.2 ft → 7.8 ft)",
    moonPhase: "Waning Gibbous",
    wind: "NW 8 kt",
    temperature: "61°F air",
    waterTemp: "54°F water",
    species: ["Striped Bass", "Halibut"],
    rating: 4,
    windowStart: "2026-03-03T05:30:00-08:00",
    windowEnd: "2026-03-03T09:30:00-08:00",
    notes:
      "Drift live anchovies along the flats near Oyster Point. Watch for bird schools pushing bait north.",
  },
  {
    id: "okeechobee",
    location: "Lake Okeechobee, FL",
    region: "Everglades Inflow",
    tidePhase: "Reservoir drawdown",
    moonPhase: "Waning Gibbous",
    wind: "E 5 kt",
    temperature: "78°F air",
    waterTemp: "72°F water",
    species: ["Largemouth Bass", "Crappie"],
    rating: 5,
    windowStart: "2026-03-03T06:00:00-05:00",
    windowEnd: "2026-03-03T10:30:00-05:00",
    notes:
      "Work grass edges with subtle topwater walkers at first light, then switch to punching hyacinth mats.",
  },
  {
    id: "cape-cod",
    location: "Cape Cod Canal, MA",
    region: "Atlantic Jet",
    tidePhase: "Slack to Eastbound",
    moonPhase: "Waning Gibbous",
    wind: "SW 12 kt",
    temperature: "48°F air",
    waterTemp: "44°F water",
    species: ["Striped Bass"],
    rating: 3,
    windowStart: "2026-03-03T16:15:00-05:00",
    windowEnd: "2026-03-03T19:00:00-05:00",
    notes:
      "Needlefish plugs in the west end during slack, then switch to darters once the eastbound current builds.",
  },
];
