import { Server, Database, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Section } from '../components/ui/Section';
import { SpotlightCard } from '../components/ui/SpotlightCard';
import { useLanguage } from '../context/LanguageContext';

const iconMap = {
  0: Server,
  1: Database,
  2: Zap
};

const colorMap = {
  0: {
    icon: 'text-accent-api-light dark:text-accent-api-dark',
    bg: 'from-accent-api-light/5 to-accent-api-light/0 dark:from-accent-api-dark/10 dark:to-accent-api-dark/0',
    pattern: 'text-accent-api-light/5 dark:text-accent-api-dark/10'
  },
  1: {
    icon: 'text-accent-data-light dark:text-accent-data-dark',
    bg: 'from-accent-data-light/5 to-accent-data-light/0 dark:from-accent-data-dark/10 dark:to-accent-data-dark/0',
    pattern: 'text-accent-data-light/5 dark:text-accent-data-dark/10'
  },
  2: {
    icon: 'text-accent-perf-light dark:text-accent-perf-dark',
    bg: 'from-accent-perf-light/5 to-accent-perf-light/0 dark:from-accent-perf-dark/10 dark:to-accent-perf-dark/0',
    pattern: 'text-accent-perf-light/5 dark:text-accent-perf-dark/10'
  }
};

export function FocusAreas() {
  const { t } = useLanguage();

  return (
    <Section id="focus" className="bg-light-surface dark:bg-dark-surface">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold text-center mb-12"
      >
        {t('focus.title')}
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[0, 1, 2].map((index) => {
          const Icon = iconMap[index as keyof typeof iconMap];
          const colors = colorMap[index as keyof typeof colorMap];
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
            >
              <SpotlightCard className="relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} pointer-events-none`} />
                
                <div className="relative z-10">
                  <Icon className={`w-12 h-12 ${colors.icon} mb-4`} />
                  <h3 className="text-xl font-bold mb-3">
                    {t(`focus.areas.${index}.title`)}
                  </h3>
                  <p className="text-light-text-secondary dark:text-dark-text-secondary">
                    {t(`focus.areas.${index}.description`)}
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

export default FocusAreas;
