---
title: Controllers & routing
description: The full @Controller and HTTP-verb decorator surface.
slug: /core-concepts/controllers-and-routing
---

# Controllers & routing

`@Controller(prefix)` registers a class and wires up its parameter decorators. Every
method decorated with an HTTP-verb decorator becomes a route:

```ts
import {Controller, Get, Post, Put, Patch, Delete, Head, Options, All} from "nextjs-nestapi";

@Controller("/posts")
export class PostController {
  @Get("")        list() { /* GET /api/posts */ }
  @Get("/:id")    getOne() { /* GET /api/posts/:id */ }
  @Post("")       create() { /* POST /api/posts */ }
  @Put("/:id")    replace() { /* PUT /api/posts/:id */ }
  @Patch("/:id")  update() { /* PATCH /api/posts/:id */ }
  @Delete("/:id") remove() { /* DELETE /api/posts/:id */ }
}
```

`@Head`, `@Options`, and `@All` (matches every HTTP method) are available for the less
common cases. Path segments prefixed with `:` (e.g. `/:id`) are captured into
`context.params` — see [Route parameters](/core-concepts/route-parameters).

Routes are matched in **declaration order**, first match wins (no static-vs-dynamic
prioritization) — a literal route like `@Get("/search")` needs to be declared *before* a
colliding `@Get("/:id")` on the same controller, or `:id` will swallow it first.

## Registering a controller

A controller only becomes reachable once it's passed to
[`createApplication`](/core-concepts/application-configuration):

```ts
import {createApplication} from "nextjs-nestapi";
import {PostController} from "./features/post/controller";

export const app = createApplication({
  controllers: [PostController],
});
```

## Path resolution

The final route path is `${basePath}${controllerPrefix}${methodPath}`. With the default
`basePath: "/api"`, `@Controller("/posts")` + `@Get("/:id")` resolves to
`GET /api/posts/:id`.
