import { ArrowUpRight } from "lucide-react";
import { connectedProjects, profile } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/reveal";

export function ConnectedProjects() {
  return (
    <Reveal className="mt-14">
      <h3 className="text-xl font-medium tracking-tight">Connected systems, in practice</h3>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Agent workflows, tool integrations, and a team-built sensor project. A few more ways I
        connect data and tools to a useful application.
      </p>
      <Accordion type="single" collapsible className="mt-5">
        {connectedProjects.map((project) => (
          <AccordionItem key={project.id} value={project.id}>
            <AccordionTrigger className="text-left py-5">
              <span className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:gap-8 w-full">
                <span>
                  <span className="block text-base font-medium">{project.title}</span>
                  <span className="mt-1 block text-xs font-normal text-muted-foreground">
                    {project.subtitle}
                  </span>
                </span>
                <span className="text-sm font-normal leading-relaxed text-muted-foreground">
                  {project.summary}
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <p className="max-w-3xl leading-relaxed text-muted-foreground">{project.detail}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-link mt-5">
        Project background on LinkedIn <ArrowUpRight size={16} />
      </a>
    </Reveal>
  );
}
