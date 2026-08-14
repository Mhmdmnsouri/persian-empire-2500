export type GrandStairwayMotionProfile = "desktop" | "mobile" | "reduced";

export type GrandStairwayMotionState = Readonly<{
  stepAssembly: readonly number[];
  sideWallAssembly: number;
  reliefReveal: number;
  transitionToLamassu: number;
}>;

const clamp = (value: number) => Math.min(1, Math.max(0, value));

const ramp = (value: number, start: number, end: number) =>
  clamp((clamp(value) - start) / (end - start));

export function getGrandStairwayStepCount(profile: GrandStairwayMotionProfile): number {
  return profile === "mobile" ? 6 : 9;
}

export function getGrandStairwayStepAssembly(
  progress: number,
  stepIndex: number,
  profile: GrandStairwayMotionProfile,
): number {
  if (profile === "reduced") return 1;

  const start = (profile === "mobile" ? 0.08 : 0.04) + stepIndex * 0.06;
  return ramp(progress, start, start + 0.2);
}

export function getGrandStairwaySideWallAssembly(
  progress: number,
  profile: GrandStairwayMotionProfile,
): number {
  if (profile === "reduced") return 1;
  return ramp(progress, profile === "mobile" ? 0.5 : 0.42, profile === "mobile" ? 0.72 : 0.62);
}

export function getGrandStairwayReliefReveal(
  progress: number,
  profile: GrandStairwayMotionProfile,
): number {
  if (profile === "reduced") return 1;
  return ramp(progress, profile === "mobile" ? 0.68 : 0.6, profile === "mobile" ? 0.9 : 0.82);
}

export function getGrandStairwayTransitionToLamassu(
  progress: number,
  profile: GrandStairwayMotionProfile,
): number {
  if (profile === "reduced") return progress >= 0.9 ? 1 : 0;
  return ramp(progress, 0.86, 1);
}

export function getGrandStairwayStepBrightness(
  progress: number,
  stepIndex: number,
  stepCount: number,
  profile: GrandStairwayMotionProfile,
): number {
  const assembly = getGrandStairwayStepAssembly(progress, stepIndex, profile);
  const transition = getGrandStairwayTransitionToLamassu(progress, profile);
  const lowerStepWeight = 1 - stepIndex / Math.max(1, stepCount - 1);
  return Math.max(0.12, (0.48 + assembly * 0.45) * (1 - transition * lowerStepWeight * 0.78));
}

export function resolveGrandStairwayMotionState(
  progress: number,
  profile: GrandStairwayMotionProfile,
): GrandStairwayMotionState {
  const stepCount = getGrandStairwayStepCount(profile);
  return {
    stepAssembly: Array.from({ length: stepCount }, (_, index) =>
      getGrandStairwayStepAssembly(progress, index, profile),
    ),
    sideWallAssembly: getGrandStairwaySideWallAssembly(progress, profile),
    reliefReveal: getGrandStairwayReliefReveal(progress, profile),
    transitionToLamassu: getGrandStairwayTransitionToLamassu(progress, profile),
  };
}
