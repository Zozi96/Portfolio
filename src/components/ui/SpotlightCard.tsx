import { useRef, useState } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const opacity = useMotionValue(0);
  const background = useMotionTemplate`radial-gradient(520px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 42%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const rect = divRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={() => {
        setIsFocused(true);
        opacity.set(1);
      }}
      onBlur={() => {
        setIsFocused(false);
        opacity.set(0);
      }}
      onMouseEnter={() => opacity.set(1)}
      onMouseLeave={() => opacity.set(0)}
      className={`group relative overflow-hidden rounded-card border border-zinc-200/70 bg-white/75 shadow-[0_24px_70px_-36px_rgba(15,23,42,0.35)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-emerald-500/20 hover:shadow-[0_36px_100px_-46px_rgba(16,185,129,0.28)] dark:border-zinc-800/70 dark:bg-zinc-950/70 dark:shadow-[0_28px_80px_-48px_rgba(0,0,0,0.8)] ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-card opacity-0 transition duration-300"
        style={{ opacity, background }}
      />
      <div className="pointer-events-none absolute inset-0 rounded-card bg-[linear-gradient(180deg,rgba(255,255,255,0.45),transparent_30%,transparent_70%,rgba(16,185,129,0.06))] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_28%,transparent_72%,rgba(16,185,129,0.08))]" />
      <div className="relative z-10 h-full w-full">{children}</div>
    </motion.div>
  );
}
