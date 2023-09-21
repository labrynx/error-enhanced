# HttpMethods

_File:_ [_`http-methods.enum.ts`_](../../src/lib/enums/http-methods.enum.ts)

### Overview

The `HttpMethods` enum provides a type-safe way to represent HTTP methods in your application. This enum is part of the `network-utils` library and offers a clear way to specify the HTTP methods being used in API requests.

### Features

* **Type-Safe HTTP Methods**: Ensures that only valid HTTP methods can be used, reducing errors and improving readability.

### Usage Example

```typescript
const method = HttpMethods.POST;
```

### Enum Members

| Key      | Value      | Description                                                                    |
| -------- | ---------- | ------------------------------------------------------------------------------ |
| `GET`    | `'get'`    | Used for read-only requests to retrieve resource representation.               |
| `POST`   | `'post'`   | Used to submit data to be processed to a specified resource.                   |
| `PATCH`  | `'patch'`  | Used to apply partial modifications to a resource.                             |
| `PUT`    | `'put'`    | Used to update or create a new resource with the data enclosed in the request. |
| `DELETE` | `'delete'` | Used to request the removal of a resource.                                     |

***
