interface BadgeProps {
  children: string;
  className?: string;
  variant?: 'default' | 'api' | 'data' | 'perf' | 'cloud';
}

export function Badge({ children, className = '', variant = 'default' }: BadgeProps) {
  const variantClasses = {
    default: 'bg-light-accent-light dark:bg-dark-accent-dark text-light-accent-primary dark:text-dark-accent-primary border-light-accent-subtle dark:border-dark-accent-subtle',
    api: 'bg-accent-api-bg dark:bg-accent-api-dark-bg text-accent-api-light dark:text-accent-api-dark border-accent-api-light/20 dark:border-accent-api-dark/20',
    data: 'bg-accent-data-bg dark:bg-accent-data-dark-bg text-accent-data-light dark:text-accent-data-dark border-accent-data-light/20 dark:border-accent-data-dark/20',
    perf: 'bg-accent-perf-bg dark:bg-accent-perf-dark-bg text-accent-perf-light dark:text-accent-perf-dark border-accent-perf-light/20 dark:border-accent-perf-dark/20',
    cloud: 'bg-accent-cloud-bg dark:bg-accent-cloud-dark-bg text-accent-cloud-light dark:text-accent-cloud-dark border-accent-cloud-light/20 dark:border-accent-cloud-dark/20',
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-mono font-medium border shadow-sm transition-transform duration-200 hover:scale-105 active:scale-95 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
