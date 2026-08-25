---
title: Installation
description: Install nextjs-nestapi and its peer dependencies, and enable decorator support in tsconfig.json.
slug: /installation
---

# Installation

```bash
npm install nextjs-nestapi class-validator class-transformer
```

`class-validator` and `class-transformer` are peer dependencies — [`@Body()`](/core-concepts/dto-validation)
uses them for DTO validation, so they must be installed in your project alongside this
package.

## Enable decorators

`tsconfig.json` needs decorator support enabled:

```jsonc title="tsconfig.json"
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

## Starting fresh?

If you don't have a Next.js project yet, use the [CLI](/cli) to create one already wired
with `nextjs-nestapi`:

```bash
npx nextjs-nestapi new my-app
```

This runs `create-next-app`, wires `app.ts` + the catch-all API route, patches
`tsconfig.json`, and installs everything above for you.
