import { projectNotes, type Category } from "./content";
export type Repository = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
  archived: boolean;
  topics: string[];
  homepage: string | null;
};
const CACHE_KEY = "tritam-repositories-v1";
const MAX_AGE = 15 * 60 * 1000;
export function readCache(): { repos: Repository[]; fetchedAt: number } | null {
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
    return cache && Array.isArray(cache.repos) && typeof cache.fetchedAt === "number"
      ? cache
      : null;
  } catch {
    return null;
  }
}
export function cacheIsFresh(time: number) {
  return Date.now() - time < MAX_AGE;
}
export function categoryOf(repo: Repository): Category {
  return projectNotes[repo.name]?.category ?? "Other";
}
export function visibleRepositories(repos: Repository[]) {
  return repos.filter(
    (r) =>
      !r.fork &&
      !r.archived &&
      !r.name.toLowerCase().includes("github.io") &&
      !r.name.toLowerCase().includes("portfolio") &&
      !["tritammohanty", "Tritam1801"].includes(r.name),
  );
}
export async function fetchRepositories(signal: AbortSignal): Promise<Repository[]> {
  const repos: Repository[] = [];
  for (let page = 1; page <= 20; page++) {
    const response = await fetch(
      `https://api.github.com/users/tritammohanty/repos?per_page=100&sort=updated&page=${page}`,
      { signal, headers: { Accept: "application/vnd.github+json" } },
    );
    if (!response.ok) {
      throw new Error(
        response.status === 403 || response.status === 429
          ? "GitHub's public API is temporarily rate limited. You can still explore the repositories on GitHub."
          : "GitHub could not be reached. Please retry or open the repositories on GitHub.",
      );
    }
    const data: unknown = await response.json();
    if (
      !Array.isArray(data) ||
      data.some(
        (r) =>
          typeof r?.name !== "string" ||
          typeof r?.id !== "number" ||
          typeof r?.html_url !== "string",
      )
    )
      throw new Error("GitHub returned an unexpected response. Please retry.");
    repos.push(...(data as Repository[]));
    if (data.length < 100) break;
  }
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ repos, fetchedAt: Date.now() }));
  } catch {
    /* Caching is optional in private browsing. */
  }
  return repos;
}
