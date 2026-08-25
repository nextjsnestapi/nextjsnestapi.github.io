---
title: API reference
description: Every decorator, function, and type exported by nextjs-nestapi.
slug: /api-reference
---

# API reference

## Decorators

| Decorator | Kind | Description |
| --- | --- | --- |
| `@Controller(prefix?)` | class | Registers the controller and its route prefix. |
| `@Get`/`@Post`/`@Put`/`@Patch`/`@Delete`/`@Head`/`@Options`(path?) | method | Bind a method to an HTTP verb + path. |
| `@All(path?)` | method | Bind a method to every HTTP verb. |
| `@Use(middleware)` | method | Attach middleware to a single route. |
| `@Body(DtoClass)` | parameter | Parse + validate the JSON body, inject the DTO instance. |
| `@AuthGuard(roles?)` | method | Require an authenticated (and optionally role-matching) user; 401/403 otherwise. See [Authentication guards](/core-concepts/auth-guard). |
| `@CurrentUser()` | parameter | Inject the resolved auth user (or `null`); never blocks on its own. |
| `@ApiTags(...tags)` | class | Group a controller's routes under a tag in the OpenAPI doc. |
| `@ApiOperation({ summary?, description? })` | method | Human-readable summary/description for a route. |
| `@ApiResponse({ status, description, type?, isArray? })` | method | Document a possible response (repeatable). |

## Functions

| Export | Signature | Description |
| --- | --- | --- |
| `createApplication` | `(options: ApplicationOptions) => NextJsApp` | Builds the router that dispatches to your registered controllers. See [Application configuration](/core-concepts/application-configuration). |
| `configureAuth` | `(options: { resolveUser }) => void` | Registers the resolver `@AuthGuard`/`@CurrentUser` use to turn a request into a user. Call once, before any request is handled. See [Authentication guards](/core-concepts/auth-guard). |
| `generateOpenApiDocument` | `(options?: GenerateOpenApiDocumentOptions) => object` | Builds an OpenAPI 3.0 document from your decorator metadata. See [OpenAPI / Swagger docs](/openapi-swagger). |
| `createSwaggerUiHandler` | `(options?: SwaggerUiOptions) => RouteHandler` | Returns a `GET` handler that serves the Swagger UI + its static assets. |
| `registerController` | `(app: NextJsApp, ControllerClass) => void` | Lower-level primitive `createApplication` uses internally. |

## Types

`RouteContext`, `NextJsApp`, `Middleware`, `RouteHandler`, `ApplicationOptions`,
`RouteDefinition`, `RouteMiddleware`, `ApiOperationMeta`, `ApiResponseMeta`,
`GenerateOpenApiDocumentOptions`, `SwaggerUiOptions`, `ResolveUser`, `ConfigureAuthOptions`
are all exported for consumers who want to type their own helpers around them.

## `Response` helper

See [Handler return values](/core-concepts/handler-return-values#the-response-helper) for
the full list of `Response.*` static methods.
