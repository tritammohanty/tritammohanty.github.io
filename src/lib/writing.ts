import { z } from "zod";
import writingData from "@/content/writing.json";

const publication = {
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().trim().min(1),
  summary: z.string().trim().min(1),
  date: z.iso.date(),
  topic: z.enum(["Project story", "Tutorial", "AI news"]),
  status: z.enum(["draft", "published"]),
};
const source = z.object({
  title: z.string().trim().min(1),
  url: z.url().refine((url) => url.startsWith("https://")),
});
const entrySchema = z
  .discriminatedUnion("kind", [
    z.object({
      ...publication,
      kind: z.literal("Blog"),
      sections: z.array(
        z.object({
          heading: z.string().optional(),
          paragraphs: z.array(z.string().trim().min(1)).min(1),
        }),
      ),
      sources: z.array(source).optional(),
    }),
    z.object({
      ...publication,
      kind: z.literal("LinkedIn"),
      url: z.url().refine((value) => {
        const url = new URL(value);
        return (
          url.protocol === "https:" && ["linkedin.com", "www.linkedin.com"].includes(url.hostname)
        );
      }, "Post links must point to LinkedIn over HTTPS."),
    }),
  ])
  .superRefine((entry, ctx) => {
    if (entry.kind === "Blog" && entry.status === "published" && entry.sections.length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "A published blog needs article content.",
        path: ["sections"],
      });
    }
  });

export type WritingEntry = z.infer<typeof entrySchema>;
const schema = z.object({ entries: z.array(entrySchema) }).superRefine(({ entries }, ctx) => {
  const ids = new Set<string>();
  entries.forEach((entry, index) => {
    if (ids.has(entry.id))
      ctx.addIssue({
        code: "custom",
        message: "Writing IDs must be unique.",
        path: ["entries", index, "id"],
      });
    ids.add(entry.id);
  });
});

// Called by server components: unpublished entries are never passed into the client feed.
export function publishedWriting(now = new Date()): WritingEntry[] {
  return schema
    .parse(writingData)
    .entries.filter(
      (entry) => entry.status === "published" && Date.parse(entry.date) <= now.getTime(),
    )
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}
