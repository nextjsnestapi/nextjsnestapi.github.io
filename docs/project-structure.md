---
title: Project structure
description: How the nextjs-nestapi package itself is organized.
slug: /project-structure
---

# Project structure

The `nextjs-nestapi` package source:

```
src/
├── index.ts                 # public entry point (barrel export)
├── cli.ts                   # CLI entry point (bin: nextjs-nestapi)
├── cli/
│   ├── commands/             # init, generate, new
│   ├── fs-utils.ts           # project-layout detection, file writers
│   └── templates.ts          # scaffolded file contents
├── decorators/                # @Controller, @Get/@Post/…, @Body, @Use, @Api*
├── openapi/                   # generateOpenApiDocument, createSwaggerUiHandler
└── utils/                     # createApplication, registerController, RouteContext, Response
```

## A typical consumer project

This is what `npx nextjs-nestapi init --swagger` produces, and roughly what
[the example project](/example-project) looks like:

```
src/
├── app.ts                              # createApplication({ controllers: [...] })
├── app/
│   ├── api/
│   │   ├── [[...route]]/route.ts        # dispatches every request to app.handle()
│   │   └── openapi.json/route.ts        # generateOpenApiDocument()
│   └── api-docs/
│       └── [[...file]]/route.ts         # createSwaggerUiHandler()
└── features/
    └── hello/
        ├── controller.ts                # @Controller("/hello")
        └── dto.ts                       # class-validator DTOs
```
