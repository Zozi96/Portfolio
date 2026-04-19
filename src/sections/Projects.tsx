import { motion } from "framer-motion";
import { Code2, Database, Zap } from "lucide-react";
import { Section } from "../components/ui/Section";
import { ProjectCard } from "../components/ui/ProjectCard";
import { useLanguage } from "../context/LanguageContext";

const categoryConfig = [
  {
    icon: Code2,
    color: "text-teal-600 dark:text-teal-300",
    bg: "bg-teal-500/10 dark:bg-teal-500/12",
  },
  {
    icon: Database,
    color: "text-cyan-600 dark:text-cyan-300",
    bg: "bg-cyan-500/10 dark:bg-cyan-500/12",
  },
  {
    icon: Zap,
    color: "text-amber-600 dark:text-amber-300",
    bg: "bg-amber-500/10 dark:bg-amber-500/12",
  },
];

export function Projects() {
  const { t } = useLanguage();

  return (
    <Section id="projects" className="relative">
      <div className="mb-14 grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-700 dark:text-teal-300"
          >
            {t("sectionLabels.projects")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-zinc-950 md:text-4xl dark:text-white"
          >
            {t("projects.title")}
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-300 lg:justify-self-end lg:text-right"
        >
          {t("projects.intro")}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-12">
        {categoryConfig.map((config, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: Math.min(index * 0.08, 0.24),
              ease: [0.16, 1, 0.3, 1],
            }}
            className={index === 0 ? "lg:col-span-12" : "lg:col-span-6"}
          >
            <ProjectCard sectionKey="projects" index={index} config={config} />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

export default Projects;
