import type { FoundationContent, Locale } from "./content.types";

const foundationContent: Record<Locale, FoundationContent> = {
  en: {
    skipLabel: "Skip to story",
    title: "Persian Empire 2500",
    description: "The journey foundation is ready. The first chapter will emerge from darkness.",
    fallbackLabel: "A decorative WebGL scene is unavailable. The story remains available below.",
  },
  fa: {
    skipLabel: "پرش به روایت",
    title: "تخت جمشید: داستان‌هایی حک‌شده در سنگ",
    description: "زیرساخت سفر آماده است. نخستین فصل از تاریکی پدیدار خواهد شد.",
    fallbackLabel: "صحنهٔ تزئینی وب‌جی‌ال در دسترس نیست. روایت در ادامه قابل استفاده است.",
  },
};

export function getFoundationContent(locale: Locale): FoundationContent {
  return foundationContent[locale];
}
