---
title: Middleware
description: Global and per-route middleware, composed around the handler.
slug: /core-concepts/middleware
---

# Middleware

## Global middleware

Runs for every route, in registration order:

```ts
app.use(async (context, next) => {
  console.log(context.request.method, context.request.url);
  return next();
});
```

## Per-route middleware

`@Use` attaches middleware to a single route, composed around that route's handler:

```ts
import {Use} from "nextjs-nestapi";

@Controller("/hello")
export class HelloController {
  @Use(async (context, next) => {
    if (!context.request.headers.get("authorization")) {
      return context.json({message: "Unauthorized"}, {status: 401});
    }
    return next();
  })
  @Get("")
  list() {
    return {message: "hello world"};
  }
}
```

## Real-world examples

### 1. Authentication + roles

Authenticate once in global middleware by putting the user on `context.user`, then let the
built-in [`@AuthGuard`](/core-concepts/auth-guard) enforce it per route instead of
hand-rolling the check:

```ts
app.use(async (context, next) => {
  const token = context.request?.headers.get("authorization")?.replace("Bearer ", "");
  context.user = token ? await verifyToken(token) : null;
  return next();
});
```

```ts
@Controller("/orders")
export class OrderController {
  @AuthGuard(["ADMIN"])
  @Get("")
  list(@CurrentUser() user: {id: string; role: string}) {
    return {orders: []};
  }
}
```

### 2. Request timing + logging

```ts
app.use(async (context, next) => {
  const start = Date.now();
  const response = await next();
  console.log(`${context.request.method} ${context.request.url} - ${Date.now() - start}ms`);
  return response;
});
```

Global middleware wraps `next()`, so it can inspect (or even rewrite) the response on the
way back out, not just the request on the way in.

### 3. CORS headers

```ts
app.use(async (context, next) => {
  if (context.request.method === "OPTIONS") {
    return context.json(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  const response = await next();
  response.headers.set("Access-Control-Allow-Origin", "*");
  return response;
});
```

### 4. Rate limiting

In-memory, per IP — swap the `Map` for Redis in a multi-instance deployment:

```ts
const hits = new Map<string, {count: number; resetAt: number}>();

app.use(async (context, next) => {
  const ip = context.request.headers.get("x-forwarded-for") ?? "unknown";
  const now = Date.now();
  const entry = hits.get(ip);

  if (!entry || now > entry.resetAt) {
    hits.set(ip, {count: 1, resetAt: now + 60_000});
  } else if (entry.count >= 100) {
    return Response.TooManyRequests("Rate limit exceeded, try again later"); // -> HTTP 429
  } else {
    entry.count += 1;
  }

  return next();
});
```

### 5. API key check

For server-to-server / public API routes, kept separate from user auth:

```ts
import {Use, Response} from "nextjs-nestapi";

function requireApiKey() {
  return async (context: RouteContext, next: () => Promise<any>) => {
    const key = context.request.headers.get("x-api-key");
    if (!key || !(await isValidApiKey(key))) {
      return Response.Unauthorized("Invalid API key");
    }
    return next();
  };
}

@Controller("/webhooks")
export class WebhookController {
  @Use(requireApiKey())
  @Post("/stripe")
  handleStripe(context: RouteContext) {
    return {received: true};
  }
}
```

### 6. Error boundary

Catch anything a handler throws and turn it into a structured 500 instead of an
unhandled-exception page:

```ts
app.use(async (context, next) => {
  try {
    return await next();
  } catch (err) {
    console.error(err);
    return Response.InternalServerError(
      process.env.NODE_ENV === "production" ? "Something went wrong" : String(err)
    );
  }
});
```

### 7. Request body size limit

```ts
app.use(async (context, next) => {
  const length = Number(context.request.headers.get("content-length") ?? 0);
  if (length > 5 * 1024 * 1024) {
    return Response.BadRequest("Request body too large (max 5MB)");
  }
  return next();
});
```

### 8. Response caching headers

Per route:

```ts
@Controller("/posts")
export class PostController {
  @Use(async (context, next) => {
    const response = await next();
    response.headers.set("Cache-Control", "public, max-age=60, stale-while-revalidate=300");
    return response;
  })
  @Get("")
  list() {
    return {posts: []};
  }
}
```

### 9. IP allowlist

For internal/admin-only endpoints:

```ts
const ALLOWED_IPS = new Set(["10.0.0.1", "10.0.0.2"]);

@Controller("/internal")
export class InternalController {
  @Use(async (context, next) => {
    const ip = context.request.headers.get("x-forwarded-for");
    if (!ip || !ALLOWED_IPS.has(ip)) return Response.Forbidden();
    return next();
  })
  @Get("/metrics")
  metrics() {
    return {uptime: process.uptime()};
  }
}
```

### 10. Request ID / correlation ID

Attach one to every request for log tracing across services:

```ts
app.use(async (context, next) => {
  const requestId = context.request.headers.get("x-request-id") ?? crypto.randomUUID();
  const response = await next();
  response.headers.set("x-request-id", requestId);
  return response;
});
```

## Signature

```ts
type Middleware = (
  context: RouteContext,
  next: () => Promise<NextResponse | Response | any>
) => Promise<NextResponse | Response | any> | NextResponse | Response | any;
```

Call `next()` to continue to the next middleware (or the handler itself); return a value
directly to short-circuit the chain without running the handler.
