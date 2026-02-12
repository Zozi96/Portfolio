import { motion } from 'framer-motion';
import { Calendar, Building2 } from 'lucide-react';
import { Section } from '../components/ui/Section';
import { useLanguage } from '../context/LanguageContext';

export function Experience() {
  const { t } = useLanguage();

  const roles = [];
  let index = 0;
  while (true) {
    const title = t(`experience.roles.${index}.title`);
    if (title === `experience.roles.${index}.title`) break;
    roles.push(index);
    index++;
  }

  return (
    <Section id="experience" className="relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
          {t('experience.title')}
        </h2>
        <div className="h-1 w-20 bg-light-accent-primary dark:bg-dark-accent-primary mx-auto rounded-full" />
      </motion.div>

      <div className="max-w-4xl mx-auto relative">
        {/* Timeline Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-light-border dark:bg-dark-border transform -translate-x-1/2" />

        <div className="space-y-12">
          {roles.map((index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row gap-8 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Content Card */}
              <div className="flex-1 ml-16 md:ml-0">
                <div className={`p-6 bg-light-card dark:bg-dark-card rounded-xl border border-light-border dark:border-dark-border shadow-card dark:shadow-card-dark hover:border-light-accent-primary dark:hover:border-dark-accent-primary transition-colors duration-300 relative group`}>
                  
                  {/* Connector Line (Mobile/Desktop) */}
                  <div className={`absolute top-8 w-8 h-px bg-light-border dark:border-dark-border
                    ${index % 2 === 0 
                      ? 'left-[-33px] md:right-[-33px] md:left-auto' 
                      : 'left-[-33px] md:left-[-33px]'
                    }`} 
                  />

                  <div className="flex flex-col gap-2 mb-4">
                    <h3 className="text-xl font-bold text-light-text-primary dark:text-dark-text-primary group-hover:text-light-accent-primary dark:group-hover:text-dark-accent-primary transition-colors">
                      {t(`experience.roles.${index}.title`)}
                    </h3>
                    
                    <div className="flex flex-wrap gap-3 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                      <div className="flex items-center gap-1.5 bg-light-surface dark:bg-dark-surface px-2 py-1 rounded">
                        <Building2 className="w-4 h-4 text-light-accent-primary dark:text-dark-accent-primary" />
                        <span className="font-medium">{t(`experience.roles.${index}.company`)}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-light-surface dark:bg-dark-surface px-2 py-1 rounded">
                        <Calendar className="w-4 h-4 text-light-text-muted dark:text-dark-text-muted" />
                        <span>{t(`experience.roles.${index}.period`)}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {[0, 1, 2, 3].map((descIndex) => {
                      const desc = t(`experience.roles.${index}.description.${descIndex}`);
                      return desc && desc !== `experience.roles.${index}.description.${descIndex}` ? (
                        <li key={descIndex} className="flex items-start gap-2 text-light-text-secondary dark:text-dark-text-secondary">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-light-accent-primary/60 dark:bg-dark-accent-primary/60 flex-shrink-0" />
                          <span>{desc}</span>
                        </li>
                      ) : null;
                    })}
                  </ul>
                </div>
              </div>

              {/* Timeline Node - Center */}
              <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 mt-8 z-10">
                <div className="absolute inset-0 bg-light-background dark:bg-dark-background rounded-full border-2 border-light-accent-primary dark:border-dark-accent-primary shadow-[0_0_0_4px_var(--color-background)]" />
                <div className="absolute inset-1 bg-light-accent-primary dark:bg-dark-accent-primary rounded-full animate-pulse" />
              </div>

              {/* Empty Space for Alternating Layout */}
              <div className="hidden md:block flex-1" />
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default Experience;
