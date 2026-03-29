"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { RSVP_FORM_URL } from "@/lib/external-links";
import { navRoutes, type NavKey } from "@/lib/navigation";
import { cn } from "@/lib/utils";

const navOrder: NavKey[] = [
  "ourWedding",
  "accommodationFood",
  "registration",
  "travel",
  "program",
  "faq",
];

export function SiteHeader() {
  const t = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-6">
        <Link
          href={`/${locale}/our-wedding`}
          className="mr-auto inline-flex items-center gap-2 font-serif text-2xl leading-none tracking-[0.16em]"
          aria-label={t("siteTitle")}
        >
          <Image src="/bouquet-icon.svg" alt="" aria-hidden width={24} height={24} className="h-6 w-6 md:h-6 md:w-6" />
          E & L
        </Link>

        <nav className="hidden lg:block" aria-label={t("menu")}>
          <ul className="flex items-center gap-5">
            {navOrder.map((key) => {
              const href = `/${locale}${navRoutes[key]}`;
              const active = pathname === href;

              return (
                <li key={key}>
                  <Link
                    href={href}
                    className={cn(
                      "text-xs uppercase tracking-[0.16em] text-muted hover:text-foreground",
                      active && "text-foreground",
                    )}
                  >
                    {t(`nav.${key}`)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <Link
            href={RSVP_FORM_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center rounded-full border border-accent bg-accent px-5 text-xs font-semibold uppercase tracking-[0.16em] text-background"
          >
            {t("rsvp")}
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher />
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
