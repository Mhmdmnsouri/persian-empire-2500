"use client";

import { useEffect, useState } from "react";

import type { IntroMotionCopy } from "@/content/content.types";
import { normalizeStationProgress } from "@/journey/progress";
import { useJourneyStore } from "@/store/journey.store";

import { resolveIntroMotionState, type IntroMotionProfile } from "./intro-motion";

type IntroTypographyProps = Readonly<{ content: IntroMotionCopy }>;

function getProfile(): IntroMotionProfile {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "reduced";
  return window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop";
}

export function IntroTypography({ content }: IntroTypographyProps) {
  const globalProgress = useJourneyStore((state) => state.globalProgress);
  const [profile, setProfile] = useState<IntroMotionProfile>("desktop");

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 767px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateProfile = () => setProfile(getProfile());
    updateProfile();
    mobile.addEventListener("change", updateProfile);
    reduced.addEventListener("change", updateProfile);
    return () => {
      mobile.removeEventListener("change", updateProfile);
      reduced.removeEventListener("change", updateProfile);
    };
  }, []);

  const progress = normalizeStationProgress(globalProgress, 0, 0.25);
  const state = resolveIntroMotionState(progress, profile);

  return (
    <>
      <p className="sr-only">{content.sentence}</p>
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 [perspective:800px]">
          {state.showIndividualWords
            ? content.words.slice(0, state.words.length).map((word, index) => {
                const wordState = state.words[index];
                return (
                  <span
                    key={word}
                    className="absolute start-1/2 top-1/3 whitespace-nowrap text-4xl font-medium tracking-[0.18em] text-paper sm:text-6xl lg:text-8xl"
                    style={{
                      opacity: wordState.opacity,
                      transform: `translate3d(calc(-50% + ${wordState.translateX}vw), ${wordState.translateY}vh, ${wordState.translateZ}px) scale(${wordState.scale})`,
                    }}
                  >
                    {word}
                  </span>
                );
              })
            : null}
          <p
            className="absolute inset-x-6 top-1/2 mx-auto max-w-2xl text-center text-xl leading-relaxed text-paper sm:text-3xl"
            style={{ opacity: state.sentenceOpacity }}
          >
            {content.sentence}
          </p>
          <div
            className="absolute inset-x-0 bottom-[14%] h-px origin-center bg-stone"
            style={{ opacity: state.edgeOpacity, transform: `scaleX(${state.edgeScale})` }}
          />
        </div>
      </div>
    </>
  );
}
