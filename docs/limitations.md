---
title: Limitations
description: What nextjs-nestapi deliberately does not do.
slug: /limitations
---

# Limitations

- **App Router only.** The Pages Router (`pages/api/*`) is not supported.
- **No dependency-injection container.** Controllers are plain classes; construct their
  dependencies yourself (constructor defaults, a service locator, whatever your app
  already uses).
- **No modules/pipes/interceptors, and one auth guard, not a guard system.** The decorator
  surface intentionally covers routing, DTO validation, middleware, and a single
  [`@AuthGuard`](/core-concepts/auth-guard) built on middleware — not the full NestJS
  feature set.
- **No route-specificity resolution.** Routes match in declaration order, first match wins
  — see [Controllers & routing](/core-concepts/controllers-and-routing).

These are deliberate scope decisions, not gaps waiting to be filled: the goal is a thin
routing layer over Next.js's own `NextRequest`/`NextResponse`, not a second framework
running inside your Next.js app.
