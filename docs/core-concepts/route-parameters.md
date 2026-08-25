---
title: Route parameters
description: The RouteContext object every route handler receives.
slug: /core-concepts/route-parameters
---

# Route parameters

A route method receives a single `RouteContext` argument (unless you're using
[`@Body`](/core-concepts/dto-validation), which injects the parsed DTO instead):

```ts
export interface RouteContext {
  request: NextRequest;
  params: Record<string, string>;
  query: URLSearchParams;
  json: (body: any, init?: ResponseInit) => NextResponse;
}
```

```ts
@Get("/:id")
getOne(context: RouteContext) {
  const {id} = context.params;
  const sort = context.query.get("sort");
  return {id, sort};
}
```

| Field | Description |
| --- | --- |
| `request` | The raw `NextRequest` — headers, cookies, `request.json()`, etc. |
| `params` | Captured `:param` path segments, as plain strings. |
| `query` | The request's `URLSearchParams`. |
| `json(body, init?)` | Shortcut for building a `NextResponse.json()` — used internally when a handler returns a plain value, and available for building custom-status responses yourself. |
