import { cn } from "@/lib/utils";

type SectionProps = {
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  className?: string;
};

export function Section({ title, eyebrow, children, className }: SectionProps) {
  return (
    <section className={cn("rounded-2xl border border-line bg-surface p-6 md:p-10", className)}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted">{eyebrow}</p>
      ) : null}
      <h2 className="mb-4 text-3xl leading-tight md:text-4xl">{title}</h2>
      <div className="space-y-4 text-base leading-7 text-foreground/90">{children}</div>
    </section>
  );
}
