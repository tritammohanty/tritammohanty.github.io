"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight, CalendarDays, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { profile } from "@/lib/content";
import { Reveal } from "./reveal";
const ContactDraftForm = dynamic(() => import("./contact-draft-form"), {
  ssr: false,
  loading: () => (
    <div role="status" aria-label="Loading contact form">
      <Skeleton className="h-72" />
      <span className="sr-only">Loading contact form</span>
    </div>
  ),
});
export function Contact() {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  }
  return (
    <section id="contact" className="container section contact-section">
      <Reveal className="contact-layout">
        <div>
          <p className="eyebrow mb-5">A problem worth figuring out?</p>
          <h2 className="contact-title">
            Let&apos;s make
            <br />
            something useful<span className="text-primary">.</span>
          </h2>
        </div>
        <div className="contact-actions">
          <p className="mb-6 max-w-sm text-muted-foreground leading-relaxed">
            I&apos;m happy to talk about AI, data, opportunities, or an idea you can&apos;t stop
            thinking about.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg">
                  Start a conversation <ArrowUpRight />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg max-h-[90dvh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">What are you thinking about?</DialogTitle>
                  <DialogDescription>
                    Write a note, then open it in your email app. Nothing is sent or stored by this
                    website.
                  </DialogDescription>
                </DialogHeader>
                <ContactDraftForm />
              </DialogContent>
            </Dialog>
            <Button asChild size="lg" variant="outline">
              <a href={profile.booking.url} target="_blank" rel="noreferrer">
                <CalendarDays /> Book a 1-on-1 <ArrowUpRight />
                <span className="sr-only">, opens Cal.com in a new tab</span>
              </a>
            </Button>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {profile.booking.durationMinutes} minutes · Video call · Choose a time on Cal.com.
          </p>
          <div className="mt-6 flex items-center gap-1">
            <a href={`mailto:${profile.email}`} className="email-link">
              {profile.email}
            </a>
            <Button variant="ghost" size="icon" aria-label="Copy email address" onClick={copyEmail}>
              {copied ? <Check /> : <Copy />}
            </Button>
          </div>
          <p className="mt-1 text-xs text-muted-foreground" role="status">
            {copyError
              ? "Copy unavailable. Select the address above to copy it."
              : copied
                ? "Email address copied."
                : ""}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
