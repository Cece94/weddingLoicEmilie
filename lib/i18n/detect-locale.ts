import { AppLocale, defaultLocale, isValidLocale } from "@/lib/i18n/config";

export const LOCALE_STORAGE_KEY = "preferred-locale";

export function detectLocaleFromBrowser(language: string): AppLocale {
  const normalized = language.toLowerCase();

  if (normalized.startsWith("fr")) {
    return "fr";
  }

  if (normalized.startsWith("sv")) {
    return "sv";
  }

  return defaultLocale;
}

export function resolveClientLocale(): AppLocale {
  if (typeof window === "undefined") {
    return defaultLocale;
  }

  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  if (stored && isValidLocale(stored)) {
    return stored;
  }

  // Keep locale inference logic in one place to avoid route duplication.
  return detectLocaleFromBrowser(window.navigator.language);
}
