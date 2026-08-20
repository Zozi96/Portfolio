import { Shield } from "lucide-react";
import { Section, SectionHeader, Reveal } from "../components/ui/Section";
import { ProjectCard } from "../components/ui/ProjectCard";
import { useLanguage } from "../context/LanguageContext";
import { content } from "../data/content";

const itemConfig = {
  icon: Shield,
  color: "text-accent-primary",
  bg: "bg-accent-soft",
};

export function PersonalProjects() {
  const { t, locale } = useLanguage();
  const items = content[locale].personalProjects.items;

  return (
    <Section id="personal">
      <SectionHeader
        eyebrow={t("sectionLabels.personalProjects")}
        title={t("personalProjects.title")}
        intro={t("personalProjects.intro")}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {items.map((_, index) => (
          <Reveal key={index} delay={Math.min(index * 0.08, 0.24)}>
            <ProjectCard sectionKey="personalProjects" index={index} config={itemConfig} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default PersonalProjects;
