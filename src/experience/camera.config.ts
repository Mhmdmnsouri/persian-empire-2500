import type { StationCameraConfig } from "./camera.types";
import type { StationId } from "@/journey/journey.types";

const paths: Record<StationId, StationCameraConfig> = {
  intro: {
    stationId: "intro",
    keyframes: [
      { progress: 0, position: [0, 1.6, 8], target: [0, 1.5, 0], fov: 44 },
      { progress: 0.3, position: [-0.12, 1.62, 7.45], target: [-0.24, 1.55, 0], fov: 43.5 },
      { progress: 0.62, position: [0.1, 1.66, 6.75], target: [0.16, 1.6, 0], fov: 42.8 },
      { progress: 1, position: [0, 1.3, 6.2], target: [0, 1.3, 0], fov: 42.5 },
    ],
    mobileKeyframes: [
      { progress: 0, position: [0, 1.6, 7.2], target: [0, 1.5, 0], fov: 46 },
      { progress: 0.6, position: [0.06, 1.6, 6.8], target: [0.08, 1.55, 0], fov: 45.5 },
      { progress: 1, position: [0, 1.35, 6.5], target: [0, 1.35, 0], fov: 45 },
    ],
    reducedMotionKeyframes: [
      { progress: 0, position: [0, 1.6, 7], target: [0, 1.6, 0], fov: 45 },
      { progress: 1, position: [0, 1.5, 6.8], target: [0, 1.5, 0], fov: 45 },
    ],
  },
  "grand-stairway": {
    stationId: "grand-stairway",
    keyframes: [
      { progress: 0, position: [0, 1.3, 6.2], target: [0, 1.3, 0], fov: 42.5 },
      { progress: 0.55, position: [0, 2.1, 5.8], target: [0, 2, 0], fov: 42, ease: "ease-in-out" },
      { progress: 1, position: [0.5, 3, 4.8], target: [0, 2.7, 0], fov: 43 },
    ],
    mobileKeyframes: [
      { progress: 0, position: [0, 1.35, 6.5], target: [0, 1.35, 0], fov: 45 },
      { progress: 1, position: [0.2, 2.1, 6], target: [0, 2, 0], fov: 46 },
    ],
    reducedMotionKeyframes: [
      { progress: 0, position: [0, 1.5, 6.8], target: [0, 1.5, 0], fov: 45 },
      { progress: 1, position: [0, 1.8, 6.7], target: [0, 1.8, 0], fov: 46 },
    ],
  },
  lamassu: {
    stationId: "lamassu",
    keyframes: [
      { progress: 0, position: [0, 1.5, 7], target: [0, 1.7, 0], fov: 44 },
      { progress: 1, position: [1.8, 1.9, 5.5], target: [0, 1.9, 0], fov: 42 },
    ],
    mobileKeyframes: [
      { progress: 0, position: [0, 1.6, 6.8], target: [0, 1.7, 0], fov: 46 },
      { progress: 1, position: [0.8, 1.75, 6], target: [0, 1.8, 0], fov: 45 },
    ],
    reducedMotionKeyframes: [
      { progress: 0, position: [0, 1.6, 6.5], target: [0, 1.7, 0], fov: 45 },
      { progress: 1, position: [0.3, 1.6, 6.3], target: [0, 1.7, 0], fov: 45 },
    ],
  },
  "bull-capital": {
    stationId: "bull-capital",
    keyframes: [
      { progress: 0, position: [0, 2.5, 6.5], target: [0, 2.6, 0], fov: 43 },
      { progress: 1, position: [0, 3.3, 8], target: [0, 2.5, 0], fov: 46 },
    ],
    reducedMotionKeyframes: [
      { progress: 0, position: [0, 2.7, 7], target: [0, 2.5, 0], fov: 45 },
      { progress: 1, position: [0, 2.8, 7.2], target: [0, 2.5, 0], fov: 45 },
    ],
  },
  outro: {
    stationId: "outro",
    keyframes: [
      { progress: 0, position: [0, 1.6, 6], target: [0, 1.5, 0], fov: 43 },
      { progress: 1, position: [0, 1.7, 9], target: [0, 1.5, 0], fov: 46 },
    ],
    reducedMotionKeyframes: [
      { progress: 0, position: [0, 1.6, 7], target: [0, 1.5, 0], fov: 45 },
      { progress: 1, position: [0, 1.6, 7.5], target: [0, 1.5, 0], fov: 45 },
    ],
  },
};
export const stationCameraConfigs = paths;
