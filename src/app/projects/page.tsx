import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Projects } from "@/components/projects";
export const metadata = {
  title: "Projects | Tritam Mohanty",
  alternates: { canonical: "/projects/" },
};
export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="container section">
        <h1 className="section-title">
          The project archive<span className="text-primary">.</span>
        </h1>
        <p className="section-description">
          Live public repositories, with context for the work. Search by project, language, or
          topic.
        </p>
        <Projects archiveOnly />
      </main>
      <Footer />
    </>
  );
}
