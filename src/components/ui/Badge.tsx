interface BadgeProps {
  children: string;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-zinc-200/80 bg-zinc-50/85 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-500/30 hover:text-emerald-700 dark:border-zinc-700/70 dark:bg-zinc-900/70 dark:text-zinc-300 dark:hover:border-emerald-500/30 dark:hover:text-emerald-300 ${className}`}
    >
      {children}
    </span>
  );
}
