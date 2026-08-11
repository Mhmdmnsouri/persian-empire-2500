import { notFound } from "next/navigation";

import { ExperienceCanvas } from "@/experience/ExperienceCanvas";
import { JourneyController } from "@/journey/JourneyController";
import { StoryShell } from "@/interface/StoryShell";
import { getJourneyContent } from "@/content/journey-content";
import { isLocale, type Locale } from "@/content/content.types";

type LocalePageProps = Readonly<{
  params: Promise<{ locale: string }>;
}>;

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;

  return (
    <>
      <ExperienceCanvas />
      <JourneyController />
      <StoryShell content={getJourneyContent(locale)} />
    </>
  );
}
