# Keeping the portfolio current

## Profile details

Edit `src/lib/content.ts` for biography, highlighted skills, capabilities, roles, education, and project explanations. The site renders these values at build time. GitHub repository metadata continues to refresh directly in the visitor's browser.

The 12 October 2026 content update uses local records that were verified against the saved LinkedIn profile on 10-11 October: the profile draft, change log, saved project entries, and skills map. Those local records contain private working and rollback material and are intentionally excluded from this repository. The experience boundaries follow Tritam's accepted durations, not an independent employment-record audit. The analytics title describes the current function; it does not imply an official internal title change.

Retain these editorial choices when importing later changes:

- Leave out shared redemption-rate metrics. Describe analysis, reporting, dashboard planning, and client communication instead.
- Keep dashboard ideation distinct from dashboard implementation.
- Credit the air-quality project team. Keep AI-assisted development credit for CompanionAI and this portfolio.
- Add demo and source links only when actual public links are available.
- Keep planned projects and unverified results out of completed work.

## LinkedIn synchronization

The ordinary Sign in with LinkedIn product exposes identity fields, not a full portfolio export. The Profile API requires approved access, with additional profile fields restricted to select partners. Verified on LinkedIn Plus has approved profile/verification notifications; these are not a general feed of About, Experience, Projects, and posts.

Sources reviewed on 11 October 2026:

- [Profile API](https://learn.microsoft.com/en-us/linkedin/shared/integrations/people/profile-api)
- [Sign in with LinkedIn using OpenID Connect](https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin-v2)
- [Verified on LinkedIn data freshness](https://learn.microsoft.com/en-us/linkedin/consumer/integrations/verified-on-linkedin/guides/plus-tier/data-freshness)

Recommended next step: keep this public content source current after reviewing LinkedIn changes or an export. Run the project checks and build, then push the reviewed update. The existing Pages workflow deploys from main/master or a manually requested run; pushing the feature branch does not publish the redesign. Once the redesign is adopted, deployment can follow content changes through that workflow.

No recurring scheduler or automatic LinkedIn ingestion is implemented. Do not place LinkedIn tokens, browser cookies, or private profile records in the site or repository.

## Blog and LinkedIn posts

The website contains the sections and rendering. A separate content project can handle research, AI drafting, review, and publishing. Its integration point is `src/content/writing.json`. It should add approved public content, run the website checks, and push the resulting change. Updating this file refreshes both the home preview and `/writing/` at the next build.

Each entry needs `kind` (Blog or LinkedIn), a unique lowercase hyphenated `id`, `title`, `summary`, an ISO `date`, `topic` (Project story, Tutorial, or AI news), and `status` (draft or published).

- LinkedIn entries include a real HTTPS LinkedIn `url`. The current entry is the existing 8 October AI Generalist Accelerator post, recorded in the saved Featured verification.
- Blog entries include `sections`, an array of optional `heading` and required nonempty `paragraphs` arrays. Published articles must have at least one section. Optional `sources` are arrays of source titles and HTTPS URLs. Blog text is rendered as text, not executable HTML.
- Blog articles appear in full in `/writing/`, with a stable `/writing/#article-id` link. A later content project can add dedicated article routes if needed.
- Only published entries dated on or before the build appear. A future date does not schedule a deployment; a rebuild is required after that date.
- Keep private drafts, research notes, and credentials in the separate project. This JSON file is in a public repository even when an entry is marked draft.

There are no published blog articles yet. The empty state says so explicitly. No generator, scheduler, auto-posting, or post-scraping service is added to this website.
