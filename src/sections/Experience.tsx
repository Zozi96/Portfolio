import { Section, SectionHeader, Reveal } from "../components/ui/Section";
import { useLanguage } from "../context/LanguageContext";

export function Experience() {
  const { t } = useLanguage();

  const roles: number[] = [];
  let index = 0;
  while (true) {
    const title = t(`experience.roles.${index}.title`);
    if (title === `experience.roles.${index}.title`) break;
    roles.push(index);
    index++;
  }

  return (
    <Section id="experience">
      <SectionHeader
        eyebrow={t("sectionLabels.experience")}
        title={t("experience.title")}
        intro={t("experience.intro")}
      />

      <div>
        {roles.map((roleIndex) => (
          <Reveal key={roleIndex}>
            <div className="grid gap-1.5 border-t border-border py-7 md:grid-cols-[180px_1fr] md:gap-6">
              <p className="text-sm font-medium text-text-muted">
                {t(`experience.roles.${roleIndex}.period`)}
              </p>
              <div>
                <h3 className="text-lg font-semibold">
                  {t(`experience.roles.${roleIndex}.title`)}
                </h3>
                <p className="mb-2 text-[15px] font-semibold text-accent-primary">
                  {t(`experience.roles.${roleIndex}.company`)}
                </p>
                <ul className="space-y-1.5">
                  {[0, 1, 2, 3].map((descIndex) => {
                    const desc = t(`experience.roles.${roleIndex}.description.${descIndex}`);
                    return desc && desc !== `experience.roles.${roleIndex}.description.${descIndex}` ? (
                      <li
                        key={descIndex}
                        className="flex items-start gap-2.5 text-[15px] leading-7 text-text-secondary"
                      >
                        <span
                          className="mt-[13px] h-1 w-1 flex-shrink-0 rounded-full bg-text-muted"
                          aria-hidden="true"
                        />
                        <span>{desc}</span>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export default Experience;
