# Visual direction

An editorial portfolio for hiring teams and collaborators evaluating applied AI, ML, and analytical work. Inspiration: Harshith's direct positioning, strong type, and inspectable evidence. This is a visual overhaul; preserve the live GitHub project model and existing #hero, #projects, #contact anchors, social links, and /projects.html entry point.

DESIGN_VARIANCE: 6. MOTION_INTENSITY: 4. VISUAL_DENSITY: 4.

## System

- Geist Variable display/body, Geist Mono for repository metadata and compact labels. Self-hosted assets; no runtime font requests.
- Exact Default light/dark color tokens from [tweakcn's official configuration](https://github.com/jnsahaj/tweakcn/blob/main/config/theme.ts), verified 10 October 2026. White and charcoal neutrals; no colored brand accent. Geist remains the typography. No dependency on a theme service.
- 4px spacing unit; 24px mobile gutters, 48px desktop gutters; 1280px content maximum.
- tweakcn Default 10px base radius with standard shadcn small/medium/large/extra-large radius offsets. Pills only for compact category badges. No default shadows on page sections; dialogs use a restrained neutral shadow.
- Left-aligned introduction with the current GitHub profile illustration in a prominent 4:5 portrait frame. The name is deliberately set across two lines, with the taller portrait alongside the introduction. A restrained angle and neutral offset shadow give the portrait character; hover straightens it on pointer devices, and reduced motion removes the tilt. The future real photograph can replace the illustration through the centralized portrait configuration. One dominant selected project, two supporting projects, and a searchable repository list.
- 180-350ms opacity/translation transitions convey entrance and state. A shadcn navigation tracker marks the current section with weight, an underline, and aria-current; a thin header line follows reading progress. One horizontal strip introduces working interests and moves only with page scrolling, without an autonomous loop or pinned scrolling. Reduced motion displays all interests in a static wrapping list and removes smooth scrolling.
- Mobile turns asymmetry into a single column, a smaller portrait placed after the introduction and main action, stacked feature content, touch-sized controls, and a Radix sheet menu. The section tracker moves to a compact second header row on small screens.

## Structure

Header and navigation; introduction; live selected work and searchable GitHub archive; analytical/enterprise career; personal approach and education; contact dialog; footer.

## Content integrity

Source: Tritam's LinkedIn Working Draft.md (profile sourcebook, not included in the repository). Preserve formal employer titles. Do not publish roadmap ideas as completed work. Jerry and support triage are described as prototypes with no invented public demo. Education omits unknown dates/completion claims. At Tritam's request, remove shared program percentage outcomes from the portfolio; highlight SQL, customer journey analysis, and reporting contributions instead.

## Functionality

GitHub REST API is fetched directly in the browser, paginated, with timeout, retry, loading, explicit error state, local cache, category/search, and sorting. Selected project descriptions augment real repository metadata. No secrets, server, database, or authentication. Contact form validates with React Hook Form/Zod and prepares an email draft; it does not claim to send a message.

The footer explicitly credits "Vibe coded with Codex" and opens a shadcn dialog explaining the AI-assisted development process, design direction, stack, and public GitHub source. This is a build note, not a claim of hand-coding every line. Future case studies and demos need actual project evidence before publication.
