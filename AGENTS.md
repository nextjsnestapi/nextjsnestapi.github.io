# AGENTS.md

Context for AI coding agents working in this repo. Read this before making changes.

## What this is

The Docusaurus v3 documentation site for `nextjs-nestapi`
(`/Users/mac/Desktop/dev/nextjs-nestapi`, a sibling repo — the actual library). Docs content
here largely mirrors that repo's README.md; when the library's public API/behavior changes,
update both places, not just one.

## Layout

```
docusaurus.config.ts   # site config — url/organizationName/projectName MUST match the
                        # actual GitHub Pages deployment target, see "Deployment" below
sidebars.ts             # manual docsSidebar array — keep in sync with docs/ file list
docs/*.md                       # top-level doc pages
docs/core-concepts/*.md          # DTO validation, routing, middleware, etc.
blog/*/index.md                   # blog posts (dated directories)
src/pages/index.tsx                # homepage — hero + HomepageComparison +
                                    # HomepageCompareTable + HomepageFeatures sections
src/components/HomepageFeatures/    # "Everything you need" 6-card grid (source of the
                                     # visual pattern the other homepage sections copy)
src/components/HomepageComparison/  # "Why nextjs-nestapi?" 6-card grid (data-driven via
                                     # data.ts, currently one export: validationComparison)
src/components/HomepageCompareTable/ # "How nextjs-nestapi compares" table vs Route
                                      # Handlers / NestJS / Express
static/img/social-card.png          # 1200x630 OG image
static/robots.txt                    # sitemap URL — must match final deployed domain
```

`HomepageFeatures`'s `styles.module.css` is the **reference style** — `HomepageComparison`
and `HomepageCompareTable` were deliberately built to visually match it (same card
radius/padding/gradient-icon treatment). If you touch one, check whether the others drifted.

Homepage visual structure took some inspiration from `https://zustic.github.io/` (layout
patterns only, not copied content/code — this was an explicit, corrected instruction: an
earlier full-redesign pass copied too much and was reverted back to this project's own hero/
styling).

## Commands

- `npm start` — dev server. **Note:** `docusaurus start` does not server-render page content
  into the initial HTML (client-side hydration of an empty `<div id="__docusaurus">` shell)
  — `curl`/`grep` against the dev server will always show nothing useful, that's expected,
  not a bug. To actually verify content landed, use `npm run build` and grep the static
  output in `build/*.html`, or `npm run serve` for a full static prod-mode check.
- `npm run build` — static build to `build/`.

## Deployment (status: LIVE)

Live at **`https://nextjsnestapi.github.io/`** (root domain, no subpath, no hyphens —
`nextjsnestapi` with no hyphen is correct and confirmed with the user twice).

- **Repo:** `nextjsnestapi/nextjsnestapi.github.io` (already renamed from the old
  `nextjsnestapi/nextjsnestapi`). Remote `origin` is the SSH URL.
- **Mechanism:** GitHub Actions — `.github/workflows/deploy.yml` (push to `main` →
  `npm ci` + `npm run build` → `actions/upload-pages-artifact` → `actions/deploy-pages`).
  Repo Settings → Pages → Source is set to "GitHub Actions". There is **no `gh-pages`
  branch** and `npm run deploy` (`docusaurus deploy`) is NOT the path used — don't run it.
- **Push:** SSH key `~/.ssh/nextjsnestapi`; use
  `GIT_SSH_COMMAND="ssh -i ~/.ssh/nextjsnestapi -o IdentitiesOnly=yes"` for git ops.
- `docusaurus.config.ts` (`url`, `organizationName`, `projectName`, `baseUrl:'/'`) and
  `static/robots.txt` (`Sitemap:` line) are all already correct — leave them.
- The old sitemap "outside any Git worktree" error is gone now that the repo has `.git`
  and the workflow checks out with `fetch-depth: 0`.
- `gh` CLI is still not installed here; repo-settings changes (Pages source, repo name)
  need the GitHub web UI or an installed+authed `gh`.
- After any deploy, confirm the change is actually live before calling it done — the user
  has asked for this explicitly more than once. Fast check: grep the hashed CSS at
  `https://nextjsnestapi.github.io/assets/css/*.css` for an expected value; the Actions
  build+deploy is typically ~1 min.

## Content conventions

- Bengali requested for all conversational replies to the user in this project's sessions —
  not doc content itself, which stays in English (the library's docs/README are English).
- When adding a homepage feature/comparison card, prefer editing existing card text over
  adding a 7th card to a 6-card (2 rows of 3) grid — an odd count breaks the grid's visual
  balance at the 3-column breakpoint.
