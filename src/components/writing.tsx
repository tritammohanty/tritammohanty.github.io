import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { publishedWriting } from "@/lib/writing";
import { Reveal } from "@/components/reveal";
import { WritingEntryView } from "@/components/writing-entry";

export function WritingSection() {
  const entries = publishedWriting();
  const blog = entries.find((entry) => entry.kind === "Blog");
  const post = entries.find((entry) => entry.kind === "LinkedIn");
  return (
    <section id="writing" className="container section">
      <Reveal>
        <h2 className="section-title">Blog & posts.</h2>
        <p className="section-description">
          Project stories, practical tutorials, and thoughts on what&apos;s changing in AI.
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-[.85fr_1.15fr] md:gap-16">
          <div className="border-t border-border pt-5">
            <h3 className="text-sm font-medium">On the blog</h3>
            {blog ? (
              <WritingEntryView entry={blog} />
            ) : (
              <p className="py-7 max-w-md text-sm leading-relaxed text-muted-foreground">
                Longer project walkthroughs and tutorials are on the way. No articles published yet.
              </p>
            )}
          </div>
          <div className="border-t border-border pt-5">
            <h3 className="text-sm font-medium">On LinkedIn</h3>
            {post ? (
              <WritingEntryView entry={post} />
            ) : (
              <p className="py-7 text-sm text-muted-foreground">No posts added yet.</p>
            )}
          </div>
        </div>
        <Link href="/writing/" className="text-link mt-5">
          Explore writing <ArrowRight size={16} />
        </Link>
      </Reveal>
    </section>
  );
}
