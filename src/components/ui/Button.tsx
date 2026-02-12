import type { ReactNode } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export function Button({ variant = 'primary', children, onClick, href, className = '' }: ButtonProps) {
  const baseClasses = 'relative inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 overflow-hidden group';
  
  const variantClasses = {
    primary: 'bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-400 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-100',
    secondary: 'bg-light-surface dark:bg-dark-surface border border-light-border dark:border-dark-border text-light-text-primary dark:text-dark-text-primary hover:bg-light-card dark:hover:bg-dark-card hover:border-light-accent-primary dark:hover:border-dark-accent-primary shadow-md hover:shadow-lg'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  const content = (
    <>
      {/* Ripple/Shimmer Effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
      
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
