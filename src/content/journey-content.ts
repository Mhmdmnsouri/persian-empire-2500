import { englishJourneyContent } from "./en";
import { persianJourneyContent } from "./fa";
import type { Locale, LocalizedJourneyContent } from "./content.types";
import { assertValidBilingualContent } from "./content.validation";

const journeyContent: Record<Locale, LocalizedJourneyContent> = {
  en: englishJourneyContent,
  fa: persianJourneyContent,
};

assertValidBilingualContent(englishJourneyContent, persianJourneyContent);

export function getJourneyContent(locale: Locale): LocalizedJourneyContent {
  return journeyContent[locale];
}
