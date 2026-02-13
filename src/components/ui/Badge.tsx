interface BadgeProps {
  children: string;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300 hover:scale-105 active:scale-95 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60 ${className}`}
    >
      {children}
    </span>
  );
}
