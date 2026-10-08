# Verification

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
