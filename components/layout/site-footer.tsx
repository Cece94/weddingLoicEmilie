import { useTranslations } from "next-intl";

export function SiteFooter() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-8 text-sm text-muted md:px-6">
        <p>{t("message")}</p>
        <p>{t("signature")}</p>
      </div>
    </footer>
  );
}
