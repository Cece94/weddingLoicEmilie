import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/ui/fade-in";

type StoryCard = {
  date: string;
  title: string;
  marker: string;
  image: string;
};

const storyImages = ["/images/story-01.png", "/images/story-02.png", "/images/story-03.png"];

export async function OurWeddingHero() {
  const t = await getTranslations("ourWeddingPage");
  const cards = t.raw("storyCards") as Omit<StoryCard, "image">[];

  const mergedCards: StoryCard[] = cards.map((card, index) => ({
    ...card,
    image: storyImages[index] ?? storyImages[0],
  }));

  const heroTitleLines = t("heroTitle").toUpperCase().split(" ");

  return (
    <FadeIn>
      <section className="relative overflow-hidden px-2 py-10 md:px-4 md:py-12 lg:px-8 lg:py-14">
        <div className="relative z-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(300px,1.15fr)_2.25fr] lg:items-start lg:gap-10">
            <div className="lg:-ml-10 lg:flex lg:min-h-[440px] lg:flex-col lg:justify-center lg:text-left">
              <p className="text-xs uppercase tracking-[0.25em] text-muted lg:mb-8">Emilie & Loïc</p>
              <h1 className="hero-title-gradient max-w-[5.7ch] text-7xl uppercase leading-[0.84] tracking-[0.02em] md:text-8xl lg:text-[7.25rem]">
                {heroTitleLines.map((word) => (
                  <span key={word} className="block">
                    {word}
                  </span>
                ))}
              </h1>
            </div>

            <div className="relative grid gap-12 md:grid-cols-3 md:gap-12 lg:gap-16">
              {mergedCards.map((card, index) => (
                <article key={card.title} className="group flex flex-col items-center">
                  <div className="story-arch-shell relative h-[330px] w-[210px] md:h-[410px] md:w-[235px] lg:h-[440px] lg:w-[245px]">
                    <div className="relative h-full w-full overflow-hidden rounded-t-[120px] rounded-b-[120px] border border-line bg-background">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        priority={index === 0}
                        className="story-arch-image object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                    <p className="hero-marker-gradient absolute -bottom-6 -right-3 z-20 font-serif text-6xl leading-none md:-bottom-7 md:text-7xl">
                      {card.marker}.
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="mx-auto mt-16 w-full max-w-4xl">
            <div className="mb-8 flex items-center justify-center gap-4">
              <span className="h-px w-20 bg-line md:w-28" />
              <span
                aria-hidden
                className="inline-block h-2.5 w-2.5 rotate-45 border border-accent/70 bg-background"
              />
              <span className="h-px w-20 bg-line md:w-28" />
            </div>
            <p className="text-balance text-center font-serif text-2xl leading-relaxed text-black md:text-[1.72rem]">
              {t("heroInvitation")}
            </p>
          </div>
        </div>
      </section>
    </FadeIn>
  );
}
