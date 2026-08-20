import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../../hooks/useReducedMotion";

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
      <div className={`mx-auto max-w-6xl ${containerClassName}`}>{children}</div>
    </section>
  );
}

interface RevealProps {
  className?: string;
  delay?: number;
  children: ReactNode;
}

/** Subtle scroll reveal (16px rise + fade), disabled for reduced-motion users. */
export function Reveal({ className = "", delay = 0, children }: RevealProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  intro?: string;
}

export function SectionHeader({ eyebrow, title, intro }: SectionHeaderProps) {
  return (
    <Reveal className="mb-11">
      <p className="text-[13px] font-semibold uppercase tracking-[0.1em] text-accent-primary">
        {eyebrow}
      </p>
      <h2 className="mt-2.5 max-w-3xl text-[28px] font-bold leading-tight md:text-[36px]">
        {title}
      </h2>
      {intro && (
        <p className="mt-3.5 max-w-2xl text-[16.5px] leading-7 text-text-secondary">
          {intro}
        </p>
      )}
    </Reveal>
  );
}
