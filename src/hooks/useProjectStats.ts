import { useEffect, useState } from "react";

interface ProjectStats {
  pypiVersion: string | null;
  githubStars: number | null;
  loading: boolean;
}

export function useProjectStats(
  pypi?: string,
  github?: string,
): ProjectStats {
  const [state, setState] = useState<ProjectStats>({
    pypiVersion: null,
    githubStars: null,
    loading: !!(pypi || github),
  });

  useEffect(() => {
    if (!pypi && !github) return;

    let cancelled = false;

    const result: Pick<ProjectStats, "pypiVersion" | "githubStars"> = {
      pypiVersion: null,
      githubStars: null,
    };

    const fetches: Promise<void>[] = [];

    if (pypi) {
      fetches.push(
        fetch(`https://pypi.org/pypi/${pypi}/json`)
          .then((r) => r.json())
          .then((data: { info?: { version?: string } }) => {
            result.pypiVersion = data.info?.version ?? null;
          })
          .catch(() => {}),
      );
    }

    if (github) {
      fetches.push(
        fetch(`https://api.github.com/repos/${github}`)
          .then((r) => r.json())
          .then((data: { stargazers_count?: number }) => {
            result.githubStars = data.stargazers_count ?? null;
          })
          .catch(() => {}),
      );
    }

    Promise.all(fetches).then(() => {
      if (!cancelled) {
        setState({ ...result, loading: false });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [pypi, github]);

  return state;
}
