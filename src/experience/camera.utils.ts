import type {
  CameraDampingConfig,
  CameraEase,
  CameraKeyframe,
  CameraPose,
  CameraProfile,
  StationCameraConfig,
  Vector3Tuple,
} from "./camera.types";

export const defaultCameraDamping: CameraDampingConfig = {
  position: 5,
  target: 6,
  fov: 4,
  roll: 4,
};
export const defaultCameraPose: CameraPose = {
  position: [0, 1.6, 7],
  target: [0, 1.6, 0],
  fov: 44,
  roll: 0,
};

const clamp = (value: number) => Math.min(1, Math.max(0, value));
export function applyCameraEase(value: number, ease: CameraEase = "smooth"): number {
  const t = clamp(value);
  switch (ease) {
    case "linear":
      return t;
    case "ease-in":
      return t * t;
    case "ease-out":
      return 1 - (1 - t) * (1 - t);
    case "ease-in-out":
      return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
    default:
      return t * t * (3 - 2 * t);
  }
}
export function lerpTuple(from: Vector3Tuple, to: Vector3Tuple, t: number): Vector3Tuple {
  return [
    from[0] + (to[0] - from[0]) * t,
    from[1] + (to[1] - from[1]) * t,
    from[2] + (to[2] - from[2]) * t,
  ];
}
export function damp(current: number, target: number, lambda: number, delta: number): number {
  return target + (current - target) * Math.exp(-lambda * Math.max(0, delta));
}
export function resolveCameraProfile(isMobile: boolean, reducedMotion: boolean): CameraProfile {
  return reducedMotion ? "reduced" : isMobile ? "mobile" : "desktop";
}
export function getCameraKeyframes(
  config: StationCameraConfig,
  profile: CameraProfile,
): readonly CameraKeyframe[] {
  return profile === "reduced"
    ? (config.reducedMotionKeyframes ?? config.keyframes)
    : profile === "mobile"
      ? (config.mobileKeyframes ?? config.keyframes)
      : config.keyframes;
}
export function validateCameraConfig(config: StationCameraConfig): void {
  const profiles = [config.keyframes, config.mobileKeyframes, config.reducedMotionKeyframes];
  for (const frames of profiles) {
    if (!frames) continue;
    if (frames.length === 0) throw new Error("Camera profile requires keyframes.");
    let previous = -1;
    for (const frame of frames) {
      if (
        !Number.isFinite(frame.progress) ||
        frame.progress < 0 ||
        frame.progress > 1 ||
        frame.progress <= previous ||
        ![...frame.position, ...frame.target].every(Number.isFinite)
      )
        throw new Error("Camera keyframes must be finite and strictly ordered from 0 to 1.");
      previous = frame.progress;
    }
  }
}
export function interpolateCameraPose(
  keyframes: readonly CameraKeyframe[],
  progress: number,
): CameraPose {
  if (keyframes.length === 0) throw new Error("Camera profile requires keyframes.");
  const p = clamp(progress);
  const first = keyframes[0];
  const last = keyframes.at(-1) ?? first;
  let from = first;
  for (const frame of keyframes) {
    if (frame.progress > p) break;
    from = frame;
  }
  const to = keyframes.find((frame) => frame.progress >= p) ?? last;
  const t =
    to.progress === from.progress
      ? 0
      : applyCameraEase((p - from.progress) / (to.progress - from.progress), to.ease);
  return {
    position: lerpTuple(from.position, to.position, t),
    target: lerpTuple(from.target, to.target, t),
    fov:
      (from.fov ?? defaultCameraPose.fov) +
      ((to.fov ?? defaultCameraPose.fov) - (from.fov ?? defaultCameraPose.fov)) * t,
    roll: (from.roll ?? 0) + ((to.roll ?? 0) - (from.roll ?? 0)) * t,
  };
}
export function resolveDesiredCameraPose(
  config: StationCameraConfig,
  localProgress: number,
  profile: CameraProfile,
): CameraPose {
  validateCameraConfig(config);
  const pose = interpolateCameraPose(getCameraKeyframes(config, profile), localProgress);
  const constraints = { minFov: 30, maxFov: 55, maxRoll: 0.03, ...config.constraints };
  return {
    ...pose,
    fov: Math.min(constraints.maxFov, Math.max(constraints.minFov, pose.fov)),
    roll: Math.min(constraints.maxRoll, Math.max(-constraints.maxRoll, pose.roll)),
  };
}
