import { defaultLocale, isValidLocale, type AppLocale } from "@/lib/i18n/config";

export const RSVP_FORM_URLS: Record<AppLocale, string> = {
  en: "https://docs.google.com/forms/d/e/1FAIpQLScR99WID83yCvct9z5l6okNYdB1jqHJeBkp2BynByLXRZ43PA/viewform?usp=header",
  fr: "https://docs.google.com/forms/d/e/1FAIpQLSdKakTUYG9Fz4nKyBSTxU-nwmXnXFe3zrN9c4HgyQ3I7X0z3w/viewform?usp=header",
  sv: "https://docs.google.com/forms/d/e/1FAIpQLSd4PnqEbT5YMpOrs5HO02fUAHe7dnyso8_g-9ratzQWKhAh2w/viewform?usp=header",
};

export const RSVP_FORM_URL = RSVP_FORM_URLS[defaultLocale];

export function getRsvpFormUrl(locale: string): string {
  return RSVP_FORM_URLS[isValidLocale(locale) ? locale : defaultLocale];
}
