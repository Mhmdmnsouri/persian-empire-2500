import { beforeEach, describe, expect, it } from "vitest";

import { useJourneyStore } from "@/store/journey.store";

describe("journey store", () => {
  beforeEach(() => {
    useJourneyStore.getState().setProgress(0);
  });

  it("stores only resolved journey metadata", () => {
    useJourneyStore.getState().setProgress(0.52);

    expect(useJourneyStore.getState()).toMatchObject({
      globalProgress: 0.52,
      activeStationId: "lamassu",
      activeStationIndex: 2,
      direction: "forward",
    });
  });

  it("restores prior station metadata when progress moves backward", () => {
    useJourneyStore.getState().setProgress(0.52);
    useJourneyStore.getState().setProgress(0.48);

    expect(useJourneyStore.getState()).toMatchObject({
      globalProgress: 0.48,
      activeStationId: "grand-stairway",
      activeStationIndex: 1,
      direction: "backward",
    });
  });
});
