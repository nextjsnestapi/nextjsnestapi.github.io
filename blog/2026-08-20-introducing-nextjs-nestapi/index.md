---
slug: introducing-nextjs-nestapi
title: Introducing nextjs-nestapi
authors: [rejaul]
tags: [release]
description: NestJS-style controllers, DTO validation, and middleware for the Next.js App Router — no DI container, no second framework.
---

Next.js App Router route handlers are fast and simple — and that simplicity starts to
hurt once an API grows past a handful of endpoints. Every route is its own file, request
parsing is manual, and there's no shared structure for organizing controllers, validating
input, or documenting what you've built.

NestJS solves exactly this with controllers, decorators, and DTOs — but pulling in a full
Nest runtime (modules, a DI container, its own HTTP adapter) inside a Next.js app is a lot
of machinery for what is usually just "organize my API routes."

**`nextjs-nestapi` is the middle ground.**

{/* truncate */}

## What it looks like

```ts
import {Controller, Get, Post, Body, type RouteContext} from "nextjs-nestapi";
import {CreateHelloDto} from "./dto";

@Controller("/hello")
export class HelloController {
  @Get("/:id")
  getOne(context: RouteContext) {
    return {id: context.params.id};
  }

  @Post("")
  create(@Body(CreateHelloDto) dto: CreateHelloDto) {
    return {created: dto};
  }
}
```

One catch-all `app/api/[[...route]]/route.ts` dispatches every request to your registered
controllers. `@Body(DtoClass)` validates the request against a `class-validator` DTO and
returns a structured error response automatically when it fails. No DI container, no
modules — just plain classes wired together with `createApplication()`.

## Why not just use NestJS's own Next.js adapter, or plain route handlers?

- **Plain route handlers** work fine for a few endpoints, but you end up hand-rolling the
  same body-parsing, validation, and error-shaping logic in every file.
- **A full NestJS app running inside Next.js** gives you all of that back, plus a DI
  container, modules, guards, pipes, and interceptors you may not need — and a second
  framework's request lifecycle running alongside Next.js's own.

`nextjs-nestapi` picks a narrower scope on purpose: routing, DTO validation, and
middleware, implemented directly on top of `NextRequest`/`NextResponse`. See
[Limitations](/limitations) for the full list of what's deliberately left out.

## Get started

```bash
npx nextjs-nestapi new my-app
```

or wire it into an existing project:

```bash
npm install nextjs-nestapi class-validator class-transformer
npx nextjs-nestapi init
```

Head to the [Quick start](/quick-start) to build your first controller.
