import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { Section } from "../components/ui/Section";
import { ProjectCard } from "../components/ui/ProjectCard";
import { useLanguage } from "../context/LanguageContext";
import { content } from "../data/content";

const itemConfig = {
  icon: Shield,
  color: "text-violet-500",
  bg: "bg-violet-500/10 dark:bg-violet-500/12",
};

export function PersonalProjects() {
  const { t, locale } = useLanguage();
  const items = content[locale].personalProjects.items;

  return (
    <Section id="personal">
      <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-xs font-semibold uppercase tracking-[0.28em] text-violet-600 dark:text-violet-400"
          >
            {t("sectionLabels.personalProjects")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.05 }}
            className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-zinc-950 md:text-4xl dark:text-white"
          >
            {t("personalProjects.title")}
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-2xl text-sm leading-7 text-zinc-600 dark:text-zinc-300 lg:text-right"
        >
          {t("personalProjects.intro")}
        </motion.p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {items.map((_, index) => (
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
          >
            <ProjectCard sectionKey="personalProjects" index={index} config={itemConfig} />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

export default PersonalProjects;
