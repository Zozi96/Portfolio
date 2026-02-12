import { motion } from 'framer-motion';
import { Section } from '../components/ui/Section';
import { Badge } from '../components/ui/Badge';
import { useLanguage } from '../context/LanguageContext';

export function TechStack() {
  const { t } = useLanguage();

  return (
    <Section id="stack" className="bg-light-surface dark:bg-dark-surface">
      <motion.h2 
        className="text-4xl md:text-5xl font-bold text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {t('techStack.title')}
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[0, 1, 2, 3].map((catIndex) => {
          const categoryName = t(`techStack.categories.${catIndex}.name`);
          if (categoryName === `techStack.categories.${catIndex}.name`) return null;
          
          return (
            <motion.div 
              key={catIndex}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            >
              <h3 className="text-xl font-bold mb-4">{categoryName}</h3>
              <div className="flex flex-wrap gap-2">
                {[0, 1, 2, 3, 4, 5].map((itemIndex) => {
                  const tech = t(`techStack.categories.${catIndex}.items.${itemIndex}`);
                  return tech && tech !== `techStack.categories.${catIndex}.items.${itemIndex}` ? (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.3, 
                        delay: catIndex * 0.1 + itemIndex * 0.05 
                      }}
                    >
                      <Badge>{tech}</Badge>
                    </motion.div>
                  ) : null;
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

export default TechStack;
