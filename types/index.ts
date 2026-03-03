export type Forecast = {
  id: string;
  location: string;
  region: string;
  tidePhase: string;
  moonPhase: string;
  wind: string;
  temperature: string;
  waterTemp: string;
  species: string[];
  rating: number;
  windowStart: string;
  windowEnd: string;
  notes: string;
};
