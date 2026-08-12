export type IntroMotionProfile = "desktop" | "mobile" | "reduced";

export type IntroWordMotion = Readonly<{
  opacity: number;
  translateX: number;
  translateY: number;
  translateZ: number;
  scale: number;
}>;

export type IntroMotionState = Readonly<{
  words: readonly IntroWordMotion[];
  sentenceOpacity: number;
  edgeOpacity: number;
  edgeScale: number;
  showIndividualWords: boolean;
}>;

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const ramp = (value: number, start: number, end: number) =>
  clamp((clamp(value) - start) / (end - start));

export function resolveIntroMotionState(
  progress: number,
  profile: IntroMotionProfile,
): IntroMotionState {
  if (profile === "reduced") {
    return {
      words: [],
      sentenceOpacity: 1,
      edgeOpacity: 1,
      edgeScale: 1,
      showIndividualWords: false,
    };
  }

  const p = clamp(progress);
  const visibleWords = profile === "mobile" ? 2 : 3;
  const depth = profile === "mobile" ? 28 : 120;
  const exit = ramp(p, 0.76, 1);
  const revealStarts = [0.08, 0.29, 0.48];
  const revealEnds = [0.26, 0.47, 0.67];
  const positions = [
    [-9, -7],
    [8, 2],
    [-3, 9],
  ] as const;

  return {
    words: revealStarts.slice(0, visibleWords).map((start, index) => {
      const reveal = ramp(p, start, revealEnds[index]);
      return {
        opacity: reveal * (1 - exit),
        translateX: positions[index][0] * (1 - reveal) + positions[index][0] * exit * 2,
        translateY: positions[index][1] * (1 - reveal) - index * exit * 7,
        translateZ: depth * (index + 1) * (1 - exit),
        scale: 0.94 + reveal * 0.06 + exit * 0.1,
      };
    }),
    sentenceOpacity: ramp(p, 0.57, 0.76) * (1 - ramp(p, 0.88, 1)),
    edgeOpacity: ramp(p, profile === "mobile" ? 0.82 : 0.73, 0.96),
    edgeScale: 0.72 + ramp(p, 0.73, 0.96) * 0.28,
    showIndividualWords: true,
  };
}
