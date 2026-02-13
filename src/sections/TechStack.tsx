import { motion } from "framer-motion";
import { Code2, Server, Database, Cloud } from "lucide-react";
import { Section } from "../components/ui/Section";
import { Badge } from "../components/ui/Badge";
import { useLanguage } from "../context/LanguageContext";

const categoryIcons = [Code2, Server, Database, Cloud];

export function TechStack() {
  const { t } = useLanguage();

  return (
    <Section id="stack" className="bg-zinc-50/50 dark:bg-zinc-950">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
          {t("techStack.title")}
        </h2>
        <div className="h-1 w-10 bg-emerald-500 mx-auto rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {[0, 1, 2, 3].map((catIndex) => {
          const categoryName = t(`techStack.categories.${catIndex}.name`);
          if (categoryName === `techStack.categories.${catIndex}.name`)
            return null;
          const CategoryIcon = categoryIcons[catIndex];

          return (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: catIndex * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="p-6 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200/80 dark:border-zinc-700/60 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-500">
                  <CategoryIcon className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold tracking-tight text-zinc-900 dark:text-white">
                  {categoryName}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {[0, 1, 2, 3, 4, 5].map((itemIndex) => {
                  const tech = t(
                    `techStack.categories.${catIndex}.items.${itemIndex}`,
                  );
                  return tech &&
                    tech !==
                      `techStack.categories.${catIndex}.items.${itemIndex}` ? (
                    <motion.div
                      key={itemIndex}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.2 }}
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
