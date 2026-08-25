---
slug: cli-scaffolding
title: Scaffold a new project in seconds with the CLI
authors: [rejaul]
tags: [guide, cli]
description: nextjs-nestapi new, init, and generate controller — bootstrap a project or add a feature without hand-writing boilerplate.
---

Wiring up `app.ts`, the catch-all route, and `tsconfig.json`'s decorator flags by hand is
only a few minutes of work — but it's a few minutes you'll repeat on every new project or
feature. The `nextjs-nestapi` CLI does it for you.

{/* truncate */}

## Starting a brand new project

```bash
npx nextjs-nestapi new my-app
```

This runs `create-next-app` under the hood, then:

- writes `src/app.ts` with an empty `createApplication({ controllers: [] })`
- writes `src/app/api/[[...route]]/route.ts`, the catch-all dispatcher
- patches `tsconfig.json` with `experimentalDecorators`/`emitDecoratorMetadata`
- installs `nextjs-nestapi`, `class-validator`, and `class-transformer`

Add `--swagger` to also scaffold `/api/openapi.json` and `/api-docs` (see the
[OpenAPI / Swagger docs](/openapi-swagger) post).

## Wiring an existing project

Already have a Next.js App Router project? `init` does the same wiring without the
`create-next-app` step:

```bash
npx nextjs-nestapi init --swagger
```

It never overwrites a file that already exists unless you pass `--force`, and if it can't
patch `tsconfig.json` automatically (say, because `compilerOptions` isn't where it
expects), it tells you exactly what to add by hand instead of guessing.

## Adding a feature

```bash
npx nextjs-nestapi generate controller student
# or the short alias:
npx nextjs-nestapi g controller student
```

This scaffolds:

```
src/features/student/controller.ts
src/features/student/dto.ts
```

and, if `src/app.ts` has a recognizable `controllers: [...]` array, registers
`StudentController` there automatically — import added, array updated. If the shape of
`app.ts` isn't recognized, the command leaves it untouched and prints what to add
yourself, rather than risk corrupting a file it can't parse confidently.

Full reference: [CLI](/cli).
