import { useRef } from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SpotlightCardProps {
  className?: string;
  children: ReactNode;
}

export function SpotlightCard({
  className = "",
  children,
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    divRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    divRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`group relative rounded-2xl border border-zinc-200/80 dark:border-zinc-700/60 bg-white dark:bg-zinc-900 shadow-sm transition-all duration-500 hover:shadow-lg dark:hover:shadow-2xl hover:shadow-emerald-500/5 dark:hover:shadow-emerald-500/10 hover:-translate-y-1 ${className}`}
    >
      {/* Spotlight overlay - uses CSS variables updated via direct DOM manipulation */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(var(--color-accent-rgb, 16, 185, 129), 0.08), transparent 40%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
