import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WritingFeed } from "@/components/writing-feed";
import { publishedWriting } from "@/lib/writing";

export const metadata = {
  title: "Blog & Posts | Tritam Mohanty",
  description: "Project stories, practical tutorials, and thoughts on AI from Tritam Mohanty.",
  alternates: { canonical: "/writing/" },
};
export default function WritingPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="container section">
        <h1 className="section-title">Blog & posts.</h1>
        <p className="section-description">
          Project stories, practical tutorials, and thoughts on what&apos;s changing in AI.
        </p>
        <WritingFeed entries={publishedWriting()} />
      </main>
      <Footer />
    </>
  );
}
