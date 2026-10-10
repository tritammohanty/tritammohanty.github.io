"use client";

import { ArrowUpRight, CodeXml } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { profile } from "@/lib/content";

export function BuildNotes() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="build-credit"
          aria-label="Vibe coded with Codex. Read the build notes"
        >
          <CodeXml size={16} aria-hidden="true" />
          Vibe coded with Codex
          <ArrowUpRight size={14} aria-hidden="true" />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[calc(100vw_-_2rem)] max-h-[calc(100dvh_-_2rem)] overflow-y-auto sm:max-w-xl">
        <DialogHeader className="pr-6 text-left">
          <DialogTitle className="text-2xl">This website is a project, too.</DialogTitle>
          <DialogDescription>
            Vibe coded with Codex. Shaped through conversation and iteration.
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm leading-relaxed">
          I used AI-assisted development to build this portfolio, guiding its design, content, and
          interactions. Codex helped with implementation and checks as I reviewed and refined the
          result.
        </p>
        <dl className="build-decisions">
          <div>
            <dt>The foundation</dt>
            <dd>
              Next.js, TypeScript, Tailwind, and shadcn/ui. tweakcn Default colors, with subtle
              Motion interactions.
            </dd>
          </div>
          <div>
            <dt>A portfolio that stays current</dt>
            <dd>
              Projects refresh directly from public GitHub data, with saved results available when a
              refresh fails.
            </dd>
          </div>
          <div>
            <dt>The details matter</dt>
            <dd>
              Responsive layouts, visible keyboard focus, reduced-motion alternatives, and clear
              credit for my contribution.
            </dd>
          </div>
        </dl>
        <Button asChild variant="outline" className="justify-self-start">
          <a href={profile.portfolioSource} target="_blank" rel="noreferrer">
            Explore the source <ArrowUpRight aria-hidden="true" />
          </a>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
