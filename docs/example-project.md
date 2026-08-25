---
title: Example project
description: A runnable example app wired with nextjs-nestapi.
slug: /example-project
---

# Example project

A complete, runnable example — routing, DTO validation, and the OpenAPI/Swagger setup —
lives in [`example/`](https://github.com/DeveloperRejaul/nextjs-nestapi/tree/main/example)
in the main repository: a real `create-next-app` project with `nextjs-nestapi` wired in.

```bash
git clone https://github.com/DeveloperRejaul/nextjs-nestapi.git
cd nextjs-nestapi/example
npm install
npm run dev
```

Then open `http://localhost:3000` for links to the API routes, and `/api-docs` for the
Swagger UI.

## What it demonstrates

- A `HelloController` with `@Get`, `@Get("/:id")`, and `@Post` + `@Body(CreateHelloDto)`
- DTO validation failures returning a structured error response
- `@ApiTags`/`@ApiOperation`/`@ApiResponse` annotations
- `/api/openapi.json` and `/api-docs` wired via `generateOpenApiDocument()` and
  `createSwaggerUiHandler()`
