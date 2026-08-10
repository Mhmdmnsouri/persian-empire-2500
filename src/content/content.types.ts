export const supportedLocales = ["en", "fa"] as const;

export type Locale = (typeof supportedLocales)[number];

export type FoundationContent = {
  skipLabel: string;
  title: string;
  description: string;
  fallbackLabel: string;
};

export function isLocale(value: string): value is Locale {
  return supportedLocales.some((locale) => locale === value);
}

export function localeDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "fa" ? "rtl" : "ltr";
}
