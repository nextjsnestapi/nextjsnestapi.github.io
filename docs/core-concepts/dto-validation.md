---
title: DTO validation
description: Validate request bodies with @Body(DtoClass) and class-validator.
slug: /core-concepts/dto-validation
---

# DTO validation

`@Body(DtoClass)` parses the JSON request body, runs it through `class-validator`, and
injects the validated + transformed instance as the argument:

```ts
import {Body} from "nextjs-nestapi";
import {CreateHelloDto} from "./dto";

@Post("")
create(@Body(CreateHelloDto) dto: CreateHelloDto) {
  return {created: dto};
}
```

A DTO is a plain class annotated with `class-validator` decorators:

```ts
import {IsInt, IsString, Min} from "class-validator";

export class CreateHelloDto {
  @IsString()
  name!: string;

  @IsInt()
  @Min(0)
  age!: number;
}
```

## Validation failures

On validation failure, the route short-circuits and returns a structured error payload
(HTTP 400) without your handler running:

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [{"field": "age", "message": "age must not be less than 0"}]
}
```

## Server Action validation

A `@Body(DtoClass)`-decorated method doesn't only work behind the catch-all API route — the
exact same validation runs when you bind the controller method and export it as a
[Next.js Server Action](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations),
called directly with a plain object instead of a `RouteContext`. In other words, **action
validation** — validating the payload of a Server Action, not just a route request — works
out of the box with no extra setup:

```ts title="src/features/student/controller.ts"
@Controller("/students")
export class StudentController {
  @Post("")
  create(@Body(CreateStudentDto) dto: CreateStudentDto) {
    return this.service.create(dto);
  }
}

export const studentController = new StudentController();
```

```ts title="src/app/dashboard/actions.ts"
"use server";

import { studentController } from "@/features/student/controller";

export const createStudent = studentController.create.bind(studentController);
```

```ts title="Client component"
const result = await createStudent({ name: "Sam", age: -5 });

if (!result.success) {
  // same { success: false, message, errors } shape as a failed API-route call
  console.log(result.errors);
}
```

`@Body` tells the two call shapes apart automatically: when it receives a `RouteContext`
(has `request`/`params`/`query` and a `.json()` method) it reads the JSON body from the
request; otherwise it treats the argument itself as the raw payload. Bind the method with
`.bind(controllerInstance)` (not a bare reference) so `this` still resolves correctly inside
the handler when Next.js invokes it as a Server Action. No route registration, no
`createApplication` involvement — `class-validator` runs the same way either path is called.

## File uploads

`File`/`FileList` fields on the parsed body are preserved as-is — they bypass
`class-transformer`'s type coercion (which would otherwise fail trying to construct a
`File` instance from scratch) and are reattached to the validated instance untouched. DTOs
with file fields don't need any special configuration:

```ts
export class UploadAvatarDto {
  @IsString()
  caption!: string;

  avatar?: File;
}
```
