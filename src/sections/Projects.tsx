import { motion } from "framer-motion";
import { Code2, Database, Zap } from "lucide-react";
import { Section } from "../components/ui/Section";
import { ProjectCard } from "../components/ui/ProjectCard";
import { useLanguage } from "../context/LanguageContext";

const categoryConfig = [
  {
    icon: Code2,
    color: "text-emerald-500",
    bg: "bg-emerald-500/8 dark:bg-emerald-500/10",
  },
  {
    icon: Database,
    color: "text-blue-500",
    bg: "bg-blue-500/8 dark:bg-blue-500/10",
  },
  {
    icon: Zap,
    color: "text-amber-500",
    bg: "bg-amber-500/8 dark:bg-amber-500/10",
  },
];

export function Projects() {
  const { t } = useLanguage();

  return (
    <Section id="projects">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <span className="text-xs font-bold tracking-widest uppercase text-emerald-600 dark:text-emerald-400 mb-3 block">
          Work
        </span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
          {t("projects.title")}
        </h2>
        <div className="h-1 w-10 bg-emerald-500 mx-auto rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categoryConfig.map((config, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <ProjectCard sectionKey="projects" index={index} config={config} />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

export default Projects;
