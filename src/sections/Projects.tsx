import { Code2, Database, Zap } from "lucide-react";
import { Section, SectionHeader, Reveal } from "../components/ui/Section";
import { ProjectCard } from "../components/ui/ProjectCard";
import { useLanguage } from "../context/LanguageContext";

const categoryConfig = [
  { icon: Code2, color: "text-accent-primary", bg: "bg-accent-soft" },
  { icon: Database, color: "text-accent-primary", bg: "bg-accent-soft" },
  { icon: Zap, color: "text-accent-primary", bg: "bg-accent-soft" },
];

export function Projects() {
  const { t } = useLanguage();

  return (
    <Section id="projects">
      <SectionHeader
        eyebrow={t("sectionLabels.projects")}
        title={t("projects.title")}
        intro={t("projects.intro")}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {categoryConfig.map((config, index) => (
          <Reveal
            key={index}
            delay={Math.min(index * 0.08, 0.24)}
            className={index === 0 ? "lg:col-span-2" : ""}
          >
            <ProjectCard sectionKey="projects" index={index} config={config} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default Projects;
