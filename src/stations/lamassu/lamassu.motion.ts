export type LamassuMotionProfile = "desktop" | "mobile" | "reduced";

export type LamassuMotionState = Readonly<{
  artifactVisibility: number;
  silhouetteVisibility: number;
  rotationY: number;
  faceReveal: number;
  bodyReveal: number;
  wingReveal: number;
  transitionToBullCapital: number;
}>;

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const ramp = (value: number, start: number, end: number) =>
  clamp((clamp(value) - start) / (end - start));

export function resolveLamassuMotionState(
  progress: number,
  profile: LamassuMotionProfile,
): LamassuMotionState {
  if (profile === "reduced") {
    return {
      artifactVisibility: 1,
      silhouetteVisibility: 0,
      rotationY: 0,
      faceReveal: 1,
      bodyReveal: 1,
      wingReveal: 1,
      transitionToBullCapital: progress >= 0.9 ? 1 : 0,
    };
  }

  const p = clamp(progress);
  const faceReveal = ramp(p, 0.05, 0.28);
  const bodyReveal = ramp(p, 0.24, 0.56);
  const wingReveal = ramp(p, 0.5, 0.78);
  const maximumOrbit = profile === "mobile" ? Math.PI * (25 / 180) : Math.PI * (42 / 180);

  return {
    artifactVisibility: faceReveal,
    silhouetteVisibility: 1 - faceReveal,
    rotationY: maximumOrbit * ramp(p, 0.2, 0.8),
    faceReveal,
    bodyReveal,
    wingReveal,
    transitionToBullCapital: ramp(p, 0.88, 1),
  };
}
