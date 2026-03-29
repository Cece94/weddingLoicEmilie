import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/ui/fade-in";
import { PageIntro } from "@/components/ui/page-intro";
import { Section } from "@/components/ui/section";

type StructuredSection = {
  eyebrow?: string;
  title: string;
  body: string[];
};

type StructuredPageProps = {
  namespace:
    | "ourWeddingPage"
    | "accommodationFoodPage"
    | "registrationPage"
    | "travelPage"
    | "programPage"
    | "faqPage";
};

export async function StructuredPage({ namespace }: StructuredPageProps) {
  const t = await getTranslations(namespace);
  const sections = t.raw("sections") as StructuredSection[];

  return (
    <FadeIn>
      <PageIntro title={t("title")} subtitle={t("subtitle")} />
      <div className="mt-8 space-y-6 md:mt-12 md:space-y-8">
        {sections.map((section) => (
          <Section key={section.title} title={section.title} eyebrow={section.eyebrow}>
            {section.body.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </Section>
        ))}
      </div>
    </FadeIn>
  );
}
