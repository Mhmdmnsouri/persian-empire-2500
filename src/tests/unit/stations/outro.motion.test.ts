import { describe, expect, it } from "vitest";

import { resolveOutroMotionState } from "@/stations/outro/outro.motion";

describe("Outro motion", () => {
  it("fades the reflective echo into darkness as progress completes", () => {
    expect(resolveOutroMotionState(0, "desktop").echoVisibility).toBe(1);
    expect(resolveOutroMotionState(1, "desktop").echoVisibility).toBe(0);
  });

  it("reconstructs the same state after reverse scrolling", () => {
    expect(resolveOutroMotionState(0.42, "desktop")).toEqual(resolveOutroMotionState(0.42, "desktop"));
  });

  it("keeps reduced motion short and static", () => {
    expect(resolveOutroMotionState(0, "reduced")).toEqual(resolveOutroMotionState(1, "reduced"));
  });
});
