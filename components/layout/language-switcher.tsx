"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { isValidLocale, type AppLocale } from "@/lib/i18n/config";
import { persistLocaleChoice } from "@/lib/i18n/storage";
import { cn } from "@/lib/utils";

const localeOptions: { value: AppLocale; flag: string }[] = [
  { value: "fr", flag: "FR" },
  { value: "sv", flag: "SV" },
  { value: "en", flag: "EN" },
];

function replaceLocaleInPathname(pathname: string, nextLocale: AppLocale) {
  const segments = pathname.split("/").filter(Boolean);

  // Handle both '/en/...' and '/...' pathname shapes.
  if (segments.length > 0 && isValidLocale(segments[0])) {
    segments[0] = nextLocale;
  } else {
    segments.unshift(nextLocale);
  }

  return `/${segments.join("/")}`;
}

export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("common");
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();

  function onLocaleChange(nextLocale: AppLocale) {
    if (nextLocale === locale) {
      return;
    }

    persistLocaleChoice(nextLocale);
    const targetPath = replaceLocaleInPathname(pathname, nextLocale);
    router.push(targetPath);
    router.refresh();
  }

  return (
    <div
      className={cn("inline-flex items-center gap-1 rounded-full border border-line bg-surface p-1", className)}
      role="group"
      aria-label={t("language")}
    >
      {localeOptions.map((option) => {
        const active = option.value === locale;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onLocaleChange(option.value)}
            className={cn(
              "min-h-11 rounded-full px-3 text-xs font-semibold tracking-wide",
              active ? "bg-foreground text-background" : "text-muted hover:text-foreground",
            )}
            aria-pressed={active}
          >
            {option.flag}
          </button>
        );
      })}
    </div>
  );
}
