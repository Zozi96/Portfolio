import type { ReactNode } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export function Button({ variant = 'primary', children, onClick, href, className = '' }: ButtonProps) {
  // Apple-style base: Rounded, smooth transitions, sans-serif
  const baseClasses = 'relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 group overflow-hidden active:scale-95';
  
  const variantClasses = {
    // Primary: Prominent Apple Button
    primary: `
      bg-black text-white 
      dark:bg-white dark:text-black
      shadow-premium hover:shadow-premium-hover hover:-translate-y-0.5
      border border-transparent
    `,

    // Secondary: Subtle Apple Button
    secondary: `
      bg-white text-zinc-900 border border-zinc-200
      dark:bg-zinc-900 dark:text-white dark:border-zinc-700
      hover:bg-zinc-50 dark:hover:bg-zinc-800
      shadow-sm
    `
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  const content = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
      {variant === 'primary' && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
