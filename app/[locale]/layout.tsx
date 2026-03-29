import type { Metadata } from "next";
import Image from "next/image";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { FlowerTrail } from "@/components/ui/flower-trail";
import { locales } from "@/lib/i18n/config";

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const metadata: Metadata = {
  title: "Loic & Emilie Wedding",
  description: "Wedding details, program and practical information.",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(locales, locale)) {
    notFound();
  }

  // Force locale scoping for all server-side translation reads in this tree.
  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider key={locale} locale={locale} messages={messages}>
      <div className="relative isolate">
        <FlowerTrail />
        <div className="relative z-10 flex min-h-screen flex-col">
          <SiteHeader />
          <main className="relative mx-auto w-full max-w-7xl flex-1 px-4 pb-16 md:px-6">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 z-0 w-[min(72vw,620px)] -translate-x-1/2 -translate-y-[4%] opacity-90 md:w-[min(66vw,760px)] md:-translate-y-[8%]"
            >
              <Image src="/bouquet.svg" alt="" width={1600} height={560} priority className="h-auto w-full" />
            </div>
            <div className="relative z-10">{children}</div>
          </main>
        </div>
      </div>
    </NextIntlClientProvider>
  );
}
