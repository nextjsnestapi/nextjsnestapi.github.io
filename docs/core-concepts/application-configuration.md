---
title: Application configuration
description: The createApplication() options.
slug: /core-concepts/application-configuration
---

# Application configuration

```ts
import {createApplication} from "nextjs-nestapi";

export const app = createApplication({
  controllers: [HelloController, PostController],
  basePath: "/api", // default; routes are matched relative to this prefix
});
```

## `ApplicationOptions`

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `controllers` | `any[]` | — | The `@Controller` classes to register. |
| `basePath` | `string` | `"/api"` | Prefix routes are matched against. The catch-all route handler strips this prefix before matching, so it should match where you mount `app.handle`. |

`createApplication` returns a `NextJsApp` — the object your catch-all `route.ts` calls
`app.handle(request)` on. It also exposes `app.use(middleware)` for
[global middleware](/core-concepts/middleware).
