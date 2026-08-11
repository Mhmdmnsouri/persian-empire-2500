import { create } from "zustand";

import { journeyStations } from "@/journey/journey.config";
import { resolveJourneySnapshot } from "@/journey/progress";
import type { ScrollDirection, StationId } from "@/journey/journey.types";

type JourneyStoreState = {
  globalProgress: number;
  activeStationId: StationId;
  activeStationIndex: number;
  direction: ScrollDirection;
  setProgress: (nextProgress: number) => void;
};

const initialStation = journeyStations[0];

export const useJourneyStore = create<JourneyStoreState>((set, get) => ({
  globalProgress: 0,
  activeStationId: initialStation.id,
  activeStationIndex: initialStation.index,
  direction: "idle",
  setProgress: (nextProgress) => {
    const current = get();
    const snapshot = resolveJourneySnapshot(journeyStations, current.globalProgress, nextProgress);

    if (
      snapshot.globalProgress === current.globalProgress &&
      snapshot.activeStation.id === current.activeStationId &&
      snapshot.direction === current.direction
    ) {
      return;
    }

    set({
      globalProgress: snapshot.globalProgress,
      activeStationId: snapshot.activeStation.id,
      activeStationIndex: snapshot.activeStation.index,
      direction: snapshot.direction,
    });
  },
}));
