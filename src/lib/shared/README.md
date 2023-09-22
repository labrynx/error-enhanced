# Shared Components: Types & Validators

## Overview

The `shared` folder contains reusable TypeScript types and Zod validators that are used across different parts of the library. These shared resources improve code maintainability and ensure that the library has a consistent type system and validation logic.

---

## Types

### `HttpBody`

Represents valid types for both HTTP request and response bodies. Acceptable types are string, object, array, ArrayBuffer, Blob, FormData, or null.

```typescript
export type HttpBody =
  | string
  | object
  | Array<any>
  | ArrayBuffer
  | Blob
  | FormData
  | null;
```

### `HttpHeaders`

Represents a single key-value pair for an HTTP header.

```typescript
export type HttpHeaders = {
  key: string;
  value: any;
};
```

### `JsonReplacer`

A function type used for customizing JSON stringification.

```typescript
export type JsonReplacer = (key: string, value: any) => any;
```

### `QueryParams`

Represents a single key-value pair for a query parameter in a URL.

```typescript
export type QueryParams = {
  key: string;
  value: any;
};
```

### `StackFrame`

Represents a single frame in a stack trace.

```typescript
export type StackFrame = {
  functionName: string;
  fileName: string;
  lineNumber: number;
  columnNumber: number;
  typeName: string;
};
```

---

## Validators

Validators are created using the Zod library and are used to enforce type safety and validate incoming data.

### `ValidCategory`

Validator for `Category` Enum.

```typescript
export const ValidCategory = z.nativeEnum(Category);
```

### `ValidHttpMethods`

Validator for `HttpMethods` Enum.

```typescript
export const ValidHttpMethods = z.nativeEnum(HttpMethods);
```

### `ValidHttpStatusCodes`

Validator for `HttpStatusCodes` Enum.

```typescript
export const ValidHttpStatusCodes = z.nativeEnum(HttpStatusCodes);
```

### `ValidIP`

Validates that a string is a proper IP address.

```typescript
export const ValidIP = z.string().ip();
```

### `ValidKeyedObject`

Validates that an object's keys are all non-empty strings.

```typescript
export const ValidKeyedObject = z
  .record(z.any())
  .refine(
    obj => Object.keys(obj).every(key => ValidString.safeParse(key).success),
    { message: 'All keys must be valid non-empty strings' },
  );
```

### `ValidNumber`

Validates that a number is an integer and greater than 0.

```typescript
export const ValidNumber = z.number().int().gt(0);
```

### `ValidSeverity`

Validator for `Severity` Enum.

```typescript
export const ValidSeverity = z.nativeEnum(Severity);
```

### `ValidStringWithEmpty`

Validates a string, allowing it to be empty.

```typescript
export const ValidStringWithEmpty = z.string();
```

### `ValidString`

Validates that a string is not empty.

```typescript
export const ValidString = z.string().nonempty();
```

### `ValidURL`

Validates that a string is a proper URL.

```typescript
export const ValidURL = z.string().url();
```

---

These shared components enable better code reusability and help maintain a clean and consistent codebase.
