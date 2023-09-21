# HttpStatusCodes

_File:_ [_`http-status-codes.enum.ts`_](../../src/lib/enums/http-status-codes.enum.ts)

### Overview

The `HttpStatusCodes` enum provides a comprehensive and type-safe list of HTTP status codes. This enum categorizes HTTP status codes into different response classes, such as Informational, Success, Redirection, Client Errors, and Server Errors.

### Features

* **Comprehensive List**: Includes a broad range of HTTP status codes.
* **Type-Safety**: Ensures the use of standardized HTTP status codes.

### Usage Example

```typescript
const statusCode = HttpStatusCodes.NOT_FOUND;
```

### Enum Categories

* **1XX**: Informational Responses
* **2XX**: Successful Responses
* **3XX**: Redirection Messages
* **4XX**: Client Errors
* **5XX**: Server Errors

### Enum Members Key-Value Table

Given the large number of enum members, here's a subset for quick reference:

| Key                     | Value | Description                                     |
| ----------------------- | ----- | ----------------------------------------------- |
| `OK`                    | 200   | Standard response for successful HTTP requests. |
| `NOT_FOUND`             | 404   | Resource not found.                             |
| `INTERNAL_SERVER_ERROR` | 500   | Generic error, no specific message.             |

_Note: This table is a subset; for a complete list refer to the source code._

### API Documentation

For a complete understanding of each status code, refer to the following:

* [RFC 9110 Section 15](https://www.rfc-editor.org/rfc/rfc9110#section-15)
* [Wikipedia: List of HTTP Status Codes](https://en.wikipedia.org/wiki/List\_of\_HTTP\_status\_codes)
* [REST API Tutorial: HTTP Status Codes](https://www.restapitutorial.com/httpstatuscodes.html)

***
