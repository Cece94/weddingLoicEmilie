import type { AppLocale } from "@/lib/i18n/config";
import { LOCALE_STORAGE_KEY } from "@/lib/i18n/detect-locale";

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;

export function persistLocaleChoice(locale: AppLocale) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  document.cookie = `preferred-locale=${locale}; path=/; max-age=${ONE_YEAR_IN_SECONDS}; SameSite=Lax`;
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${ONE_YEAR_IN_SECONDS}; SameSite=Lax`;
}
