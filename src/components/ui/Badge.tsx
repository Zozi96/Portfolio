interface BadgeProps {
  children: string;
  className?: string;
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-[12.5px] font-medium text-text-secondary ${className}`}
    >
      {children}
    </span>
  );
}
