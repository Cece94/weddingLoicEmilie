import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/ui/fade-in";
import { PageIntro } from "@/components/ui/page-intro";
import { Section } from "@/components/ui/section";

export default async function RsvpPage() {
  const t = await getTranslations("rsvpPage");

  return (
    <FadeIn>
      <PageIntro title={t("title")} subtitle={t("subtitle")} />
      <div className="mt-8 md:mt-12">
        <Section title={t("cardTitle")} eyebrow="RSVP">
          <p>{t("line1")}</p>
          <p>{t("line2")}</p>
          <p className="text-sm text-muted">{t("line3")}</p>
        </Section>
      </div>
    </FadeIn>
  );
}
