import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { isLocale, localeDirection, type Locale } from "@/content/content.types";

type LocaleLayoutProps = Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>;

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;

  return (
    <div lang={locale} dir={localeDirection(locale)} className="locale-root">
      {children}
    </div>
  );
}
