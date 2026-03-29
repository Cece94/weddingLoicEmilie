type PageIntroProps = {
  title: string;
  subtitle: string;
};

export function PageIntro({ title, subtitle }: PageIntroProps) {
  return (
    <section className="border-b border-line pb-10 pt-12 md:pb-16 md:pt-16">
      <p className="mb-4 text-xs uppercase tracking-[0.25em] text-muted">Loic & Emilie</p>
      <h1 className="max-w-4xl text-5xl leading-none md:text-7xl">{title}</h1>
      <p className="mt-6 max-w-3xl text-base leading-8 text-muted md:text-lg">{subtitle}</p>
    </section>
  );
}
