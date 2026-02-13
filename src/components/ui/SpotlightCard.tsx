import { useRef, useState } from "react";
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
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setIsFocused(true);
  };

  const handleMouseLeave = () => {
    setIsFocused(false);
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-2xl border border-zinc-200/80 dark:border-zinc-700/60 bg-white dark:bg-zinc-900 shadow-sm transition-all duration-500 hover:shadow-lg dark:hover:shadow-2xl hover:shadow-emerald-500/5 dark:hover:shadow-emerald-500/10 hover:-translate-y-1 ${className}`}
    >
      {/* Spotlight overlay - separate from background */}
      {isFocused && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(16, 185, 129, 0.08), transparent 40%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
