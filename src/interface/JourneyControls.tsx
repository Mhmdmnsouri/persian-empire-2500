"use client";

import { useEffect, useState } from "react";

import type { LocalizedJourneyContent } from "@/content/content.types";
import { journeyStations } from "@/journey/journey.config";
import { useJourneyStore } from "@/store/journey.store";

type JourneyControlsProps = Readonly<{ content: LocalizedJourneyContent }>;

export function JourneyControls({ content }: JourneyControlsProps) {
  const [activeStationId, setActiveStationId] = useState(useJourneyStore.getState().activeStationId);

  useEffect(() => useJourneyStore.subscribe((state) => setActiveStationId(state.activeStationId)), []);

  const activeStation = journeyStations.find((station) => station.id === activeStationId) ?? journeyStations[0];
  const restart = () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  };

  return (
    <div className="pointer-events-none fixed inset-x-4 top-4 z-2 flex items-start justify-between gap-4 sm:inset-x-8">
      <p className="bg-ink/85 px-3 py-2 text-xs tracking-[0.12em] text-paper" role="status">
        {activeStation.index + 1} / {journeyStations.length} — {content.stations[activeStation.id].navigationTitle}
      </p>
      <button
        className="pointer-events-auto border border-stone-border bg-ink/85 px-3 py-2 text-sm text-paper"
        onClick={restart}
        type="button"
      >
        {content.interface.restartLabel}
      </button>
    </div>
  );
}
