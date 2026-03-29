"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { resolveClientLocale } from "@/lib/i18n/detect-locale";
import { persistLocaleChoice } from "@/lib/i18n/storage";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const locale = resolveClientLocale();
    persistLocaleChoice(locale);
    router.replace(`/${locale}/our-wedding`);
  }, [router]);

  return null;
}
