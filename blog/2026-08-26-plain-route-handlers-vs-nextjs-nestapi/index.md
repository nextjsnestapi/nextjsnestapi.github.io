---
slug: plain-route-handlers-vs-nextjs-nestapi
title: "Plain route handlers vs. nextjs-nestapi: a side-by-side comparison"
authors: [rejaul]
tags: [guide]
description: The same small CRUD API, written as plain Next.js App Router route handlers and again with nextjs-nestapi — file count, validation, and error handling compared directly.
---

Next.js App Router route handlers are just functions — `GET`, `POST`, whatever you
export. That's the whole appeal: no framework, no ceremony, straight to the Web
`Request`/`Response` APIs. It's also exactly where the pain starts once an API grows past
two or three endpoints. This post builds the same small `Post` resource twice — once with
plain route handlers, once with `nextjs-nestapi` — and compares what actually changed.

{/* truncate */}

## The API: list, get one, create

Both versions expose:

- `GET /api/posts` — list posts
- `GET /api/posts/:id` — get one post
- `POST /api/posts` — create a post, with `title`/`content` validation

## Plain route handlers

Two files, one per route segment, because that's how App Router file-based routing works:

```ts title="app/api/posts/route.ts"
import {NextRequest, NextResponse} from "next/server";
import {db} from "@/lib/db";

export async function GET() {
  const posts = await db.post.findMany();
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (typeof body.title !== "string" || body.title.length === 0) {
    return NextResponse.json({message: "title is required"}, {status: 400});
  }
  if (typeof body.content !== "string") {
    return NextResponse.json({message: "content is required"}, {status: 400});
  }

  const post = await db.post.create({data: {title: body.title, content: body.content}});
  return NextResponse.json(post, {status: 201});
}
```

```ts title="app/api/posts/[id]/route.ts"
import {NextRequest, NextResponse} from "next/server";
import {db} from "@/lib/db";

export async function GET(
  _request: NextRequest,
  {params}: {params: Promise<{id: string}>}
) {
  const {id} = await params;
  const post = await db.post.findUnique({where: {id}});

  if (!post) {
    return NextResponse.json({message: "Not Found"}, {status: 404});
  }

  return NextResponse.json(post);
}
```

Nothing here is wrong, exactly — but look at what's already crept in with just three
routes:

- Validation is hand-rolled, inline, and ad hoc. `title` gets a length check;
  `content` doesn't. Nobody decided that on purpose — it's just what got typed.
- The "not found" response shape (`{message: "Not Found"}`) has to be remembered and
  retyped in every route that needs it. A fourth route will either copy-paste it or
  quietly return something slightly different.
- There is no single place that lists "every route this API has." You reconstruct it by
  browsing the `app/api` folder tree.

None of that is a problem at three routes. It's the shape of the problem at thirty.

## The same API with nextjs-nestapi

```ts title="src/features/post/dto.ts"
import {IsString, MinLength} from "class-validator";

export class CreatePostDto {
  @IsString()
  @MinLength(1)
  title!: string;

  @IsString()
  content!: string;
}
```

```ts title="src/features/post/controller.ts"
import {Controller, Get, Post, Body, type RouteContext} from "nextjs-nestapi";
import {CreatePostDto} from "./dto";
import {db} from "@/lib/db";

@Controller("/posts")
export class PostController {
  @Get("")
  async list() {
    return db.post.findMany();
  }

  @Get("/:id")
  async getOne(context: RouteContext) {
    const post = await db.post.findUnique({where: {id: context.params.id}});
    if (!post) {
      return context.json({message: "Not Found"}, {status: 404});
    }
    return post;
  }

  @Post("")
  async create(@Body(CreatePostDto) dto: CreatePostDto) {
    return db.post.create({data: dto});
  }
}
```

Registered once in `app.ts`, dispatched through the one catch-all route every controller
shares — see the [Quick start](/quick-start) if you haven't wired that up yet.

The `POST` handler here has no validation code in it at all. `@Body(CreatePostDto)`
parses the request body, runs it against the DTO's `class-validator` decorators, and
either injects a validated `CreatePostDto` instance or short-circuits with a structured
`422`-shaped error — before `create()` ever runs:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [{"field": "title", "message": "title should not be empty"}]
}
```

`content` is validated too, because leaving a field unvalidated now takes a deliberate
choice — deleting a decorator — rather than just not getting around to writing a check.

## Side by side

| | Plain route handlers | nextjs-nestapi |
| --- | --- | --- |
| Files for 3 routes | 2 (`route.ts`, `[id]/route.ts`) | 2 (`controller.ts`, `dto.ts`) — stays 2 as you add more methods to the same resource |
| Validation | Hand-written `if` checks, easy to skip a field | Declarative, on the DTO, enforced before the handler runs |
| Error response shape | Whatever you typed this time | Consistent, generated by `@Body()` |
| "What routes exist?" | Reconstruct from the `app/api` folder tree | Read the `@Controller`/`@Get`/`@Post` decorators on one class |
| API docs | Write and maintain separately, or skip them | `generateOpenApiDocument()` reads the same decorators — see [OpenAPI / Swagger docs](/openapi-swagger) |
| New project boilerplate | You write it | `npx nextjs-nestapi new my-app` |

## When plain route handlers are still the right call

This isn't a "always use a framework" post. Reach for plain route handlers when:

- **It's one or two endpoints.** A webhook receiver or a health check doesn't need a
  controller class for one function.
- **You want the file tree to *be* the route map.** Some teams specifically like that
  `app/api/posts/[id]/route.ts` tells you the URL just by existing. `nextjs-nestapi`
  trades that for decorator-based organization behind a single catch-all route.
- **You're validating nothing, or almost nothing.** If a route has no request body worth
  validating, `@Body()` isn't buying you anything.

And the reverse: reach for `nextjs-nestapi` once you notice the same validation
boilerplate, the same error shape, and the same "which file was that route in again?"
friction showing up more than once. That's the point where a few decorators pay for
themselves.

## Try it

```bash
npx nextjs-nestapi new my-app
```

Then walk through the [Quick start](/quick-start), or read how
[DTO validation](/core-concepts/dto-validation) actually works under the hood.
