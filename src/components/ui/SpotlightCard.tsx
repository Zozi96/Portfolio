import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SpotlightCardProps {
  className?: string;
  children: ReactNode;
}

export function SpotlightCard({ className = '', children }: SpotlightCardProps) {
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
      style={{
        background: isFocused
          ? `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(16, 185, 129, 0.08), transparent 40%)`
          : 'transparent',
      }}
      className={`group relative rounded-xl border border-light-border dark:border-dark-border bg-light-card dark:bg-dark-card shadow-card dark:shadow-card-dark transition-all duration-300 hover:shadow-card-hover dark:hover:shadow-card-dark-hover hover:border-light-accent-primary dark:hover:border-dark-accent-primary ${className}`}
    >
      {isFocused && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(16, 185, 129, 0.12), transparent 40%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
