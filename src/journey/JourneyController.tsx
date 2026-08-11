"use client";

import { useEffect } from "react";

import { normalizeGlobalProgress } from "./progress";
import { useJourneyStore } from "@/store/journey.store";

export function JourneyController() {
  useEffect(() => {
    let frameId: number | undefined;

    const updateProgress = () => {
      frameId = undefined;
      const documentElement = document.documentElement;
      const maxScrollableDistance = documentElement.scrollHeight - window.innerHeight;
      const progress = normalizeGlobalProgress(window.scrollY, maxScrollableDistance);

      useJourneyStore.getState().setProgress(progress);
    };

    const requestUpdate = () => {
      if (frameId === undefined) {
        frameId = window.requestAnimationFrame(updateProgress);
      }
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);

      if (frameId !== undefined) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return null;
}
