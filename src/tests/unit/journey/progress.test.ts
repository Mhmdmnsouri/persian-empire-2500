import { describe, expect, it } from "vitest";

import { journeyStations } from "@/journey/journey.config";
import {
  getScrollDirection,
  normalizeGlobalProgress,
  normalizeStationProgress,
  resolveActiveStation,
  resolveJourneySnapshot,
  validateStationRanges,
} from "@/journey/progress";

describe("journey progress", () => {
  it("normalizes document scroll progress and clamps its bounds", () => {
    expect(normalizeGlobalProgress(-20, 400)).toBe(0);
    expect(normalizeGlobalProgress(200, 400)).toBe(0.5);
    expect(normalizeGlobalProgress(600, 400)).toBe(1);
    expect(normalizeGlobalProgress(100, 0)).toBe(0);
  });

  it("normalizes station-local progress at boundaries and midpoint", () => {
    expect(normalizeStationProgress(0.2, 0.25, 0.5)).toBe(0);
    expect(normalizeStationProgress(0.375, 0.25, 0.5)).toBe(0.5);
    expect(normalizeStationProgress(0.5, 0.25, 0.5)).toBe(1);
    expect(normalizeStationProgress(0.3, 0.25, 0.25)).toBe(0);
  });

  it("resolves first, middle, final, and exact station boundaries", () => {
    expect(resolveActiveStation(journeyStations, 0).id).toBe("intro");
    expect(resolveActiveStation(journeyStations, 0.5).id).toBe("lamassu");
    expect(resolveActiveStation(journeyStations, 0.9).id).toBe("outro");
    expect(resolveActiveStation(journeyStations, 1).id).toBe("outro");
  });

  it("rejects station configurations with gaps or overlaps", () => {
    expect(() =>
      validateStationRanges([
        { id: "intro", index: 0, start: 0, end: 0.4 },
        { id: "outro", index: 1, start: 0.5, end: 1 },
      ]),
    ).toThrow();
    expect(() =>
      validateStationRanges([
        { id: "intro", index: 0, start: 0, end: 0.6 },
        { id: "outro", index: 1, start: 0.5, end: 1 },
      ]),
    ).toThrow();
  });

  it("reports forward, backward, and unchanged scroll direction", () => {
    expect(getScrollDirection(0.2, 0.3)).toBe("forward");
    expect(getScrollDirection(0.3, 0.2)).toBe("backward");
    expect(getScrollDirection(0.2, 0.2)).toBe("idle");
  });

  it("reconstructs station state during forward and backward scroll", () => {
    const forward = resolveJourneySnapshot(journeyStations, 0.48, 0.52);
    const backward = resolveJourneySnapshot(journeyStations, 0.52, 0.48);

    expect(forward.activeStation.id).toBe("lamassu");
    expect(forward.localProgress).toBeCloseTo(0.08);
    expect(forward.direction).toBe("forward");
    expect(backward.activeStation.id).toBe("grand-stairway");
    expect(backward.localProgress).toBeCloseTo(0.92);
    expect(backward.direction).toBe("backward");
  });
});
