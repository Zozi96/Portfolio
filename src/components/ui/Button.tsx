import type { ReactNode } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary";
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
  disabled?: boolean;
}

export function Button({
  variant = "primary",
  children,
  onClick,
  href,
  className = "",
  disabled = false,
}: ButtonProps) {
  const baseClasses =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold tracking-[0.01em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.98] cursor-pointer";

  const disabledClasses = disabled
    ? "pointer-events-none cursor-not-allowed opacity-50"
    : "";

  const variantClasses = {
    primary:
      "border border-emerald-500/10 bg-zinc-950 text-white shadow-[0_16px_40px_-22px_rgba(24,24,27,0.85)] hover:-translate-y-0.5 hover:bg-zinc-900 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100",
    secondary:
      "border border-zinc-200/80 bg-white/80 text-zinc-900 shadow-[0_12px_30px_-24px_rgba(15,23,42,0.45)] backdrop-blur hover:-translate-y-0.5 hover:border-emerald-500/30 hover:text-emerald-700 dark:border-zinc-700/80 dark:bg-zinc-900/80 dark:text-zinc-100 dark:hover:border-emerald-500/30 dark:hover:text-emerald-300",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`;

  const content = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
      <span className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span className="absolute inset-y-0 left-[-35%] w-1/3 rotate-12 bg-white/18 blur-2xl dark:bg-emerald-300/10" />
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={disabled ? undefined : href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={disabled}
      >
        {content}
      </a>
    );
  }

  return (
    <button onClick={disabled ? undefined : onClick} className={classes} disabled={disabled}>
      {content}
    </button>
  );
}
