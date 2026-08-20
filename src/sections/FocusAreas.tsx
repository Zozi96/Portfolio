import { Server, Database, Zap } from "lucide-react";
import { Section, SectionHeader, Reveal } from "../components/ui/Section";
import { SpotlightCard } from "../components/ui/SpotlightCard";
import { useLanguage } from "../context/LanguageContext";

const icons = [Server, Database, Zap];

export function FocusAreas() {
  const { t } = useLanguage();

  return (
    <Section id="focus">
      <SectionHeader
        eyebrow={t("sectionLabels.focus")}
        title={t("focus.title")}
        intro={t("focus.intro")}
      />

      <div className="grid gap-6 md:grid-cols-3">
        {[0, 1, 2].map((index) => {
          const Icon = icons[index];

          return (
            <Reveal key={index} delay={Math.min(index * 0.08, 0.24)} className="h-full">
              <SpotlightCard className="h-full p-7">
                <div className="flex h-full flex-col">
                  <span className="mb-6 inline-flex w-fit rounded-[10px] bg-accent-soft p-3 text-accent-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-xl font-semibold">
                    {t(`focus.areas.${index}.title`)}
                  </h3>
                  <p className="mt-3 text-[15px] leading-7 text-text-secondary">
                    {t(`focus.areas.${index}.description`)}
                  </p>
                </div>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

export default FocusAreas;
