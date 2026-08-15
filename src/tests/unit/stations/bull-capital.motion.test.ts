import { describe, expect, it } from "vitest";

import { stationCameraConfigs } from "@/experience/camera.config";
import { resolveDesiredCameraPose } from "@/experience/camera.utils";
import { resolveBullCapitalMotionState } from "@/stations/bull-capital/bull-capital.motion";
import { resolveLamassuMotionState } from "@/stations/lamassu/lamassu.motion";

describe("Bull Capital motion", () => {
  it("presents the capital before assembling the supporting structure", () => {
    const state = resolveBullCapitalMotionState(0, "desktop");

    expect(state.capitalOffsetY).toBeGreaterThan(0);
    expect(state.baseAssembly).toBe(0);
    expect(state.shaftAssembly).toBe(0);
  });

  it("assembles the base, shaft, connector, capital, and beam in order", () => {
    const shaft = resolveBullCapitalMotionState(0.48, "desktop");
    const completed = resolveBullCapitalMotionState(1, "desktop");

    expect(shaft.baseAssembly).toBe(1);
    expect(shaft.shaftAssembly).toBeGreaterThan(0);
    expect(shaft.connectorAssembly).toBe(0);
    expect(completed).toMatchObject({
      baseAssembly: 1,
      shaftAssembly: 1,
      connectorAssembly: 1,
      capitalAssembly: 1,
      beamAssembly: 1,
      capitalOffsetY: 0,
      beamOffsetZ: 0,
    });
  });

  it("reconstructs the same exploded state when progress moves backward", () => {
    expect(resolveBullCapitalMotionState(0.69, "desktop")).toEqual(
      resolveBullCapitalMotionState(0.69, "desktop"),
    );
  });

  it("hands off from the Lamassu transition to the isolated capital", () => {
    expect(resolveLamassuMotionState(1, "desktop").transitionToBullCapital).toBe(1);
    expect(resolveBullCapitalMotionState(0, "desktop")).toMatchObject({
      baseAssembly: 0,
      beamAssembly: 0,
    });
  });

  it("shortens the mobile explosion and makes reduced motion complete", () => {
    expect(resolveBullCapitalMotionState(0, "mobile").capitalOffsetY).toBeLessThan(
      resolveBullCapitalMotionState(0, "desktop").capitalOffsetY,
    );
    expect(resolveBullCapitalMotionState(0, "reduced")).toMatchObject({
      beamAssembly: 1,
      capitalOffsetY: 0,
    });
  });

  it("uses a shorter mobile camera path while the desktop camera pulls back for the beam", () => {
    const desktopStart = resolveDesiredCameraPose(stationCameraConfigs["bull-capital"], 0, "desktop");
    const desktopEnd = resolveDesiredCameraPose(stationCameraConfigs["bull-capital"], 1, "desktop");
    const mobileEnd = resolveDesiredCameraPose(stationCameraConfigs["bull-capital"], 1, "mobile");

    expect(desktopEnd.position[2]).toBeGreaterThan(desktopStart.position[2]);
    expect(mobileEnd.position[2]).toBeLessThan(desktopEnd.position[2]);
  });
});
