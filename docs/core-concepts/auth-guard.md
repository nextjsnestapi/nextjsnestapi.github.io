---
title: Authentication guards
description: Protect routes and inject the current user with @AuthGuard and @CurrentUser.
slug: /core-concepts/auth-guard
---

# Authentication guards

`@AuthGuard()` and `@CurrentUser()` — NestJS-style route protection, without a DI container
or a bundled auth strategy. Register **one** resolver, once, telling the library how to turn
a request into a user; the library handles the 401/403 short-circuiting and the injection.

## Configure the resolver

```ts title="app.ts"
import {configureAuth} from "nextjs-nestapi";
import jwt from "jsonwebtoken";

configureAuth({
  resolveUser: async (context) => {
    const token = context.request.headers.get("authorization")?.replace("Bearer ", "");
    if (!token) return null;

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as {id: string; role: string};
      return payload; // becomes the object @CurrentUser() injects
    } catch {
      return null;
    }
  },
});
```

`resolveUser` receives the request's `RouteContext`, so it can read headers, cookies (via
`context.request`), or anything else — it's your resolver, the library doesn't assume a
token format, a cookie name, or a database.

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

- No resolved user → [`Response.Unauthorized()`](/core-concepts/handler-return-values#the-response-helper)
  (HTTP 401), the handler never runs.
- Resolved user's `role` isn't in the list → `Response.Forbidden()` (HTTP 403).
- `@AuthGuard()` is sugar over [`@Use`](/core-concepts/middleware) — it runs as part of the
  same middleware chain, before `@Body`/`@CurrentUser` parameter resolution starts, so a
  rejected request never triggers DTO validation or user resolution for other parameters.
- `@CurrentUser()` reuses the same request's already-resolved user instead of calling
  `resolveUser` a second time when both decorators are on the same method.

## `@CurrentUser()` without `@AuthGuard()`

Used alone, `@CurrentUser()` never blocks the request — it resolves to `null` for anonymous
requests. Use it on routes where login is optional but you still want to personalize the
response when a user happens to be authenticated:

```ts
@Get("/feed")
feed(@CurrentUser() user: {id: string} | null) {
  return {items: getFeed(user?.id)}; // works logged out or in
}
```

## Why not decorate `resolveUser` per-route?

`configureAuth` is deliberately a single, global registration — this library has
[no DI container](/intro) and no request-scoped provider system. One resolver per app covers the common
case (one token format, one user shape); if you need multiple auth schemes, branch inside
your own `resolveUser` (e.g. check for an API key header first, fall back to a JWT cookie).
