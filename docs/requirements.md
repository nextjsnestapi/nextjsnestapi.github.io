---
title: Requirements
description: Peer dependencies and when each one is actually needed.
slug: /requirements
---

# Requirements

| Package | Role |
| --- | --- |
| `next` | Peer dependency — App Router only. |
| `react` | Peer dependency (matches Next.js's own requirement). |
| `class-validator`, `class-transformer` | Required for [`@Body()`](/core-concepts/dto-validation) DTO validation. |
| `class-validator-jsonschema` | Required only if you use [`generateOpenApiDocument()`](/openapi-swagger). |
| `swagger-ui-dist` | Required only if you use [`createSwaggerUiHandler()`](/openapi-swagger). |

Every dependency beyond `next`/`react` is an **optional** peer dependency — install only
the ones the features you use actually need. `npm install nextjs-nestapi` alone will not
pull any of them in for you.
