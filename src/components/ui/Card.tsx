import type { ReactNode } from 'react';

interface CardProps {
  className?: string;
  children: ReactNode;
  variant?: 'default' | 'gradient';
  gradientColor?: 'indigo' | 'blue' | 'emerald' | 'amber' | 'violet';
}

export function Card({ className = '', children, variant = 'default', gradientColor = 'indigo' }: CardProps) {
  const gradientColors = {
    indigo: 'from-indigo-500 to-blue-500',
    blue: 'from-blue-500 to-cyan-500',
    emerald: 'from-emerald-500 to-teal-500',
    amber: 'from-amber-500 to-orange-500',
    violet: 'from-violet-500 to-purple-500'
  };

  if (variant === 'gradient') {
    return (
      <div className={`p-[1px] bg-gradient-to-br ${gradientColors[gradientColor]} rounded-2xl ${className}`}>
        <div className="bg-[var(--color-card)] rounded-2xl p-6 h-full hover:shadow-card-hover dark:hover:shadow-card-dark-hover transition-all duration-300">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 shadow-card dark:shadow-card-dark hover:shadow-card-hover dark:hover:shadow-card-dark-hover hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}
