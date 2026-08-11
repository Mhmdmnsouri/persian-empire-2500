import type { JourneySnapshot, ScrollDirection, StationRange } from "./journey.types";

export function clampProgress(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.min(1, Math.max(0, value));
}

export function normalizeGlobalProgress(scrollTop: number, maxScrollableDistance: number): number {
  if (
    !Number.isFinite(scrollTop) ||
    !Number.isFinite(maxScrollableDistance) ||
    maxScrollableDistance <= 0
  ) {
    return 0;
  }

  return clampProgress(scrollTop / maxScrollableDistance);
}

export function normalizeStationProgress(
  globalProgress: number,
  start: number,
  end: number,
): number {
  if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
    return 0;
  }

  return clampProgress((clampProgress(globalProgress) - start) / (end - start));
}

export function getScrollDirection(
  previousProgress: number,
  nextProgress: number,
): ScrollDirection {
  if (nextProgress > previousProgress) {
    return "forward";
  }

  if (nextProgress < previousProgress) {
    return "backward";
  }

  return "idle";
}

export function validateStationRanges(stations: readonly StationRange[]): void {
  if (stations.length === 0) {
    throw new Error("Journey requires at least one station.");
  }

  let previousEnd = 0;

  for (const [index, station] of stations.entries()) {
    if (
      station.index !== index ||
      station.start !== previousEnd ||
      station.end <= station.start ||
      station.end > 1
    ) {
      throw new Error("Journey station ranges must be ordered, contiguous, and within 0 to 1.");
    }

    previousEnd = station.end;
  }

  if (previousEnd !== 1) {
    throw new Error("Journey station ranges must end at 1.");
  }
}

export function resolveActiveStation(
  stations: readonly StationRange[],
  globalProgress: number,
): StationRange {
  validateStationRanges(stations);

  const progress = clampProgress(globalProgress);
  const finalStation = stations.at(-1);

  if (!finalStation) {
    throw new Error("Journey requires at least one station.");
  }

  return (
    stations.find((station) => progress >= station.start && progress < station.end) ?? finalStation
  );
}

export function resolveJourneySnapshot(
  stations: readonly StationRange[],
  previousProgress: number,
  nextProgress: number,
): JourneySnapshot {
  const globalProgress = clampProgress(nextProgress);
  const activeStation = resolveActiveStation(stations, globalProgress);

  return {
    globalProgress,
    activeStation,
    localProgress: normalizeStationProgress(globalProgress, activeStation.start, activeStation.end),
    direction: getScrollDirection(clampProgress(previousProgress), globalProgress),
  };
}
