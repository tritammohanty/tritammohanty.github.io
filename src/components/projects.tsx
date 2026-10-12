"use client";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  GitFork,
  CodeXml,
  Search,
  Star,
  RefreshCw,
  MessageSquare,
  Layers,
  FileText,
  ExternalLink,
} from "lucide-react";
import { m, useReducedMotion } from "motion/react";
import { profile, projectNotes } from "@/lib/content";
import {
  cacheIsFresh,
  categoryOf,
  fetchRepositories,
  readCache,
  visibleRepositories,
  type Repository,
} from "@/lib/github";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Reveal } from "./reveal";
import { ConnectedProjects } from "./connected-projects";
import repositorySnapshot from "@/lib/repository-snapshot.json";

const categories = ["All", "Applied AI", "Machine learning", "Computer vision", "Other"];
function safeUrl(value: string | null) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}
function RepositoryActions({ repo }: { repo: Repository }) {
  const homepage = safeUrl(repo.homepage);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button asChild variant="outline">
        <a href={repo.html_url} target="_blank" rel="noreferrer">
          <CodeXml />
          View repository
          <ArrowUpRight />
        </a>
      </Button>
      {homepage && (
        <Button asChild variant="ghost">
          <a href={homepage} target="_blank" rel="noreferrer">
            Visit project <ExternalLink />
          </a>
        </Button>
      )}
    </div>
  );
}
function ProjectDetails({ repo, prominent = false }: { repo: Repository; prominent?: boolean }) {
  const note = projectNotes[repo.name];
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={prominent ? "default" : "ghost"} className={prominent ? "" : "px-0"}>
          See how it works <ArrowUpRight />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100vw_-_2rem)] max-h-[calc(100dvh_-_2rem)] overflow-y-auto sm:max-w-xl">
        <DialogHeader className="pr-6 text-left">
          <DialogTitle className="text-2xl">{note?.title ?? repo.name}</DialogTitle>
          <DialogDescription>
            {note?.category ?? repo.language ?? "Public repository"}
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {note?.detail ??
            repo.description ??
            "Explore the code and documentation in the repository for implementation details."}
        </p>
        <div className="flex flex-wrap gap-2">
          {(note?.tags ?? repo.topics ?? []).map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <RepositoryActions repo={repo} />
      </DialogContent>
    </Dialog>
  );
}
function FeaturedProject({ repo, primary = false }: { repo: Repository; primary?: boolean }) {
  const note = projectNotes[repo.name];
  const Icon =
    repo.name === "CompanionAI" ? MessageSquare : repo.name === "neetcode-gpt" ? Layers : FileText;
  return (
    <Card
      className={
        primary
          ? "featured-project bg-accent border-transparent shadow-none"
          : "supporting-project shadow-none"
      }
    >
      <CardContent className="project-content">
        <div className="flex items-center justify-between">
          <p className="font-mono text-xs text-muted-foreground">
            {note?.category ?? "Public repository"}
          </p>
          <Icon size={23} strokeWidth={1.5} className="text-primary" />
        </div>
        <h3 className={primary ? "featured-title" : "supporting-title"}>
          {note?.title ?? repo.name}
        </h3>
        <p className="project-description">{note?.description ?? repo.description}</p>
        {primary && (
          <div
            className="pipeline"
            aria-label="CompanionAI architecture: fine-tuned Mistral model, conversational memory, response filtering"
          >
            <span>
              Mistral-7B<small>QLoRA fine-tuning</small>
            </span>
            <ArrowRight size={20} />
            <span>
              Context<small>Memory & emotion</small>
            </span>
            <ArrowRight size={20} />
            <span>
              Response<small>Filtering</small>
            </span>
          </div>
        )}
        <div className="mt-auto pt-6">
          <div className="mb-5 flex flex-wrap gap-2">
            {(note?.tags ?? []).map((tag) => (
              <Badge variant="secondary" key={tag}>
                {tag}
              </Badge>
            ))}
          </div>
          <ProjectDetails repo={repo} prominent={primary} />
        </div>
      </CardContent>
    </Card>
  );
}
export function Projects({ archiveOnly = false }: { archiveOnly?: boolean }) {
  const [repos, setRepos] = useState<Repository[]>(repositorySnapshot as Repository[]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fromCache, setFromCache] = useState(true);
  const [reload, setReload] = useState(0);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("updated");
  const [limit, setLimit] = useState(archiveOnly ? 12 : 6);
  const reduced = useReducedMotion();
  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    async function load() {
      const cache = readCache();
      if (cache) {
        setRepos(cache.repos);
        setFromCache(true);
      }
      setError(null);
      setLoading(!cache && repositorySnapshot.length === 0);
      if (cache && cacheIsFresh(cache.fetchedAt) && reload === 0) {
        setLoading(false);
        return;
      }
      const timer = setTimeout(() => controller.abort(), 12000);
      try {
        const data = await fetchRepositories(controller.signal);
        if (mounted) {
          setRepos(data);
          setFromCache(false);
        }
      } catch (cause) {
        if (mounted)
          setError(
            cause instanceof Error && cause.name !== "AbortError"
              ? cause.message
              : "GitHub took too long to respond. Please retry or browse on GitHub.",
          );
      } finally {
        clearTimeout(timer);
        if (mounted) setLoading(false);
      }
    }
    void load();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, [reload]);
  const visible = useMemo(() => visibleRepositories(repos), [repos]);
  const featured = ["CompanionAI", "neetcode-gpt", "AutomaticTicketClassification"]
    .map((name) => visible.find((repo) => repo.name === name))
    .filter((repo): repo is Repository => Boolean(repo));
  const filtered = useMemo(
    () =>
      visible
        .filter(
          (repo) =>
            (category === "All" || categoryOf(repo) === category) &&
            `${projectNotes[repo.name]?.title ?? ""} ${repo.name} ${repo.description ?? ""} ${repo.language ?? ""} ${(repo.topics ?? []).join(" ")}`
              .toLowerCase()
              .includes(query.toLowerCase().trim()),
        )
        .sort((a, b) =>
          sort === "stars"
            ? b.stargazers_count - a.stargazers_count
            : sort === "name"
              ? (projectNotes[a.name]?.title ?? a.name).localeCompare(
                  projectNotes[b.name]?.title ?? b.name,
                )
              : Date.parse(b.updated_at) - Date.parse(a.updated_at),
        ),
    [visible, category, query, sort],
  );
  return (
    <div className="mt-10">
      {error && (
        <Alert className="mb-6" role="status">
          <CodeXml />
          <AlertTitle>
            {fromCache
              ? "Showing your last saved GitHub results"
              : "The GitHub feed is unavailable"}
          </AlertTitle>
          <AlertDescription>
            {error}
            <div className="mt-3 flex flex-wrap gap-3">
              <Button variant="outline" onClick={() => setReload((value) => value + 1)}>
                <RefreshCw />
                Retry GitHub
              </Button>
              <a
                className="text-link"
                href={profile.github + "?tab=repositories"}
                target="_blank"
                rel="noreferrer"
              >
                Browse on GitHub
                <ArrowUpRight size={16} />
              </a>
            </div>
          </AlertDescription>
        </Alert>
      )}
      {loading ? (
        <div aria-label="Loading GitHub projects" aria-busy="true" className="featured-grid">
          <Skeleton className="min-h-80" />
          <div className="space-y-5">
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
          </div>
          <span className="sr-only" role="status">
            Loading projects from GitHub
          </span>
        </div>
      ) : (
        <>
          {!archiveOnly && featured.length > 0 && (
            <Reveal className="featured-grid">
              {featured.map((repo, index) => (
                <FeaturedProject repo={repo} primary={index === 0} key={repo.id} />
              ))}
            </Reveal>
          )}
          {!archiveOnly && <ConnectedProjects />}
          {(visible.length > 0 || !error) && (
            <div className={archiveOnly ? "" : "mt-14"}>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-xl font-medium tracking-tight">
                  {archiveOnly ? "Public repositories" : "More from GitHub"}
                </h3>
                <a
                  href={profile.github + "?tab=repositories"}
                  target="_blank"
                  rel="noreferrer"
                  className="text-link"
                >
                  View on GitHub <ArrowUpRight size={16} />
                </a>
              </div>
              <Tabs
                value={category}
                onValueChange={(value) => {
                  setCategory(value);
                  setLimit(archiveOnly ? 12 : 6);
                }}
              >
                <div className="project-controls">
                  <TabsList className="category-tabs" aria-label="Project category">
                    {categories.map((item) => (
                      <TabsTrigger value={item} key={item}>
                        {item}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <div className="flex min-w-0 gap-2">
                    <div className="relative min-w-0 flex-1">
                      <Search size={16} className="absolute left-3 top-3.5 text-muted-foreground" />
                      <Input
                        value={query}
                        onChange={(event) => {
                          setQuery(event.target.value);
                          setLimit(archiveOnly ? 12 : 6);
                        }}
                        placeholder="Search projects..."
                        aria-label="Search projects"
                        className="pl-9"
                      />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">Sort</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                          <DropdownMenuRadioItem value="updated">
                            Recently updated
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="stars">Most stars</DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="name">Name A-Z</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                {categories.map((item) => (
                  <TabsContent value={item} key={item}>
                    <p role="status" className="my-5 font-mono text-xs text-muted-foreground">
                      {filtered.length} {filtered.length === 1 ? "repository" : "repositories"}
                      {fromCache ? " from saved GitHub results" : " from GitHub"}
                    </p>
                    <div className="repository-grid">
                      {filtered.slice(0, limit).map((repo) => (
                        <m.article
                          key={repo.id}
                          className="repository-item"
                          whileHover={reduced ? undefined : { y: -2 }}
                          initial={false}
                          animate={reduced ? undefined : { opacity: 1 }}
                          transition={{ duration: 0.18 }}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <h4 className="min-w-0 font-medium tracking-tight break-words">
                              <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noreferrer"
                                className="repo-title"
                              >
                                {projectNotes[repo.name]?.title ?? repo.name}
                                <ArrowUpRight size={16} />
                              </a>
                            </h4>
                            <CodeXml size={18} className="shrink-0 text-muted-foreground" />
                          </div>
                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                            {projectNotes[repo.name]?.description ??
                              repo.description ??
                              "Code and experiments. Explore the repository for details."}
                          </p>
                          <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5 font-mono text-xs text-muted-foreground">
                            {repo.language && <span>{repo.language}</span>}
                            <span className="flex items-center gap-1">
                              <Star size={13} />
                              {repo.stargazers_count}
                              <span className="sr-only">stars</span>
                            </span>
                            <span className="flex items-center gap-1">
                              <GitFork size={13} />
                              {repo.forks_count}
                              <span className="sr-only">forks</span>
                            </span>
                            <span>
                              {new Date(repo.updated_at).toLocaleDateString("en-GB", {
                                month: "short",
                                year: "numeric",
                                timeZone: "UTC",
                              })}
                            </span>
                            {safeUrl(repo.homepage) && (
                              <a
                                href={safeUrl(repo.homepage)!}
                                target="_blank"
                                rel="noreferrer"
                                className="text-link"
                              >
                                Visit project
                                <ExternalLink size={13} />
                              </a>
                            )}
                          </div>
                        </m.article>
                      ))}
                    </div>
                    {filtered.length === 0 && (
                      <div className="empty-state">
                        <Search size={24} />
                        <h4 className="mt-4 font-medium">
                          {visible.length ? "No matching projects" : "No public projects found"}
                        </h4>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {visible.length
                            ? "Try a different search or category."
                            : "Check the public repositories on GitHub."}
                        </p>
                        {visible.length > 0 && (
                          <Button
                            className="mt-5"
                            variant="outline"
                            onClick={() => {
                              setQuery("");
                              setCategory("All");
                            }}
                          >
                            Clear filters
                          </Button>
                        )}
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
              {filtered.length > limit && (
                <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
                  <Button variant="outline" onClick={() => setLimit((value) => value + 6)}>
                    Show more projects <ArrowRight />
                  </Button>
                  {!archiveOnly && (
                    <a href="/projects/" className="text-link">
                      Full archive
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
