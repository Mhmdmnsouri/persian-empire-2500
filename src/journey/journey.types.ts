export const stationIds = ["intro", "grand-stairway", "lamassu", "bull-capital", "outro"] as const;

export type StationId = (typeof stationIds)[number];

export type ScrollDirection = "forward" | "backward" | "idle";

export type StationRange = Readonly<{
  id: StationId;
  index: number;
  start: number;
  end: number;
}>;

export type JourneySnapshot = Readonly<{
  globalProgress: number;
  activeStation: StationRange;
  localProgress: number;
  direction: ScrollDirection;
}>;
