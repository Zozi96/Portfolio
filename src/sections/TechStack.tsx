import { motion } from "framer-motion";
import { Code2, Server, Database, Cloud } from "lucide-react";
import { Section } from "../components/ui/Section";
import { Badge } from "../components/ui/Badge";
import { useLanguage } from "../context/LanguageContext";

const categoryIcons = [Code2, Server, Database, Cloud];

const categoryColors = [
  { icon: "text-emerald-500", bg: "bg-emerald-500/10 dark:bg-emerald-500/15" },
  { icon: "text-cyan-500", bg: "bg-cyan-500/10 dark:bg-cyan-500/15" },
  { icon: "text-violet-500", bg: "bg-violet-500/10 dark:bg-violet-500/15" },
  { icon: "text-amber-500", bg: "bg-amber-500/10 dark:bg-amber-500/15" },
];

export function TechStack() {
  const { t } = useLanguage();

  return (
    <Section id="stack" className="relative">
      <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-600 dark:text-emerald-400"
          >
            {t("sectionLabels.techStack")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-zinc-950 md:text-4xl dark:text-white"
          >
            {t("techStack.title")}
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-300 lg:text-right"
        >
          {t("techStack.intro")}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
        {[0, 1, 2, 3].map((catIndex) => {
          const categoryName = t(`techStack.categories.${catIndex}.name`);
          if (categoryName === `techStack.categories.${catIndex}.name`) return null;
          const CategoryIcon = categoryIcons[catIndex];

          return (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: catIndex * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="rounded-[1.75rem] border border-zinc-200/70 bg-white/75 p-6 shadow-[0_22px_70px_-40px_rgba(15,23,42,0.28)] backdrop-blur-xl dark:border-zinc-800/70 dark:bg-zinc-950/70 dark:shadow-[0_28px_80px_-52px_rgba(0,0,0,0.72)]"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className={`rounded-2xl p-3 ${categoryColors[catIndex].bg} ${categoryColors[catIndex].icon}`}>
                  <CategoryIcon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold tracking-[-0.03em] text-zinc-950 dark:text-white">
                  {categoryName}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {[0, 1, 2, 3, 4, 5].map((itemIndex) => {
                  const tech = t(`techStack.categories.${catIndex}.items.${itemIndex}`);
                  return tech && tech !== `techStack.categories.${catIndex}.items.${itemIndex}` ? (
                    <motion.div key={itemIndex} whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
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
