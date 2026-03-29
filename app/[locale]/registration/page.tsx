import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { FadeIn } from "@/components/ui/fade-in";
import { RSVP_FORM_URL } from "@/lib/external-links";

export default async function RegistrationPage() {
  const t = await getTranslations("registrationPage");

  return (
    <FadeIn>
      <section className="border-b border-line pb-10 pt-12 md:pb-16 md:pt-16">
        <h1 className="max-w-4xl text-5xl leading-none md:text-7xl">{t("title")}</h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-muted md:text-lg">{t("subtitle")}</p>
      </section>

      <section className="mx-auto mt-12 max-w-3xl text-center md:mt-16">
        <p className="text-xs uppercase tracking-[0.24em] text-muted">RSVP</p>
        <h2 className="mt-4 text-3xl leading-tight md:text-5xl">{t("comingSoonTitle")}</h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-foreground/90 md:text-lg">
          {t("comingSoonLine1")}
        </p>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-8 text-foreground/80 md:text-lg">
          {t("comingSoonLine2")}
        </p>
        <Link
          href={RSVP_FORM_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full border border-accent bg-accent px-6 text-sm font-semibold uppercase tracking-[0.16em] text-background"
        >
          {t("formButtonLabel")}
        </Link>
      </section>
    </FadeIn>
  );
}
