import type { Locale } from "./content.types";

export type GlossaryTerm = Readonly<Record<Locale, string>>;

export const terminologyGlossary = {
  persepolis: { en: "Persepolis", fa: "تخت جمشید" },
  achaemenid: { en: "Achaemenid", fa: "هخامنشی" },
  apadana: { en: "Apadana", fa: "آپادانا" },
  "grand-stairway": { en: "Grand Stairway", fa: "پلکان بزرگ" },
  "guardian-figure": { en: "guardian figure", fa: "پیکرهٔ نگهبان" },
  "bull-capital": { en: "bull capital", fa: "سرستون گاو" },
  "roof-beam": { en: "roof beam", fa: "تیرِ سقف" },
  "sculpted-frieze": { en: "sculpted frieze", fa: "نوار نقش‌برجسته" },
} as const satisfies Record<string, GlossaryTerm>;
