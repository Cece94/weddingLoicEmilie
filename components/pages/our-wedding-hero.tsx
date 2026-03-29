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
      <section className="relative mt-6 overflow-hidden px-2 pb-10 pt-16 md:mt-8 md:px-4 md:pb-12 md:pt-20 lg:mt-0 lg:px-8 lg:py-14">
        <div className="relative z-10">
          <div className="grid gap-6 md:gap-10 lg:grid-cols-[minmax(300px,1.15fr)_2.25fr] lg:items-start lg:gap-10">
            <div className="flex flex-col items-center text-center lg:-ml-10 lg:min-h-[440px] lg:items-start lg:justify-center lg:text-left">
              <p className="text-xs uppercase tracking-[0.25em] text-muted lg:mb-8">Emilie & Loïc</p>
              <h1 className="hero-title-gradient uppercase">
                <span className="block whitespace-nowrap text-[10.8vw] leading-[0.92] tracking-[0.01em] md:hidden">
                  {t("heroTitle").toUpperCase()}
                </span>
                <span className="hidden max-w-[5.7ch] text-8xl leading-[0.84] tracking-[0.02em] md:block lg:text-[7.25rem]">
                  {heroTitleLines.map((word) => (
                    <span key={word} className="block">
                      {word}
                    </span>
                  ))}
                </span>
              </h1>
            </div>

            <div className="relative grid grid-cols-3 gap-2 sm:gap-3 md:gap-12 lg:gap-16">
              {mergedCards.map((card, index) => (
                <article key={card.title} className="group flex flex-col items-center">
                  <div className="story-arch-shell relative h-[165px] w-full max-w-[112px] sm:h-[190px] sm:max-w-[128px] md:h-[410px] md:max-w-none md:w-[235px] lg:h-[440px] lg:w-[245px]">
                    <div className="relative h-full w-full overflow-hidden rounded-t-[120px] rounded-b-[120px] border border-line bg-background">
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        priority={index === 0}
                        className="story-arch-image object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />
                    </div>
                    <p className="hero-marker-gradient absolute -bottom-4 -right-1 z-20 font-serif text-4xl leading-none sm:-bottom-5 sm:-right-2 sm:text-5xl md:-bottom-7 md:-right-3 md:text-7xl">
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
