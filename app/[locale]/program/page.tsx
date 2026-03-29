import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/ui/fade-in";

type ProgramItem = {
  time: string;
  label: string;
};

const timelineIcons = ["💍", "🥂", "🥂", "🍽️", "🎂", "💃", "🎉"];

export default async function ProgramPage() {
  const t = await getTranslations("programPage");
  const leadLines = t.raw("leadLines") as string[];
  const timeline = t.raw("timeline") as ProgramItem[];

  return (
    <FadeIn>
      <section className="border-b border-line pb-10 pt-12 md:pb-16 md:pt-16">
        <h1 className="max-w-4xl text-5xl leading-none md:text-7xl">{t("title")}</h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-muted md:text-lg">{t("subtitle")}</p>
      </section>

      <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-12">
        <section className="md:col-span-4">
          <h2 className="text-3xl leading-tight md:text-4xl">{t("leadTitle")}</h2>
          <div className="mt-5 space-y-4 text-base leading-7 text-foreground/90">
            {leadLines.map((line, index) => <p key={`lead-${index}`}>{line}</p>)}
          </div>
        </section>

        <section className="md:col-span-8">
          <ol className="space-y-4">
            {timeline.map((item, index) => (
              <li
                key={`${item.time}-${index}`}
                className="flex items-start gap-4 border-b border-line/70 pb-4 last:border-b-0 last:pb-0"
              >
                <span className="min-w-28 text-sm font-semibold uppercase tracking-[0.12em] text-muted md:min-w-32">
                  {item.time}
                </span>
                <span
                  className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-full border border-line bg-surface text-base"
                  aria-hidden="true"
                >
                  {timelineIcons[index] ?? "•"}
                </span>
                <span className="text-xl leading-tight md:text-2xl">{item.label}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>

    </FadeIn>
  );
}
