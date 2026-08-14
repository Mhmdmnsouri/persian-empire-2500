import { describe, expect, it } from "vitest";

import { stationCameraConfigs } from "@/experience/camera.config";
import { resolveDesiredCameraPose } from "@/experience/camera.utils";
import { resolveLamassuMotionState } from "@/stations/lamassu/lamassu.motion";

describe("Lamassu motion", () => {
  it("begins as a silhouette before the face reveal", () => {
    expect(resolveLamassuMotionState(0, "desktop")).toMatchObject({
      artifactVisibility: 0,
      silhouetteVisibility: 1,
      faceReveal: 0,
    });
  });

  it("reveals face, body, and wing detail in order", () => {
    const state = resolveLamassuMotionState(0.62, "desktop");

    expect(state.faceReveal).toBe(1);
    expect(state.bodyReveal).toBe(1);
    expect(state.wingReveal).toBeGreaterThan(0);
  });

  it("returns the identical state when progress moves backward", () => {
    expect(resolveLamassuMotionState(0.48, "desktop")).toEqual(
      resolveLamassuMotionState(0.48, "desktop"),
    );
  });

  it("limits the mobile orbit and removes it for reduced motion", () => {
    const desktop = resolveLamassuMotionState(1, "desktop");
    const mobile = resolveLamassuMotionState(1, "mobile");
    const reduced = resolveLamassuMotionState(0.5, "reduced");

    expect(mobile.rotationY).toBeLessThan(desktop.rotationY);
    expect(mobile.rotationY).toBeLessThanOrEqual(Math.PI * (25 / 180));
    expect(reduced.rotationY).toBe(0);
    expect(reduced.artifactVisibility).toBe(1);
  });

  it("uses the shorter mobile camera path", () => {
    const desktopEnd = resolveDesiredCameraPose(stationCameraConfigs.lamassu, 1, "desktop");
    const mobileEnd = resolveDesiredCameraPose(stationCameraConfigs.lamassu, 1, "mobile");

    expect(Math.abs(mobileEnd.position[0])).toBeLessThan(Math.abs(desktopEnd.position[0]));
  });
});
