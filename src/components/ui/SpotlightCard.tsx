import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SpotlightCardProps {
  className?: string;
  children: ReactNode;
  spotlightColor?: string;
}

export function SpotlightCard({
  className = "",
  children,
  spotlightColor = "rgba(16, 185, 129, 0.14)",
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={() => {
        setIsFocused(true);
        setOpacity(1);
      }}
      onBlur={() => {
        setIsFocused(false);
        setOpacity(0);
      }}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`group relative overflow-hidden rounded-[1.75rem] border border-zinc-200/70 bg-white/75 shadow-[0_24px_70px_-36px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-emerald-500/20 hover:shadow-[0_36px_100px_-46px_rgba(16,185,129,0.28)] dark:border-zinc-800/70 dark:bg-zinc-950/70 dark:shadow-[0_28px_80px_-48px_rgba(0,0,0,0.8)] ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-[1.75rem] opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(520px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 42%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.45),transparent_30%,transparent_70%,rgba(16,185,129,0.06))] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_28%,transparent_72%,rgba(16,185,129,0.08))]" />
      <div className="relative z-10 h-full w-full">{children}</div>
    </motion.div>
  );
}
