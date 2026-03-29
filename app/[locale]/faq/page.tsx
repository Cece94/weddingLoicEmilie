import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/ui/fade-in";

type FaqItem = {
  question: string;
  answer: string[];
};

export default async function FaqPage() {
  const t = await getTranslations("faqPage");
  const items = t.raw("items") as FaqItem[];

  return (
    <FadeIn>
      <section className="border-b border-line pb-10 pt-12 md:pb-16 md:pt-16">
        <h1 className="max-w-4xl text-5xl leading-none md:text-7xl">{t("title")}</h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-muted md:text-lg">{t("subtitle")}</p>
      </section>

      <section className="mt-10 space-y-10 md:mt-14 md:space-y-12">
        {items.map((item, index) => (
          <article key={`faq-${index}`} className="border-b border-line/70 pb-9 last:border-b-0 last:pb-0 md:pb-10">
            <h2 className="text-2xl leading-tight md:text-3xl">{item.question}</h2>
            <div className="mt-4 space-y-3 text-base leading-8 text-foreground/90 md:mt-5">
              {item.answer.map((line, lineIndex) => <p key={`faq-answer-${index}-${lineIndex}`}>{line}</p>)}
            </div>
          </article>
        ))}
      </section>
    </FadeIn>
  );
}
