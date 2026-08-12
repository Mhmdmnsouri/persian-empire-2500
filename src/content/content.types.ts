import type { StationId } from "@/journey/journey.types";

export const supportedLocales = ["en", "fa"] as const;

export type Locale = (typeof supportedLocales)[number];

export type FoundationContent = {
  skipLabel: string;
  title: string;
  description: string;
  fallbackLabel: string;
};

export type ContentEvidence = "editorial" | "confirmed" | "reconstruction";

export type StationLabel = Readonly<{
  id: string;
  title: string;
  value: string;
}>;

export type StationContent = Readonly<{
  id: StationId;
  navigationTitle: string;
  title: string;
  lead: string;
  description: string;
  labels: readonly StationLabel[];
  uncertaintyNote?: string;
  evidence: ContentEvidence;
  sourceIds: readonly string[];
}>;

export type InterfaceCopy = Readonly<{
  skipLabel: string;
  fallbackStatus: string;
  sourceHeading: string;
  uncertaintyHeading: string;
}>;

export type IntroMotionCopy = Readonly<{
  words: readonly [string, string, string];
  sentence: string;
}>;

export type LocalizedJourneyContent = Readonly<{
  interface: InterfaceCopy;
  introMotion: IntroMotionCopy;
  stations: Readonly<Record<StationId, StationContent>>;
}>;

export type HistoricalSource = Readonly<{
  id: string;
  title: string;
  publisher: string;
  url: string;
  type: "museum" | "institution" | "archaeological-report";
  accessedAt: string;
}>;

export function isLocale(value: string): value is Locale {
  return supportedLocales.some((locale) => locale === value);
}

export function localeDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "fa" ? "rtl" : "ltr";
}
