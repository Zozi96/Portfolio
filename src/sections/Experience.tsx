import { motion } from 'framer-motion';
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
    <Section id="experience">
      <motion.h2 
        className="text-4xl md:text-5xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {t('experience.title')}
      </motion.h2>
      <div className="max-w-4xl mx-auto space-y-8">
        {roles.map((index) => (
          <motion.div 
            key={index} 
            className="border-l-4 border-light-accent-primary dark:border-dark-accent-primary pl-6"
            initial={{ opacity: 0, x: -30, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
          >
            <div className="mb-2">
              <h3 className="text-2xl font-bold">
                {t(`experience.roles.${index}.title`)}
              </h3>
              <div className="flex items-center gap-3 text-light-text-secondary dark:text-dark-text-secondary mt-1">
                <span className="font-semibold">
                  {t(`experience.roles.${index}.company`)}
                </span>
                <span>•</span>
                <span>{t(`experience.roles.${index}.period`)}</span>
              </div>
            </div>
            <ul className="list-disc list-inside space-y-2 mt-4">
              {[0, 1, 2, 3].map((descIndex) => {
                const desc = t(`experience.roles.${index}.description.${descIndex}`);
                return desc && desc !== `experience.roles.${index}.description.${descIndex}` ? (
                  <motion.li 
                    key={descIndex} 
                    className="text-light-text-secondary dark:text-dark-text-secondary"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 + descIndex * 0.05 }}
                  >
                    {desc}
                  </motion.li>
                ) : null;
              })}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

export default Experience;
