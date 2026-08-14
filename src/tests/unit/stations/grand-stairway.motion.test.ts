import { describe, expect, it } from "vitest";

import { stationCameraConfigs } from "@/experience/camera.config";
import { resolveDesiredCameraPose } from "@/experience/camera.utils";
import {
  getGrandStairwayStepBrightness,
  resolveGrandStairwayMotionState,
} from "@/stations/grand-stairway/grand-stairway.motion";

describe("Grand Stairway motion", () => {
  it("starts with only the first step assembling", () => {
    const state = resolveGrandStairwayMotionState(0.1, "desktop");

    expect(state.stepAssembly[0]).toBeGreaterThan(0);
    expect(state.stepAssembly[1]).toBe(0);
    expect(state.reliefReveal).toBe(0);
  });

  it("assembles the stairway before revealing the reliefs", () => {
    const state = resolveGrandStairwayMotionState(0.75, "desktop");

    expect(state.stepAssembly.every((assembly) => assembly === 1)).toBe(true);
    expect(state.sideWallAssembly).toBe(1);
    expect(state.reliefReveal).toBeGreaterThan(0);
  });

  it("reconstructs the same state when scrolling backward", () => {
    const forward = resolveGrandStairwayMotionState(0.45, "desktop");
    const backward = resolveGrandStairwayMotionState(0.45, "desktop");

    expect(backward).toEqual(forward);
  });

  it("darkens lower steps and introduces the Lamassu silhouette at exit", () => {
    const state = resolveGrandStairwayMotionState(1, "desktop");

    expect(state.transitionToLamassu).toBe(1);
    expect(getGrandStairwayStepBrightness(1, 0, 9, "desktop")).toBeLessThan(
      getGrandStairwayStepBrightness(1, 8, 9, "desktop"),
    );
  });

  it("uses fewer steps on mobile and a static completed reduced-motion state", () => {
    expect(resolveGrandStairwayMotionState(0.5, "mobile").stepAssembly).toHaveLength(6);
    expect(resolveGrandStairwayMotionState(0, "reduced").stepAssembly.every(Boolean)).toBe(true);
  });

  it("moves the shared camera forward and upward through the station", () => {
    const start = resolveDesiredCameraPose(stationCameraConfigs["grand-stairway"], 0, "desktop");
    const end = resolveDesiredCameraPose(stationCameraConfigs["grand-stairway"], 1, "desktop");

    expect(end.position[2]).toBeLessThan(start.position[2]);
    expect(end.position[1]).toBeGreaterThan(start.position[1]);
  });
});
