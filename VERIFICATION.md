# Verification

## Portrait and build-credit update, 10 October 2026

- Added a larger 4:5 portrait composition alongside the two-line name and introduction. Mobile places the portrait after the main action. The current public illustration remains until a real photograph is supplied; source, dimensions, alt text, and crop position are centralized in the profile content.
- Checked portrait layouts at 320, 390, 428, 768, 1024, 1280, 1440, and 1920px without horizontal overflow. At the inspected 1280px desktop width, the main action ends at 649px from the viewport top.
- The footer "Vibe coded with Codex" credit opens a shadcn build-notes dialog with an actual public source link. At 320 × 640px, the dialog stays 16px from each viewport edge and scrolls internally. Keyboard focus stays inside the dialog, Escape dismisses it, and no console errors or warnings were recorded.
- ESLint, TypeScript, formatting of edited source, production build, and all 49 export link/asset checks pass. No additional packages, services, or application backend were introduced.
- Portrait hover is restricted to pointer devices and disabled under reduced motion. The CSS fallback was reviewed; no operating-system motion preference emulation was performed.

## Theme and interaction update, 10 October 2026

Validated against the updated production static export:

- Exact tweakcn Default light/dark colors applied, retaining Geist typography and using semantic foreground tokens on tinted panels. Social preview and favicon assets regenerated in the neutral palette.
- Home layouts checked at 320, 390, 428, 768, 1280, 1440, and 1920px without horizontal overflow. The compact mobile section links each retain at least 44px touch targets.
- Section navigation updates on clicks and ordinary scrolling in both directions; the reading-progress line follows page progress. Observers clean up on unmount and adapt on resize.
- Mobile project dialog and navigation sheet open and dismiss with Escape. No browser console errors or warnings were recorded in the inspected preview.
- Scroll-driven interests strip is clipped within its own region. Repeated visual content is hidden from assistive technology. Reduced-motion wrapping CSS and the Motion preference hook were reviewed; operating-system preference emulation was not performed in this update.
- Shared percentage results were removed. The experience highlight now describes SQL, customer journey analysis, reporting, and contributions to team strategy.
- ESLint, TypeScript, formatting, GitHub integration tests, production build, and the export checker pass. All 49 checked routes, anchors, and static assets resolve.

The earlier Lighthouse scores and contrast measurements below describe the 8 October design, not this palette update; Lighthouse was not rerun for this update.

## Initial redesign, 8 October 2026

Validated on 8 October 2026 using the production static export.

- ESLint: passes without warnings or errors.
- TypeScript: passes.
- Next.js production build: passes; static home and project archive exported.
- GitHub integration tests: pagination, saved results, cache expiry, failed refresh preservation, rate limits, malformed responses, corrupt cache, and repository filtering pass.
- Export verification: all 49 checked internal routes, anchor targets, images, fonts, styles, and scripts exist.
- Dependency peer checks: no issues. Versions are pinned and the lockfile is included. TypeScript 6 and ESLint 9 are used for compatibility with the installed Next.js lint plugins.
- Browser layouts: 320, 390, 428, 768, 1280, 1440, and 1920px. Home and archive have no horizontal overflow. Filters wrap without overlapping search. Small-screen navigation uses a sheet.
- Interactions: live GitHub fetch, saved-result display, category tabs including arrow-key navigation, search and empty-state reset, alphabetical sorting, project detail dialogs, Escape dismissal, mobile navigation, appearance persistence, and legacy archive redirect verified.
- Contact: empty fields show associated errors; a valid test note produces the expected encoded email draft. No message was sent. Form code is loaded on demand.
- Browser console: no application errors in the inspected production preview. Favicon and social-preview images are supplied.
- Sampled text color combinations in light and dark themes exceed 5.6:1 contrast; body text exceeds 15:1. Controls have 44px minimum touch targets, including dialog and menu close buttons.
- Reduced motion: MotionConfig honors the user's preference, all leaf transitions check useReducedMotion, and CSS removes animation/smooth scrolling when requested.

## Lighthouse

Local production export, compressed static assets, Lighthouse mobile simulation:

| Category       | Score |
| -------------- | ----- |
| Performance    | 76    |
| Accessibility  | 100   |
| Best practices | 100   |
| SEO            | 100   |

Performance improved from the initial 60. The simulated mobile LCP remains approximately 5 seconds and does not meet the design skill's 2.5-second target. Contact code is deferred, Motion uses LazyMotion, fonts are local/preloaded, and saved GitHub data is rendered immediately. Further field measurement on the actual GitHub Pages deployment is needed; local scores are not a guarantee of deployed Core Web Vitals. Reports are in `reports/lighthouse-final.report.html` and `.json`.

The accessibility score is automated evidence, not a complete accessibility certification. Keyboard and responsive behavior were also inspected manually. GitHub's unauthenticated API can still rate-limit visitors; the site labels saved results and offers retry and direct GitHub access.

## Delivery

Source is in this directory. `out/` is the deployable export. The preview server is a local development utility, not an application backend. The GitHub Pages workflow is prepared but has not been run remotely; the existing public website has not been changed.
