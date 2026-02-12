import type { ReactNode } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export function Button({ variant = 'primary', children, onClick, href, className = '' }: ButtonProps) {
  // Common base styles: Monospace font, sharper corners (rounded-md), technical feel
  const baseClasses = 'relative inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-md font-mono text-sm font-semibold tracking-wide transition-all duration-200 overflow-hidden group whitespace-nowrap active:scale-[0.98]';
  
  const variantClasses = {
    // Primary: High Contrast "Terminal" Block
    // Light: Black background -> Hover Indigo
    // Dark: White background -> Hover Indigo (with white text)
    primary: `
      bg-zinc-900 text-white border border-zinc-900
      dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-100
      
      hover:bg-emerald-600 hover:border-emerald-600 hover:text-white hover:shadow-lg hover:shadow-emerald-500/20
      dark:hover:bg-emerald-500 dark:hover:border-emerald-500 dark:hover:text-white dark:hover:shadow-emerald-500/30
    `,

    // Secondary: Technical Outline
    // Transparent with visible border
    secondary: `
      bg-transparent 
      text-zinc-600 border border-zinc-300
      dark:text-zinc-400 dark:border-zinc-700
      
      hover:text-zinc-900 hover:border-zinc-900 hover:bg-zinc-50
      dark:hover:text-zinc-100 dark:hover:border-zinc-100 dark:hover:bg-zinc-800
    `
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.replace(/\s+/g, ' ');

  const content = (
    <>
      {/* Content */}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
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
