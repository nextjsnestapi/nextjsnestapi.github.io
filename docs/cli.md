---
title: CLI
description: Scaffold new projects and features with the nextjs-nestapi CLI.
slug: /cli
---

# CLI

```bash
# Brand new Next.js app, already wired with nextjs-nestapi
npx nextjs-nestapi new my-app
npx nextjs-nestapi new my-app --swagger   # also wires /api/openapi.json + /api-docs

# Wire an existing Next.js App Router project instead
npx nextjs-nestapi init
npx nextjs-nestapi init --swagger

# Scaffold a feature controller + DTO, auto-registered in app.ts
npx nextjs-nestapi generate controller student
npx nextjs-nestapi g controller student   # alias
```

## Commands

| Command | What it does |
| --- | --- |
| `new <name> [--swagger]` | Runs `create-next-app`, then wires `app.ts` + the catch-all route, patches `tsconfig.json`, and installs dependencies. |
| `init [--swagger] [--force]` | Wires `app.ts` + the catch-all route into the **current** App Router project (`app/` or `src/app/`) and patches `tsconfig.json`. |
| `generate controller <name>` / `g controller <name>` | Scaffolds `src/features/<name>/{controller.ts,dto.ts}` and registers the controller in `app.ts`. |

`init`/`new`/`generate` never overwrite an existing file unless you pass `--force`. Add
`--swagger` to also scaffold `/api/openapi.json` and `/api-docs` (see
[OpenAPI / Swagger docs](/openapi-swagger)).

## What `init` generates

```
src/app.ts
src/app/api/[[...route]]/route.ts
```

Plus, with `--swagger`:

```
src/app/api/openapi.json/route.ts
src/app/api-docs/[[...file]]/route.ts
```

It also patches `tsconfig.json`, adding `experimentalDecorators` and
`emitDecoratorMetadata` under `compilerOptions` if they aren't already set — without
touching the rest of the file's formatting or comments.

## What `generate controller <name>` generates

```
src/features/<name>/controller.ts
src/features/<name>/dto.ts
```

If `src/app.ts` exists and has a `controllers: [...]` array, the new controller's import
and registration are added automatically. If the file's shape isn't recognized, the CLI
leaves it untouched and tells you what to add by hand — it never guesses its way into
a broken file.
