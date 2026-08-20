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
    "inline-flex items-center justify-center gap-2 rounded-[10px] px-6 py-3 text-[15px] font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-primary active:scale-[0.98] cursor-pointer";

  const disabledClasses = disabled
    ? "pointer-events-none cursor-not-allowed opacity-50"
    : "";

  const variantClasses = {
    primary:
      "bg-accent-primary text-white shadow-[0_6px_16px_rgba(36,71,216,0.25)] hover:bg-accent-hover dark:shadow-none",
    secondary:
      "border border-border bg-surface text-text-primary hover:border-text-muted",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`;

  const content = (
    <span className="inline-flex items-center gap-2">{children}</span>
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
