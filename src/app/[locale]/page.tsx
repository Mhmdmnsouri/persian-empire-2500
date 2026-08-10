import { notFound } from "next/navigation";

import { ExperienceCanvas } from "@/experience/ExperienceCanvas";
import { StoryShell } from "@/interface/StoryShell";
import { getFoundationContent } from "@/content/foundation-content";
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
      <StoryShell content={getFoundationContent(locale)} />
    </>
  );
}
