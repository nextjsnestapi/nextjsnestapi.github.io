---
title: Quick start
description: Define a controller, register it, and mount it behind a single catch-all route.
slug: /quick-start
---

# Quick start

## 1. Define a DTO and a controller

```ts title="src/features/hello/dto.ts"
import {IsInt, IsString, Min} from "class-validator";

export class CreateHelloDto {
  @IsString()
  name!: string;

  @IsInt()
  @Min(0)
  age!: number;
}
```

```ts title="src/features/hello/controller.ts"
import {Controller, Get, Post, Body, type RouteContext} from "nextjs-nestapi";
import {CreateHelloDto} from "./dto";

@Controller("/hello")
export class HelloController {
  @Get("")
  list() {
    return {message: "hello world"};
  }

  @Get("/:id")
  getOne(context: RouteContext) {
    return {id: context.params.id};
  }

  @Post("")
  create(@Body(CreateHelloDto) dto: CreateHelloDto) {
    return {created: dto};
  }
}
```

## 2. Register the controller

```ts title="src/app.ts"
import {createApplication} from "nextjs-nestapi";
import {HelloController} from "./features/hello/controller";

export const app = createApplication({
  controllers: [HelloController],
  basePath: "/api", // default
});
```

## 3. Mount it behind a single catch-all route

```ts title="src/app/api/[[...route]]/route.ts"
import {NextRequest} from "next/server";
import {app} from "@/app";

async function handleRequest(request: NextRequest) {
  return app.handle(request);
}

export const GET = handleRequest;
export const POST = handleRequest;
export const PUT = handleRequest;
export const PATCH = handleRequest;
export const DELETE = handleRequest;
export const OPTIONS = handleRequest;
export const HEAD = handleRequest;
```

`@Controller("/hello")` + `@Get("/:id")` resolves against `${basePath}/hello/:id` — here,
`GET /api/hello/:id`.

:::tip
Steps 2–3 are exactly what [`npx nextjs-nestapi init`](/cli) generates for you.
:::

## Next steps

- [Controllers & routing](/core-concepts/controllers-and-routing) — the full decorator surface
- [DTO validation](/core-concepts/dto-validation) — validation error shape and file uploads
- [OpenAPI / Swagger docs](/openapi-swagger) — auto-generate API documentation
