import { motion } from 'framer-motion';
import { Code2, Database, Zap } from 'lucide-react';
import { Section } from '../components/ui/Section';
import { SpotlightCard } from '../components/ui/SpotlightCard';
import { Badge } from '../components/ui/Badge';
import { useLanguage } from '../context/LanguageContext';

const categoryConfig = {
  0: {
    color: 'border-accent-api-light dark:border-accent-api-dark',
    bgColor: 'from-accent-api-light/10 to-accent-data-light/10 dark:from-accent-api-dark/10 dark:to-accent-data-dark/10',
    icon: Code2,
    iconColor: 'text-accent-api-light dark:text-accent-api-dark'
  },
  1: {
    color: 'border-accent-data-light dark:border-accent-data-dark',
    bgColor: 'from-accent-data-light/10 to-accent-perf-light/10 dark:from-accent-data-dark/10 dark:to-accent-perf-dark/10',
    icon: Database,
    iconColor: 'text-accent-data-light dark:text-accent-data-dark'
  },
  2: {
    color: 'border-accent-perf-light dark:border-accent-perf-dark',
    bgColor: 'from-accent-perf-light/10 to-accent-cloud-light/10 dark:from-accent-perf-dark/10 dark:to-accent-cloud-dark/10',
    icon: Zap,
    iconColor: 'text-accent-perf-light dark:text-accent-perf-dark'
  }
};

export function Projects() {
  const { t } = useLanguage();

  return (
    <Section id="projects">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold text-center mb-12"
      >
        {t('projects.title')}
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        {[0, 1, 2].map((index) => {
          const config = categoryConfig[index as keyof typeof categoryConfig];
          const Icon = config.icon;
          
          const gridSpans = ['md:col-span-3', 'md:col-span-3', 'md:col-span-6'];
          const heights = ['', '', 'md:h-auto'];
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`${gridSpans[index]} ${heights[index]}`}
            >
              <div className={`relative p-[2px] bg-gradient-to-br ${config.color} rounded-2xl h-full`}>
                <SpotlightCard className={`flex flex-col h-full border-t-4 ${config.color} relative overflow-hidden`}>
                  {/* Decorative Number Background */}
                  <div className={`absolute -right-10 -top-10 text-[200px] font-bold ${config.iconColor} opacity-5 select-none pointer-events-none`}>
                    {index + 1}
                  </div>
                  
                  <div className={`relative h-40 -mx-6 -mt-6 mb-4 rounded-t-2xl overflow-hidden bg-gradient-to-br ${config.bgColor}`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className={`w-20 h-20 ${config.iconColor} opacity-40`} />
                    </div>
                  </div>
                  
                  <div className="mb-2 relative z-10">
                    <span className={`text-sm font-semibold ${config.iconColor}`}>
                      {t(`projects.items.${index}.category`)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 relative z-10">
                    {t(`projects.items.${index}.title`)}
                  </h3>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4 flex-grow relative z-10">
                    {t(`projects.items.${index}.description`)}
                  </p>
                  <div className="grid grid-cols-3 gap-2 mb-4 py-4 border-y border-light-border dark:border-dark-border relative z-10">
                    {[0, 1, 2].map((metricIndex) => (
                      <div key={metricIndex} className="text-center">
                        <div className={`text-lg font-bold font-mono ${config.iconColor}`}>
                          {t(`projects.items.${index}.metrics.${metricIndex}.value`)}
                        </div>
                        <div className="text-xs text-light-text-muted dark:text-dark-text-muted">
                          {t(`projects.items.${index}.metrics.${metricIndex}.label`)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {[0, 1, 2, 3, 4].map((stackIndex) => {
                      const tech = t(`projects.items.${index}.stack.${stackIndex}`);
                      return tech && tech !== `projects.items.${index}.stack.${stackIndex}` ? (
                        <Badge key={stackIndex}>{tech}</Badge>
                      ) : null;
                    })}
                  </div>
                </SpotlightCard>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

export default Projects;
