import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { WritingEntry } from "@/lib/writing";

export function WritingEntryView({
  entry,
  fullArticle = false,
}: {
  entry: WritingEntry;
  fullArticle?: boolean;
}) {
  const Heading = fullArticle ? "h2" : "h4";
  const date = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(entry.date));
  return (
    <article id={fullArticle ? entry.id : undefined} className="py-7 scroll-mt-36">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Badge variant="outline">{entry.kind === "Blog" ? "Blog article" : "LinkedIn post"}</Badge>
        <span className="text-xs text-muted-foreground">{entry.topic}</span>
        <time dateTime={entry.date} className="font-mono text-xs text-muted-foreground">
          {date}
        </time>
      </div>
      <Heading className="text-xl sm:text-2xl font-medium tracking-tight leading-snug">
        {entry.kind === "LinkedIn" ? (
          <a
            href={entry.url}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-start gap-3"
          >
            {entry.title}
            <ArrowUpRight
              size={20}
              className="mt-1 shrink-0 text-muted-foreground group-hover:text-foreground"
              aria-hidden="true"
            />
            <span className="sr-only">, opens on LinkedIn in a new tab</span>
          </a>
        ) : fullArticle ? (
          entry.title
        ) : (
          <Link href={`/writing/#${entry.id}`}>{entry.title}</Link>
        )}
      </Heading>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        {entry.summary}
      </p>
      {entry.kind === "Blog" && fullArticle && (
        <div className="mt-7 max-w-[65ch] space-y-7">
          {entry.sections.map((section, index) => (
            <div key={index}>
              {section.heading && <h3 className="mb-3 text-lg font-medium">{section.heading}</h3>}
              <div className="space-y-4">
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
          {entry.sources && entry.sources.length > 0 && (
            <div>
              <h3 className="font-medium mb-3">Sources</h3>
              <ul className="space-y-2">
                {entry.sources.map((source) => (
                  <li key={source.url}>
                    <a className="text-link" href={source.url} target="_blank" rel="noreferrer">
                      {source.title}
                      <ArrowUpRight size={16} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </article>
  );
}
