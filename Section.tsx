import { ReactNode } from "react";

export default function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children
}: {
  id?: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-6">
        <p className="text-sm tracking-wide text-muted/80">{eyebrow}</p>
        <h2 className="mt-2 text-3xl sm:text-4xl font-semibold leading-tight">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-3 max-w-3xl text-base sm:text-lg text-muted/90 leading-relaxed">
            {subtitle}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
