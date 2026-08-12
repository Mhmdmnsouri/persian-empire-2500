import { describe, expect, it } from "vitest";

import { resolveIntroMotionState } from "@/interface/intro-motion";

describe("intro motion", () => {
  it("keeps the entry state dark before the first word is revealed", () => {
    const state = resolveIntroMotionState(0, "desktop");
    expect(state.words).toHaveLength(3);
    expect(state.words[0].opacity).toBe(0);
    expect(state.sentenceOpacity).toBe(0);
    expect(state.edgeOpacity).toBe(0);
  });

  it("forms the sentence before the exit transition", () => {
    const state = resolveIntroMotionState(0.7, "desktop");
    expect(state.words[0].opacity).toBeGreaterThan(0);
    expect(state.sentenceOpacity).toBeGreaterThan(0);
    expect(state.edgeOpacity).toBe(0);
  });

  it("displaces typography and reveals the first-stair edge on exit", () => {
    const state = resolveIntroMotionState(0.96, "desktop");
    expect(state.words[0].opacity).toBeLessThan(1);
    expect(state.edgeOpacity).toBe(1);
    expect(state.edgeScale).toBe(1);
  });

  it("uses fewer words on mobile and a static readable state with reduced motion", () => {
    expect(resolveIntroMotionState(0.5, "mobile").words).toHaveLength(2);
    expect(resolveIntroMotionState(0.5, "reduced")).toMatchObject({
      words: [],
      sentenceOpacity: 1,
      showIndividualWords: false,
    });
  });
});
