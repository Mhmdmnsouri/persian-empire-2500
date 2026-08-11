import type { StationId } from "@/journey/journey.types";

import type { Locale } from "./content.types";

export type JourneyStationContent = Readonly<{
  title: string;
  description: string;
}>;

export type JourneyContent = Readonly<Record<StationId, JourneyStationContent>>;

export type LocalizedJourneyContent = Readonly<{
  skipLabel: string;
  stations: JourneyContent;
}>;

const journeyContent: Record<Locale, LocalizedJourneyContent> = {
  en: {
    skipLabel: "Skip to story",
    stations: {
      intro: {
        title: "Persian Empire 2500",
        description:
          "A scroll-driven journey through selected architectural forms and artifacts of Persepolis.",
      },
      "grand-stairway": {
        title: "The Grand Stairway",
        description:
          "The journey pauses at the ceremonial approach, where architecture directs movement and attention.",
      },
      lamassu: {
        title: "Lamassu",
        description: "A guardian form introduces the next chapter of the visual narrative.",
      },
      "bull-capital": {
        title: "Bull Capital",
        description:
          "This station will examine the relationship between sculptural form and structural support.",
      },
      outro: {
        title: "Memory in Stone",
        description: "The foundation is ready for the complete journey to emerge from darkness.",
      },
    },
  },
  fa: {
    skipLabel: "پرش به روایت",
    stations: {
      intro: {
        title: "شاهنشاهی ایران ۲۵۰۰",
        description: "سفری اسکرول‌محور در میان گزیده‌ای از سازه‌ها و آثار تخت جمشید.",
      },
      "grand-stairway": {
        title: "پلکان بزرگ",
        description: "سفر در آستانهٔ آیینی مکث می‌کند؛ جایی که معماری حرکت و توجه را هدایت می‌کند.",
      },
      lamassu: {
        title: "لاماسو",
        description: "پیکرهٔ نگهبان، فصل بعدی روایت بصری را معرفی می‌کند.",
      },
      "bull-capital": {
        title: "سرستون گاو",
        description: "این ایستگاه رابطهٔ میان فرم پیکره‌وار و پشتیبانی سازه‌ای را بررسی خواهد کرد.",
      },
      outro: {
        title: "یاد در سنگ",
        description: "زیرساخت آماده است تا سفر کامل از تاریکی پدیدار شود.",
      },
    },
  },
};

export function getJourneyContent(locale: Locale): LocalizedJourneyContent {
  return journeyContent[locale];
}
