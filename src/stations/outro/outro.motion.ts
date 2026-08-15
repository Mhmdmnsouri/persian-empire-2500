export type OutroMotionProfile = "desktop" | "mobile" | "reduced";

export type OutroMotionState = Readonly<{
  echoVisibility: number;
  echoScale: number;
  reflectionVisibility: number;
}>;

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const ramp = (value: number, start: number, end: number) =>
  clamp((clamp(value) - start) / (end - start));

export function resolveOutroMotionState(
  progress: number,
  profile: OutroMotionProfile,
): OutroMotionState {
  if (profile === "reduced") {
    return { echoVisibility: 0.3, echoScale: 1, reflectionVisibility: 0.45 };
  }

  const p = clamp(progress);
  const echoVisibility = 1 - ramp(p, profile === "mobile" ? 0.45 : 0.55, 1);
  return {
    echoVisibility,
    echoScale: 0.92 + echoVisibility * 0.08,
    reflectionVisibility: ramp(p, 0.04, profile === "mobile" ? 0.3 : 0.22),
  };
}
