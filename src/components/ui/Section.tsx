import type { ReactNode } from "react";

interface SectionProps {
  id?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}

export function Section({
  id,
  className = "",
  containerClassName = "",
  children,
}: SectionProps) {
  return (
    <section id={id} className={`px-4 py-18 md:px-8 md:py-24 lg:px-12 xl:px-16 ${className}`}>
      <div className={`mx-auto max-w-7xl ${containerClassName}`}>{children}</div>
    </section>
  );
}
