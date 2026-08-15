export type BullCapitalMotionProfile = "desktop" | "mobile" | "reduced";

export type BullCapitalMotionState = Readonly<{
  baseAssembly: number;
  shaftAssembly: number;
  connectorAssembly: number;
  capitalAssembly: number;
  beamAssembly: number;
  capitalOffsetY: number;
  beamOffsetZ: number;
  outroTransition: number;
}>;

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const ramp = (value: number, start: number, end: number) =>
  clamp((clamp(value) - start) / (end - start));

export function resolveBullCapitalMotionState(
  progress: number,
  profile: BullCapitalMotionProfile,
): BullCapitalMotionState {
  if (profile === "reduced") {
    return {
      baseAssembly: 1,
      shaftAssembly: 1,
      connectorAssembly: 1,
      capitalAssembly: 1,
      beamAssembly: 1,
      capitalOffsetY: 0,
      beamOffsetZ: 0,
      outroTransition: 1,
    };
  }

  const p = clamp(progress);
  const compact = profile === "mobile";
  const baseAssembly = ramp(p, 0.1, compact ? 0.27 : 0.25);
  const shaftAssembly = ramp(p, compact ? 0.24 : 0.28, compact ? 0.5 : 0.56);
  const connectorAssembly = ramp(p, compact ? 0.48 : 0.54, compact ? 0.66 : 0.72);
  const capitalAssembly = ramp(p, compact ? 0.6 : 0.66, compact ? 0.8 : 0.86);
  const beamAssembly = ramp(p, compact ? 0.76 : 0.82, 1);

  return {
    baseAssembly,
    shaftAssembly,
    connectorAssembly,
    capitalAssembly,
    beamAssembly,
    capitalOffsetY: (1 - capitalAssembly) * (compact ? 1.7 : 2.6),
    beamOffsetZ: (1 - beamAssembly) * (compact ? 1.2 : 2),
    outroTransition: ramp(p, compact ? 0.9 : 0.88, 1),
  };
}
