import { ArrowUpRight, CodeXml, ContactRound } from "lucide-react";
import Link from "next/link";
import { profile } from "@/lib/content";
export function Footer() {
  return (
    <footer className="container footer">
      <Link href="/#hero" className="wordmark">
        tritam<span className="text-primary">.</span>
      </Link>
      <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Tritam Mohanty</p>
      <div className="flex items-center gap-5">
        <a href={profile.github} className="footer-link" target="_blank" rel="noreferrer">
          <CodeXml size={17} />
          GitHub
          <ArrowUpRight size={14} />
        </a>
        <a href={profile.linkedin} className="footer-link" target="_blank" rel="noreferrer">
          <ContactRound size={17} />
          LinkedIn
          <ArrowUpRight size={14} />
        </a>
      </div>
    </footer>
  );
}
