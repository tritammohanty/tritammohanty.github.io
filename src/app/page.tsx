import Image from "next/image";
import {
  ArrowDownRight,
  ArrowUpRight,
  BrainCircuit,
  Workflow,
  ChartNoAxesCombined,
} from "lucide-react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { InterestStrip } from "@/components/interest-strip";
import { Projects } from "@/components/projects";
import { Contact } from "@/components/contact";
import { WritingSection } from "@/components/writing";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { biography, education, experience, profile } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Header trackSections />
      <main id="main-content">
        <section id="hero" className="container hero">
          <div className="hero-heading">
            <p className="eyebrow mb-5">{biography.role}</p>
            <h1 className="hero-name">
              Tritam
              <br /> Mohanty<span className="text-primary">.</span>
            </h1>
          </div>
          <Reveal className="hero-introduction" delay={0.08}>
            <h2 className="hero-statement">
              Curious by nature.
              <br />
              Building with AI.
            </h2>
            <p className="hero-description">{biography.introduction}</p>
            <Button asChild size="lg">
              <a href="#projects">
                Explore my work <ArrowDownRight />
              </a>
            </Button>
          </Reveal>
          <Reveal className="hero-portrait" delay={0.15}>
            <figure className="portrait-composition">
              <div className="portrait-frame">
                <Image
                  src={profile.portrait.src}
                  alt={profile.portrait.alt}
                  width={profile.portrait.width}
                  height={profile.portrait.height}
                  sizes="(max-width: 767px) 220px, (max-width: 1023px) 280px, 340px"
                  priority
                  className="portrait"
                  style={{ objectPosition: profile.portrait.position }}
                />
              </div>
              <figcaption className="portrait-caption">
                <p className="text-sm font-medium">A builder with a data foundation.</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {biography.portraitCaption}
                </p>
                <a href="#about" className="text-link mt-2">
                  A little more about me <ArrowUpRight size={16} />
                </a>
              </figcaption>
            </figure>
          </Reveal>
        </section>
        <InterestStrip />
        <section id="projects" className="container section">
          <Reveal>
            <h2 className="section-title">
              Ideas, put into practice<span className="text-primary">.</span>
            </h2>
            <p className="section-description">
              Conversational AI, model experiments, and connected tools. Public repositories refresh
              from GitHub, with context for the work alongside them.
            </p>
          </Reveal>
          <Projects />
        </section>
        <section id="experience" className="container section">
          <div className="experience-grid">
            <Reveal>
              <h2 className="section-title">
                Built on
                <br />
                real experience.
              </h2>
              <p className="section-description">
                AI work grounded in data, business processes, and the constraints of enterprise
                systems.
              </p>
              <div className="outcome">
                <ChartNoAxesCombined className="text-primary" size={25} />
                <h3 className="mt-5 text-2xl font-medium tracking-tight leading-snug">
                  Connecting data, journeys, and decisions.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  I write SQL, examine customer journeys, and turn findings into reporting that
                  helps the team refine targeting and channel strategy.
                </p>
              </div>
            </Reveal>
            <div className="timeline">
              {experience.map((item, index) => (
                <Reveal key={item.role} delay={index * 0.03} className="experience-item">
                  <p className="font-mono text-xs text-muted-foreground">{item.period}</p>
                  <h3 className="mt-3 text-xl font-medium tracking-tight">{item.role}</h3>
                  <p className="mt-1 text-sm text-primary">{item.company}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
        <section id="about" className="container section">
          <div className="about-grid">
            <Reveal>
              <h2 className="section-title">
                The question
                <br />
                comes first.
              </h2>
              <p className="mt-7 text-lg leading-relaxed">{biography.aboutLead}</p>
              {biography.about.map((paragraph) => (
                <p key={paragraph} className="mt-5 text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-link mt-6"
              >
                Find me on LinkedIn <ArrowUpRight size={16} />
              </a>
            </Reveal>
            <Reveal className="focus-panel">
              <h3 className="text-xl font-medium mb-5">What I bring to a problem</h3>
              <div className="mb-5 flex flex-wrap gap-2" aria-label="Highlighted skills">
                {biography.highlightedSkills.map((skill) => (
                  <Badge variant="outline" key={skill}>
                    {skill}
                  </Badge>
                ))}
              </div>
              <Accordion type="single" collapsible defaultValue="ai">
                <AccordionItem value="ai">
                  <AccordionTrigger>
                    <span className="flex items-center gap-3">
                      <BrainCircuit size={20} />
                      Applied AI & machine learning
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>{biography.capabilities.ai}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="systems">
                  <AccordionTrigger>
                    <span className="flex items-center gap-3">
                      <Workflow size={20} />
                      Agents & connected systems
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>{biography.capabilities.systems}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="analytics">
                  <AccordionTrigger>
                    <span className="flex items-center gap-3">
                      <ChartNoAxesCombined size={20} />
                      Analytics & business context
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>{biography.capabilities.analytics}</AccordionContent>
                </AccordionItem>
              </Accordion>
              <h3 className="mt-9 mb-5 text-sm font-medium">Education</h3>
              <div className="space-y-5">
                {education.map((item) => (
                  <div key={item.school}>
                    <p className="text-sm font-medium">{item.school}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                      {item.programme}
                    </p>
                    <p className="mt-2 font-mono text-xs text-muted-foreground">{item.period}</p>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {item.recognition}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
        <WritingSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
