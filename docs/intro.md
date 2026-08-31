---
title: Introduction
description: Why nextjs-nestapi exists and what it gives you over plain Next.js App Router route handlers.
slug: /intro
---

# nextjs-nestapi

**Write Next.js App Router API routes in NestJS style** — decorator-based controllers,
DTO validation, middleware, and auto-generated OpenAPI/Swagger docs, all dispatched
through a single catch-all `route.ts`. Ships with a CLI to scaffold new projects and
features.

## Why nextjs-nestapi

Next.js App Router API routes are fast but low-level: every endpoint is its own file,
request parsing and validation are manual, and there's no shared structure for larger
APIs. NestJS solves this with controllers, decorators, and DTOs — but pulling in a full
Nest runtime (modules, a DI container, its own HTTP adapter) inside a Next.js app is a
lot of machinery for what is usually just "organize my API routes."

`nextjs-nestapi` is the middle ground: NestJS-style ergonomics, implemented as a thin
layer over Next.js's own `NextRequest`/`NextResponse`, with no DI container and no
second framework running alongside Next.js. One catch-all route dispatches to plain
`@Controller` classes.

## What you get

- Decorator-based routing (`@Controller`, `@Get`, `@Post`, …)
- Request body validation via `@Body(DtoClass)` and `class-validator`
- Authentication guards (`@AuthGuard`/`@CurrentUser`) reading a `context.user` your middleware sets, no DI container
- Global and per-route middleware
- Auto-generated OpenAPI documents and a self-hosted Swagger UI
- A CLI (`nextjs-nestapi new` / `init` / `generate controller`) to scaffold projects and
  features

Continue to [Installation](/installation) to add it to a project, or jump straight to the
[Quick start](/quick-start) for a working example.
