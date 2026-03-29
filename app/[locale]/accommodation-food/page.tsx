import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/ui/fade-in";

type StructuredSection = {
  title: string;
  body: string[];
};

export default async function AccommodationFoodPage() {
  const t = await getTranslations("accommodationFoodPage");
  const sections = t.raw("sections") as StructuredSection[];
  const intro = sections[0];
  const packages = sections[1];
  const outro = sections[2];

  return (
    <FadeIn>
      <section className="border-b border-line pb-10 pt-12 md:pb-16 md:pt-16">
        <h1 className="max-w-4xl text-5xl leading-none md:text-7xl">{t("title")}</h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-muted md:text-lg">{t("subtitle")}</p>
      </section>

      <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-12">
        <section className="md:col-span-5">
          <h2 className="mb-5 text-3xl leading-tight md:text-4xl">{intro?.title}</h2>
          <div className="space-y-4 text-base leading-7 text-foreground/90">
            {intro?.body.map((line, index) => <p key={`intro-${index}`}>{line}</p>)}
          </div>
        </section>

        <section className="md:col-span-7">
          <h2 className="mb-5 text-3xl leading-tight md:text-4xl">{packages?.title}</h2>
          <div className="space-y-4 text-base leading-7 text-foreground/90">
            {packages?.body.map((line, index) => <p key={`packages-${index}`}>{line}</p>)}
          </div>
        </section>
      </div>

      <section className="mt-10 border-t border-line pt-8 md:mt-12 md:pt-10">
        <h2 className="mb-4 text-3xl leading-tight md:text-4xl">{outro?.title}</h2>
        <div className="space-y-4 text-base leading-7 text-foreground/90">
          {outro?.body.map((line, index) => <p key={`outro-${index}`}>{line}</p>)}
        </div>
      </section>
    </FadeIn>
  );
}
