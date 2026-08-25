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

## Deployment (status: not yet deployed)

Confirmed final target: **`https://nextjsnestapi.github.io/`** (root domain, no subpath, no
hyphens — note this differs from the GitHub org name pattern used elsewhere in this
project's history; `nextjsnestapi` with no hyphen is correct and confirmed with the user
twice).

To get a GitHub Pages root URL, the repo must be named exactly `<org>.github.io`. Plan
(agreed with user): rename the existing empty repo `nextjsnestapi/nextjsnestapi` →
`nextjsnestapi/nextjsnestapi.github.io`, rather than creating a new repo.

**Blocker at last check:** `gh` CLI is not installed on this machine, and no PAT/token is
available, so the rename can't be done via API from here — repo renames aren't possible over
plain SSH (SSH keys authenticate git push/pull, not GitHub's repo-settings API). Either
install `gh` and authenticate it, or ask the user to rename the repo manually via the GitHub
web UI (Settings → Repository name). Check whether this has already happened before
re-asking — `gh repo view nextjsnestapi/nextjsnestapi.github.io` (if `gh` is available) or a
plain `git ls-remote` against the target URL will tell you.

SSH key for pushing to this repo: `~/.ssh/nextjsnestapi` — use
`GIT_SSH_COMMAND="ssh -i ~/.ssh/nextjsnestapi -o IdentitiesOnly=yes"` for git operations
against it.

Once the repo is renamed, still needed before deploying:
- `docusaurus.config.ts`: `url` → `https://nextjsnestapi.github.io`, `organizationName` →
  `nextjsnestapi`, `projectName` → `nextjsnestapi.github.io` (`baseUrl:'/'` is already
  correct, don't change it).
- `static/robots.txt`: `Sitemap:` line → `https://nextjsnestapi.github.io/sitemap.xml`.
- This repo has **no `.git` yet** (`git status` fails with "not a git repository") — init it,
  set the remote, and push using the SSH command above.
- Decide deploy mechanism (`docusaurus deploy` to a `gh-pages` branch vs. a GitHub Actions
  workflow) — not yet decided with the user, ask before picking one.
- The sitemap plugin (`lastmod:'date'`) once threw "This Docusaurus site is outside any Git
  worktree" during build, because there was no `.git` here — this may resolve itself once git
  is initialized (the error is specifically about a missing git worktree), but hasn't been
  re-verified since. Watch for it recurring in the first build after `git init`.
- Show the user the final URL before considering the deploy done — they've asked for this
  confirmation explicitly more than once.

## Content conventions

- Bengali requested for all conversational replies to the user in this project's sessions —
  not doc content itself, which stays in English (the library's docs/README are English).
- When adding a homepage feature/comparison card, prefer editing existing card text over
  adding a 7th card to a 6-card (2 rows of 3) grid — an odd count breaks the grid's visual
  balance at the 3-column breakpoint.
