import { describe, expect, it } from "vitest";
import {
  damp,
  interpolateCameraPose,
  resolveCameraProfile,
  resolveDesiredCameraPose,
  validateCameraConfig,
} from "@/experience/camera.utils";
import type { StationCameraConfig } from "@/experience/camera.types";

const config: StationCameraConfig = {
  stationId: "intro",
  keyframes: [
    { progress: 0, position: [0, 0, 0], target: [0, 1, 0], fov: 40 },
    { progress: 1, position: [2, 4, 6], target: [3, 2, 1], fov: 50 },
  ],
  mobileKeyframes: [{ progress: 0, position: [0, 0, 4], target: [0, 1, 0], fov: 46 }],
  reducedMotionKeyframes: [{ progress: 0, position: [0, 0, 5], target: [0, 1, 0], fov: 45 }],
};
describe("camera utilities", () => {
  it("interpolates independent position, target, and FOV tracks", () => {
    expect(interpolateCameraPose(config.keyframes, 0.5)).toEqual({
      position: [1, 2, 3],
      target: [1.5, 1.5, 0.5],
      fov: 45,
      roll: 0,
    });
  });
  it("resolves desktop, mobile, and reduced profiles", () => {
    expect(resolveCameraProfile(false, false)).toBe("desktop");
    expect(resolveCameraProfile(true, false)).toBe("mobile");
    expect(resolveCameraProfile(true, true)).toBe("reduced");
    expect(resolveDesiredCameraPose(config, 0.7, "reduced").position).toEqual([0, 0, 5]);
  });
  it("damps independently of frame rate", () => {
    expect(damp(0, 10, 5, 1)).toBeCloseTo(damp(damp(0, 10, 5, 0.5), 10, 5, 0.5));
  });
  it("rejects invalid keyframe order", () => {
    expect(() =>
      validateCameraConfig({
        ...config,
        keyframes: [
          { progress: 0.5, position: [0, 0, 0], target: [0, 0, 0] },
          { progress: 0.5, position: [0, 0, 0], target: [0, 0, 0] },
        ],
      }),
    ).toThrow();
  });
});
