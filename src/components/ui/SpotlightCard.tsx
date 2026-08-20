import type { ReactNode } from "react";

interface SpotlightCardProps {
  className?: string;
  children: ReactNode;
  /** Kept for API compatibility; the card no longer renders a mouse glow. */
  spotlightColor?: string;
}

export function SpotlightCard({ className = "", children }: SpotlightCardProps) {
  return (
    <div
      className={`rounded-card border border-border bg-surface shadow-card ${className}`}
    >
      {children}
    </div>
  );
}
