"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WritingEntryView } from "@/components/writing-entry";
import type { WritingEntry } from "@/lib/writing";

const channels = ["All", "Blog", "LinkedIn"] as const;

export function WritingFeed({ entries }: { entries: WritingEntry[] }) {
  return (
    <Tabs defaultValue="All" className="mt-10">
      <TabsList className="category-tabs" aria-label="Writing format">
        {channels.map((channel) => (
          <TabsTrigger key={channel} value={channel}>
            {channel === "Blog"
              ? "Blog articles"
              : channel === "LinkedIn"
                ? "LinkedIn posts"
                : "All writing"}
          </TabsTrigger>
        ))}
      </TabsList>
      {channels.map((channel) => {
        const filtered = entries.filter((entry) => channel === "All" || entry.kind === channel);
        return (
          <TabsContent key={channel} value={channel} className="mt-6">
            <p className="font-mono text-xs text-muted-foreground" role="status">
              {filtered.length} published {filtered.length === 1 ? "piece" : "pieces"}
            </p>
            {filtered.length ? (
              <div className="mt-5 border-t border-border divide-y divide-border">
                {filtered.map((entry) => (
                  <WritingEntryView key={entry.id} entry={entry} fullArticle />
                ))}
              </div>
            ) : (
              <div className="py-12">
                <h2 className="text-xl font-medium">
                  {channel === "Blog" ? "Longer stories are on the way." : "No posts here yet."}
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {channel === "Blog"
                    ? "Project walkthroughs, tutorials, and AI news will appear here as I publish them. For now, explore my LinkedIn posts."
                    : "Check back for new writing."}
                </p>
              </div>
            )}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
