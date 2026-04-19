import { type ElementType } from "react";
import { ArrowUpRight } from "lucide-react";
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
  const isFeatured = sectionKey === "projects" && index === 0;

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
    <SpotlightCard
      className={`h-full overflow-hidden p-0 ${isFeatured ? "lg:min-h-[30rem]" : ""}`}
      spotlightColor={
        config.color.includes("emerald")
          ? "rgba(16, 185, 129, 0.16)"
          : config.color.includes("blue") || config.color.includes("cyan")
            ? "rgba(34, 211, 238, 0.14)"
            : config.color.includes("amber")
              ? "rgba(245, 158, 11, 0.16)"
              : "rgba(16, 185, 129, 0.16)"
      }
    >
      <div className="flex h-full flex-col">
        <div className="relative overflow-hidden border-b border-zinc-200/70 px-6 py-6 dark:border-zinc-800/70">
          <div className={`absolute inset-0 ${config.bg}`} />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.38),transparent_45%,rgba(24,24,27,0.04))] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_48%,rgba(16,185,129,0.06))]" />
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div>
              <p className={`text-[11px] font-semibold uppercase tracking-[0.26em] ${config.color}`}>
                {t(`${sectionKey}.items.${index}.category`)}
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-white">
                {t(`${sectionKey}.items.${index}.title`)}
              </h3>
            </div>
            <div className={`rounded-2xl border border-white/40 p-3 ${config.bg} ${config.color}`}>
              <Icon className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col px-6 py-6">
          <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-300">
            {t(`${sectionKey}.items.${index}.description`)}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3 rounded-[1.5rem] border border-zinc-200/70 bg-zinc-50/75 p-3 dark:border-zinc-800 dark:bg-zinc-900/80">
            {[0, 1, 2].map((metricIndex) => (
              <div key={metricIndex} className="rounded-2xl bg-white/80 px-3 py-3 text-center dark:bg-zinc-950/70">
                <div className="text-base font-semibold tracking-tight text-zinc-950 dark:text-white">
                  {resolveMetricValue(metricIndex)}
                </div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                  {t(`${sectionKey}.items.${index}.metrics.${metricIndex}.label`)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {[0, 1, 2, 3, 4].map((stackIndex) => {
              const tech = t(`${sectionKey}.items.${index}.stack.${stackIndex}`);
              return tech && tech !== `${sectionKey}.items.${index}.stack.${stackIndex}` ? (
                <Badge key={stackIndex}>{tech}</Badge>
              ) : null;
            })}
          </div>

          <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500 dark:text-zinc-400">
            <span>{sectionKey === "projects" ? "Production delivery" : "Open source signal"}</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}
