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
  const stats = useProjectStats(
    projectData?.liveStats?.pypi,
    projectData?.liveStats?.github,
  );
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
      return stats.githubStars !== null
        ? String(stats.githubStars)
        : metric.value;
    }

    return metric.value;
  };

  return (
    <SpotlightCard className="flex flex-col h-full p-0 overflow-hidden">
      <div
        className={`h-32 flex items-center justify-center relative overflow-hidden group`}
        style={{ background: `linear-gradient(135deg, transparent 0%, transparent 50%, rgba(0,0,0,0.03) 100%)` }}
      >
        <div className={`absolute inset-0 ${config.bg}`} />
        <Icon
          className={`w-10 h-10 ${config.color} transition-transform duration-700 group-hover:scale-110 relative z-10`}
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <span
          className={`text-[10px] font-bold tracking-widest uppercase ${config.color} mb-1.5`}
        >
          {t(`${sectionKey}.items.${index}.category`)}
        </span>
        <h3 className="text-lg font-bold mb-2 tracking-tight text-zinc-900 dark:text-white">
          {t(`${sectionKey}.items.${index}.title`)}
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-5 flex-grow leading-relaxed">
          {t(`${sectionKey}.items.${index}.description`)}
        </p>

        <div className="grid grid-cols-3 gap-3 mb-5 py-4 border-y border-zinc-100 dark:border-zinc-800">
          {[0, 1, 2].map((metricIndex) => (
            <div key={metricIndex} className="text-center">
              <div className="text-sm font-bold tracking-tight text-zinc-900 dark:text-white">
                {resolveMetricValue(metricIndex)}
              </div>
              <div className="text-[9px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                {t(`${sectionKey}.items.${index}.metrics.${metricIndex}.label`)}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {[0, 1, 2, 3, 4].map((stackIndex) => {
            const tech = t(`${sectionKey}.items.${index}.stack.${stackIndex}`);
            return tech &&
              tech !== `${sectionKey}.items.${index}.stack.${stackIndex}` ? (
              <Badge key={stackIndex}>{tech}</Badge>
            ) : null;
          })}
        </div>
      </div>
    </SpotlightCard>
  );
}
