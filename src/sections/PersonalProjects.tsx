import { motion } from "framer-motion";
import { Shield } from "lucide-react";
import { Section } from "../components/ui/Section";
import { ProjectCard } from "../components/ui/ProjectCard";
import { useLanguage } from "../context/LanguageContext";
import { content } from "../data/content";

const itemConfig = {
  icon: Shield,
  color: "text-violet-500",
  bg: "bg-violet-500/8 dark:bg-violet-500/10",
};

export function PersonalProjects() {
  const { t, locale } = useLanguage();
  const items = content[locale].personalProjects.items;

  return (
    <Section id="personal">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p className="text-xs font-bold tracking-widest uppercase text-violet-600 dark:text-violet-400 mb-3">
          Side Projects
        </p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
          {t("personalProjects.title")}
        </h2>
        <div className="h-1 w-10 bg-violet-500 mx-auto rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((_, index) => (
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
            <ProjectCard
              sectionKey="personalProjects"
              index={index}
              config={itemConfig}
            />
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

export default PersonalProjects;
