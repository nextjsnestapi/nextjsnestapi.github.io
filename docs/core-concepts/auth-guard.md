---
title: Authentication guards
description: Protect routes and inject the current user with @AuthGuard and @CurrentUser.
slug: /core-concepts/auth-guard
---

# Authentication guards

`@AuthGuard()` and `@CurrentUser()` — NestJS-style route protection, without a DI container
or a bundled auth strategy. Neither decorator resolves a user itself: they both read
`context.user`, which **earlier middleware in the chain is responsible for setting**. The
library handles the 401/403 short-circuiting and the injection; you decide how a request
becomes a user.

## Set `context.user` in middleware

Authenticate in an [`app.use()`](/core-concepts/middleware) middleware (or a per-route
[`@Use`](/core-concepts/middleware)) and assign the result to `context.user` before any
guarded handler runs:

```ts title="app.ts"
import jwt from "jsonwebtoken";

app.use(async (context, next) => {
  const token = context.request?.headers.get("authorization")?.replace("Bearer ", "");

  try {
    context.user = token
      ? (jwt.verify(token, process.env.JWT_SECRET!) as {id: string; role: string})
      : null;
  } catch {
    context.user = null; // invalid/expired token → treated as anonymous
  }

  return next();
});
```

The library doesn't assume a token format, a cookie name, or a database — read whatever you
need off `context.request` and put the resulting object (or `null`) on `context.user`.

## Guard routes and inject the user

```ts
import {Controller, Get, Post, AuthGuard, CurrentUser} from "nextjs-nestapi";

@Controller("/orders")
export class OrderController {
  @AuthGuard() // any authenticated user
  @Get("")
  list(@CurrentUser() user: {id: string; role: string}) {
    return {orders: findOrdersFor(user.id)};
  }

  @AuthGuard(["ADMIN"]) // must be authenticated AND have this role
  @Post("/refund")
  refund(@CurrentUser() user: {id: string; role: string}) {
    return {refundedBy: user.id};
  }
}
```

- `context.user` is `null` or unset → [`Response.Unauthorized()`](/core-concepts/handler-return-values#the-response-helper)
  (HTTP 401), the handler never runs.
- `context.user.role` isn't in the list → `Response.Forbidden()` (HTTP 403).
- `@AuthGuard(roles?)` is pure syntactic sugar over [`@Use`](/core-concepts/middleware) — it
  adds one middleware that inspects `context.user` and short-circuits, running before
  `@Body`/`@CurrentUser` parameter resolution, so a rejected request never triggers DTO
  validation.
- Guard and parameter middleware run inside the same method wrapper that `@Body` uses, so
  `@AuthGuard`/`@CurrentUser` behave identically whether the method is dispatched through a
  route or [bound and called directly as a Server Action](/core-concepts/dto-validation#server-action-validation).

## `@CurrentUser()` without `@AuthGuard()`

Used alone, `@CurrentUser()` never blocks the request — it injects whatever `context.user`
holds, `null` included. Use it on routes where login is optional but you still want to
personalize the response when a user happens to be authenticated:

```ts
@Get("/feed")
feed(@CurrentUser() user: {id: string} | null) {
  return {items: getFeed(user?.id)}; // works logged out or in
}
```

## Multiple auth schemes

There's no per-route resolver registration — this library has [no DI container](/intro) and
no request-scoped provider system. One middleware per app covers the common case (one token
format, one user shape). If you need several schemes, branch inside your own middleware —
check for an API key header first, fall back to a JWT cookie — and still assign the single
resolved value to `context.user`:

```ts
app.use(async (context, next) => {
  context.user =
    (await userFromApiKey(context)) ?? (await userFromJwtCookie(context)) ?? null;
  return next();
});
```
