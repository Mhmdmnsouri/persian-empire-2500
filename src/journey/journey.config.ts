import type { StationRange } from "./journey.types";

export const journeyStations = [
  { id: "intro", index: 0, start: 0, end: 0.25 },
  { id: "grand-stairway", index: 1, start: 0.25, end: 0.5 },
  { id: "lamassu", index: 2, start: 0.5, end: 0.75 },
  { id: "bull-capital", index: 3, start: 0.75, end: 0.9 },
  { id: "outro", index: 4, start: 0.9, end: 1 },
] as const satisfies readonly StationRange[];
