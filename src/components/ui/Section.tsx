import type { ReactNode } from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

export function Section({ id, className = '', children }: SectionProps) {
  return (
    <section
      id={id}
      className={`px-4 md:px-8 lg:px-16 py-16 md:py-24 ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
}
