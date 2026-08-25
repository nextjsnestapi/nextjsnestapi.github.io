---
title: Handler return values
description: What a controller method can return.
slug: /core-concepts/handler-return-values
---

# Handler return values

A controller method can return:

- **A plain value** — serialized with `NextResponse.json(value)` (status 200).
- **A plain object with a `statusCode` field** — e.g. anything from the
  [`Response` helper](#the-response-helper) — serialized with that status code applied.
- **A `NextResponse` instance** — returned as-is. Use `context.json(value, {status: 201})`
  for a custom status code or headers when you'd rather build it by hand.

```ts
@Post("")
create(@Body(CreateHelloDto) dto: CreateHelloDto) {
  return {created: dto}; // -> 200, NextResponse.json({ created: dto })
}

@Post("")
createWithStatus(context: RouteContext, @Body(CreateHelloDto) dto: CreateHelloDto) {
  return context.json({created: dto}, {status: 201});
}
```

## The `Response` helper

A full set of structured, professional response-shape helpers — used internally by
`@Body()` validation failures, and available for your own handlers. Every method returns a
plain object with a `statusCode` field; when returned directly from a controller method
(API-route path), the router reads `statusCode` and sets the **real HTTP status** on the
response automatically — no manual `context.json(body, {status})` needed:

```ts
import {Response} from "nextjs-nestapi";

@Get("/:id")
getOne(context: RouteContext) {
  const post = db.find(context.params.id);
  if (!post) return Response.NotFound("Post not found"); // -> HTTP 404
  return Response.Ok(post);                              // -> HTTP 200
}
```

| Method | HTTP status | Shape |
| --- | --- | --- |
| `Response.Ok(data?, message?)` | 200 | `{success: true, statusCode, message, data}` |
| `Response.Created(data?, message?)` | 201 | `{success: true, statusCode, message, data}` |
| `Response.NoContent(message?)` | 204 | `{success: true, statusCode, message}` |
| `Response.BadRequest(message?)` | 400 | `{success: false, statusCode, message}` |
| `Response.ValidationFailed(errors, message?)` | 400 | `{success: false, statusCode, message, errors}` |
| `Response.Unauthorized(message?)` | 401 | `{success: false, statusCode, message}` |
| `Response.Forbidden(message?)` | 403 | `{success: false, statusCode, message}` |
| `Response.NotFound(message?)` | 404 | `{success: false, statusCode, message}` |
| `Response.Conflict(message?)` | 409 | `{success: false, statusCode, message}` |
| `Response.TooManyRequests(message?)` | 429 | `{success: false, statusCode, message}` |
| `Response.InternalServerError(message?)` | 500 | `{success: false, statusCode, message}` |
| `Response.BadPage(message)` | 400 | paginated-list shape signalling an invalid page |
| `Response.EmptyPage()` | 200 | paginated-list shape with an empty `data` array |

The same helpers work from a
[Server Action](/core-concepts/dto-validation#server-action-validation) too — there's no
real HTTP status to set outside a route, so `statusCode` just stays informational and the
caller branches on `result.success` instead.
