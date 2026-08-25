---
title: OpenAPI / Swagger docs
description: Auto-generate an OpenAPI document and serve Swagger UI from your own node_modules.
slug: /openapi-swagger
---

# OpenAPI / Swagger docs

Add `class-validator-jsonschema` (turns your DTOs into JSON Schema) and `swagger-ui-dist`
(the Swagger UI assets, served from your own `node_modules` — nothing vendored in this
package, nothing fetched from a CDN):

```bash
npm install class-validator-jsonschema swagger-ui-dist
```

## Annotate controllers (optional)

Routes are documented either way; these decorators add human-readable metadata:

```ts
import {Controller, Get, Post, Body, ApiTags, ApiOperation, ApiResponse} from "nextjs-nestapi";

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

## Expose the OpenAPI document

This route must import your `app.ts` (or your controllers directly) so the decorator
registries are populated before the document is built:

```ts title="app/api/openapi.json/route.ts"
import {NextResponse} from "next/server";
import {generateOpenApiDocument} from "nextjs-nestapi";
import "@/app";

export async function GET() {
  return NextResponse.json(
    generateOpenApiDocument({title: "My API", version: "1.0.0"})
  );
}
```

### `GenerateOpenApiDocumentOptions`

| Option | Type | Default |
| --- | --- | --- |
| `title` | `string` | `"API"` |
| `version` | `string` | `"1.0.0"` |
| `description` | `string` | — |
| `servers` | `{ url: string; description?: string }[]` | `[{ url: basePath }]` |
| `basePath` | `string` | `"/api"` |

## Serve the Swagger UI

```ts title="app/api-docs/[[...file]]/route.ts"
import {createSwaggerUiHandler} from "nextjs-nestapi";

export const GET = createSwaggerUiHandler({openApiUrl: "/api/openapi.json"});
```

### `SwaggerUiOptions`

| Option | Type | Default |
| --- | --- | --- |
| `openApiUrl` | `string` | `"/api/openapi.json"` |
| `title` | `string` | `"API Docs"` |

## Required: mark `swagger-ui-dist` external

`createSwaggerUiHandler` resolves `swagger-ui-dist` with a dynamic `import()` at request
time, which Turbopack and webpack both refuse to bundle correctly unless the package is
explicitly marked external:

```ts title="next.config.ts"
const nextConfig: NextConfig = {
  serverExternalPackages: ["swagger-ui-dist"],
};
```

Without this, requests to the Swagger UI's static assets (`swagger-ui-bundle.js`,
`swagger-ui.css`, ...) will fail.

Visit `/api-docs` for the UI, `/api/openapi.json` for the raw document.

:::tip
Scaffold both routes automatically with `npx nextjs-nestapi init --swagger` or
`npx nextjs-nestapi new my-app --swagger` — see the [CLI](/cli).
:::
