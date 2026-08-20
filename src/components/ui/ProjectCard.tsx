import { type ElementType } from "react";
import { SpotlightCard } from "./SpotlightCard";
import { Badge } from "./Badge";
import { useLanguage } from "../../context/LanguageContext";
import { content } from "../../data/content";
import { useProjectStats } from "../../hooks/useProjectStats";

interface ProjectCardConfig {
  icon: ElementType;
  color: string;
  bg: string;
}

interface ProjectCardProps {
  sectionKey: "projects" | "personalProjects";
  index: number;
  config: ProjectCardConfig;
}

export function ProjectCard({ sectionKey, index, config }: ProjectCardProps) {
  const { t, locale } = useLanguage();
  const projectData = content[locale][sectionKey].items[index];
  const stats = useProjectStats(projectData?.liveStats?.pypi, projectData?.liveStats?.github);
  const Icon = config.icon;

  const resolveMetricValue = (metricIndex: number): string => {
    const metric = projectData?.metrics[metricIndex];
    if (!metric) return "—";

    if (metric.live === "pypi_version") {
      if (stats.loading) return "…";
      return stats.pypiVersion ? `v${stats.pypiVersion}` : metric.value;
    }

    if (metric.live === "github_stars") {
      if (stats.loading) return "…";
      return stats.githubStars !== null ? String(stats.githubStars) : metric.value;
    }

    return metric.value;
  };

  return (
    <SpotlightCard className="h-full p-7">
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold">
              {t(`${sectionKey}.items.${index}.title`)}
            </h3>
            <p className="mt-1 text-[13.5px] font-semibold text-accent-primary">
              {t(`${sectionKey}.items.${index}.category`)}
            </p>
          </div>
          <span className="rounded-[10px] bg-accent-soft p-2.5 text-accent-primary">
            <Icon className="h-5 w-5" />
          </span>
        </div>

        <p className="mt-3 text-[15px] leading-7 text-text-secondary">
          {t(`${sectionKey}.items.${index}.description`)}
        </p>

        <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-4">
          {[0, 1, 2].map((metricIndex) => (
            <div key={metricIndex}>
              <div className="text-[15px] font-semibold text-text-primary">
                {resolveMetricValue(metricIndex)}
              </div>
              <div className="mt-0.5 text-xs text-text-muted">
                {t(`${sectionKey}.items.${index}.metrics.${metricIndex}.label`)}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {[0, 1, 2, 3, 4].map((stackIndex) => {
            const tech = t(`${sectionKey}.items.${index}.stack.${stackIndex}`);
            return tech && tech !== `${sectionKey}.items.${index}.stack.${stackIndex}` ? (
              <Badge key={stackIndex}>{tech}</Badge>
            ) : null;
          })}
        </div>
      </div>
    </SpotlightCard>
  );
}
