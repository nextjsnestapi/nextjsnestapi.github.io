---
slug: openapi-swagger-docs
title: Auto-generate OpenAPI docs from your decorators
authors: [rejaul]
tags: [guide, openapi]
description: Turn your existing @Controller/@Body decorators into a live OpenAPI document and a self-hosted Swagger UI — no separate doc-writing step.
---

If you're already annotating controllers with `@Controller`, `@Get`/`@Post`, and
`@Body(DtoClass)`, you've already written most of what an OpenAPI document needs. This
post shows how `nextjs-nestapi` turns that into a live spec and a Swagger UI, with no
separate documentation step to keep in sync.

{/* truncate */}

## Install the two extra pieces

```bash
npm install class-validator-jsonschema swagger-ui-dist
```

- `class-validator-jsonschema` turns your `class-validator` DTOs into JSON Schema.
- `swagger-ui-dist` ships the actual Swagger UI assets — served straight from your own
  `node_modules`, not vendored in the library and not pulled from a CDN.

## Optional: annotate for nicer docs

Routes are documented either way; `@ApiTags`/`@ApiOperation`/`@ApiResponse` just add
human-readable metadata:

```ts
import {Controller, Post, Body, ApiTags, ApiOperation, ApiResponse} from "nextjs-nestapi";

@ApiTags("Hello")
@Controller("/hello")
export class HelloController {
  @ApiOperation({summary: "Create a hello"})
  @ApiResponse({status: 200, description: "Created"})
  @Post("")
  create(@Body(CreateHelloDto) dto: CreateHelloDto) {
    return {created: dto};
  }
}
```

## Expose the document and the UI

```ts title="app/api/openapi.json/route.ts"
import {NextResponse} from "next/server";
import {generateOpenApiDocument} from "nextjs-nestapi";
import "@/app"; // populates the decorator registries

export async function GET() {
  return NextResponse.json(generateOpenApiDocument({title: "My API"}));
}
```

```ts title="app/api-docs/[[...file]]/route.ts"
import {createSwaggerUiHandler} from "nextjs-nestapi";

export const GET = createSwaggerUiHandler({openApiUrl: "/api/openapi.json"});
```

## The one config flag you need

`createSwaggerUiHandler` resolves `swagger-ui-dist` with a dynamic `import()` at request
time. Turbopack and webpack both try to bundle that call by default and fail — mark the
package external and it resolves correctly:

```ts title="next.config.ts"
const nextConfig: NextConfig = {
  serverExternalPackages: ["swagger-ui-dist"],
};
```

Skip this and the Swagger UI's static assets (`swagger-ui-bundle.js`, `swagger-ui.css`)
will 404.

That's it — visit `/api-docs` for the UI, `/api/openapi.json` for the raw spec. Full
reference: [OpenAPI / Swagger docs](/openapi-swagger).
