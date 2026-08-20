import { Code2, Server, Database, Cloud } from "lucide-react";
import { Section, SectionHeader, Reveal } from "../components/ui/Section";
import { SpotlightCard } from "../components/ui/SpotlightCard";
import { Badge } from "../components/ui/Badge";
import { useLanguage } from "../context/LanguageContext";

const categoryIcons = [Code2, Server, Database, Cloud];

export function TechStack() {
  const { t } = useLanguage();

  return (
    <Section id="stack">
      <SectionHeader
        eyebrow={t("sectionLabels.techStack")}
        title={t("techStack.title")}
        intro={t("techStack.intro")}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {[0, 1, 2, 3].map((catIndex) => {
          const categoryName = t(`techStack.categories.${catIndex}.name`);
          if (categoryName === `techStack.categories.${catIndex}.name`) return null;
          const CategoryIcon = categoryIcons[catIndex];

          return (
            <Reveal key={catIndex} delay={Math.min(catIndex * 0.08, 0.24)} className="h-full">
              <SpotlightCard className="h-full p-7">
                <div className="mb-5 flex items-center gap-3">
                  <span className="rounded-[10px] bg-accent-soft p-2.5 text-accent-primary">
                    <CategoryIcon className="h-5 w-5" />
                  </span>
                  <h3 className="text-lg font-semibold">{categoryName}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[0, 1, 2, 3, 4, 5].map((itemIndex) => {
                    const tech = t(`techStack.categories.${catIndex}.items.${itemIndex}`);
                    return tech && tech !== `techStack.categories.${catIndex}.items.${itemIndex}` ? (
                      <Badge key={itemIndex}>{tech}</Badge>
                    ) : null;
                  })}
                </div>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

export default TechStack;
