import type { StationId } from "@/journey/journey.types";

export type Vector3Tuple = readonly [number, number, number];
export type CameraEase = "linear" | "smooth" | "ease-in" | "ease-out" | "ease-in-out";
export type CameraKeyframe = Readonly<{
  progress: number;
  position: Vector3Tuple;
  target: Vector3Tuple;
  fov?: number;
  roll?: number;
  ease?: CameraEase;
}>;
export type CameraPose = Readonly<{
  position: Vector3Tuple;
  target: Vector3Tuple;
  fov: number;
  roll: number;
}>;
export type CameraDampingConfig = Readonly<{
  position: number;
  target: number;
  fov: number;
  roll: number;
}>;
export type CameraConstraints = Readonly<{ minFov: number; maxFov: number; maxRoll: number }>;
export type StationCameraConfig = Readonly<{
  stationId: StationId;
  keyframes: readonly CameraKeyframe[];
  mobileKeyframes?: readonly CameraKeyframe[];
  reducedMotionKeyframes?: readonly CameraKeyframe[];
  damping?: Partial<CameraDampingConfig>;
  constraints?: Partial<CameraConstraints>;
}>;
export type CameraProfile = "desktop" | "mobile" | "reduced";
