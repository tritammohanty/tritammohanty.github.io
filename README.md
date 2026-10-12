# Tritam Mohanty | Portfolio

Next.js App Router, React, TypeScript, Tailwind CSS v4, official local shadcn/ui components with Radix, Lucide, Motion, React Hook Form, and Zod. Fully static: no server, database, authentication, Supabase, or Vercel services.

## Run

Requires Node.js 22.13+ and pnpm 11.25 (pinned in `package.json`).

```sh
pnpm install --frozen-lockfile
pnpm dev
```

```sh
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm check:export
pnpm preview
```

The production export is `out/`. Preview runs at http://127.0.0.1:3000 and serves the actual export with compressed assets.

## Content and theme

- `src/lib/content.ts`: publishable biography, highlighted skills, project explanations, connected-tool projects, experience, education, contact links, public source link, and portrait configuration. When replacing the illustration with a photo in `public/`, update `profile.portrait.src`, its alt description, actual dimensions, and focal `position`. The presentation uses a 4:5 crop, so prefer a waist-up image with some room around the subject.
- `CONTENT.md`: content maintenance, source provenance, and LinkedIn synchronization options.
- `src/content/writing.json`: shared public content for the Blog and LinkedIn Post sections. A separate content project can add reviewed blog articles or real post links to this file. `src/lib/writing.ts` validates the data with Zod and renders only published entries dated on or before the build. Blog bodies render directly in `/writing/`; post entries link to LinkedIn. No publishing service is required.
- `src/app/globals.css`: tweakcn Default light/dark color tokens, shadcn radius scale, typography, and layout. System appearance is the default, with a persistent manual override. Geist typography is retained.
- `src/components/section-tracker.tsx` and `interest-strip.tsx`: accessible section navigation and a scroll-driven interests strip, with a static wrapping alternative for reduced motion. No animation or UI libraries were added.
- `src/components/build-notes.tsx`: a footer credit and shadcn dialog explaining that the website was vibe coded with Codex, with a link to its public source on `main`.
- `DESIGN.md`: visual decisions, content sourcing, and interaction rules.
- `public/tritam.jpg`: existing public GitHub profile illustration.
- `src/lib/repository-snapshot.json`: verified public GitHub snapshot from 8 October 2026, providing immediate content and a fallback. Browser fetching refreshes it on visits; a 15-minute local cache limits API requests. Failed refreshes explicitly label saved results.
- `src/lib/github.ts`: paginated public GitHub API fetching, timeout, cache handling, and readable repository titles. New titles split camel case, hyphens, underscores, and dots, and preserve familiar acronyms such as AI, MCP, and API. Existing curated titles in `projectNotes` take precedence. Search accepts both the display title and original name; GitHub names and links are unchanged. No token required or included. Forks, archived projects, website/portfolio repositories, and profile config repositories are excluded.

Content was updated on 12 October 2026 from the local `LinkedIn Profile Draft.md`, `LinkedIn Change Log.md`, `LinkedIn Projects - Saved Entries.json`, and `LinkedIn Skills Map.md`, which are not included in this repository. The change log records live LinkedIn verification on 10-11 October. Role dates follow Tritam's accepted chronology; the current analytics title is a functional public title. Education dates, MSc completion, IIITB CGPA, and the BSc gold medal now reflect the updated source. Shared redemption-rate results remain omitted at Tritam's request. Roadmap ideas are not presented as completed work; connected-tool projects have descriptive background without invented public repository or demo links.

Contact creates a validated `mailto:` draft for the visitor to review and send. It does not send or store submissions. Visitors without a configured email app can copy the visible address.

## GitHub Pages

This project targets the existing root site `tritammohanty.github.io`, not a repository subpath. The source is at the repository root. `main` is the production branch. Repository Settings → Pages → Source uses GitHub Actions, and `.github/workflows/deploy.yml` builds, checks, and deploys `out/` with official GitHub Pages actions. Pushing the feature branch does not deploy the redesign.

The original `#hero`, `#projects`, and `#contact` anchors remain supported. `/projects.html` redirects to `/projects/` to retain the previous archive link.

Building or previewing locally does not deploy. A successful production workflow publishes the site. The previous site is retained on `master` and tagged `site-before-redesign-2026-10-12`; see `ROLLBACK.md` for restoration instructions.

## Checks

Browser verification covers small/large mobile, tablet, laptop, and wide desktop widths; live repository loading, category tabs, keyboard navigation, search, sorting, dialogs, email validation, and theme switching. Lighthouse reports are saved under `reports/` (ignored by Git). See `VERIFICATION.md` for the final results and limitations.
