# HttpStatus

_File:_ [_`http-status.interface.ts`_](../../src/lib/interfaces/http-status.interface.ts)

### Introduction

The `HttpStatus` interface in `error-enhanced` focuses on encapsulating HTTP-specific information related to the error. This includes the HTTP status code, URL, and HTTP method, among other properties. The interface allows for a detailed understanding of the error in the context of an HTTP request/response cycle.

### Properties

| Property         | Type     | Description                                                          |
| ---------------- | -------- | -------------------------------------------------------------------- |
| `httpStatusCode` | `number` | A read-only HTTP status code that signifies the nature of the error. |
| `url`            | `string` | A read-only URL where the error occurred.                            |
| `httpMethod`     | `string` | A read-only HTTP method (GET, POST, PUT, etc.) related to the error. |

### Methods

| Method                                                | Return Type | Description                                                   |
| ----------------------------------------------------- | ----------- | ------------------------------------------------------------- |
| `setHttpStatusCode(httpStatusCode: number)`           | `this`      | Sets the HTTP status code. Allows for method chaining.        |
| `setUrl(url: string)`                                 | `this`      | Sets the URL. Allows for method chaining.                     |
| `setHttpMethod(httpMethod: string)`                   | `this`      | Sets the HTTP method. Allows for method chaining.             |
| `setRequestHeaders(headers: { [key: string]: any })`  | `this`      | Sets request headers. Allows for method chaining.             |
| `setResponseHeaders(headers: { [key: string]: any })` | `this`      | Sets response headers. Allows for method chaining.            |
| `setQueryParams(params: { [key: string]: any })`      | `this`      | Sets query parameters. Allows for method chaining.            |
| `setRequestBody(body: any)`                           | `this`      | Sets the request body. Allows for method chaining.            |
| `setResponseBody(body: any)`                          | `this`      | Sets the response body. Allows for method chaining.           |
| `setClientIp(ip: string)`                             | `this`      | Sets the client IP address. Allows for method chaining.       |
| `setLatency(latency: number)`                         | `this`      | Sets the latency in milliseconds. Allows for method chaining. |

### Example Usage

```typescript
const error = new ErrorEnhanced([
  new HttpStatusEnhancer()
]);

// Setting properties
error
  .setHttpStatusCode(404)
  .setUrl('https://api.example.com/items')
  .setHttpMethod('GET');

// Accessing properties
console.log(error.httpStatusCode);  // 404
console.log(error.url);  // 'https://api.example.com/items'
console.log(error.httpMethod);  // 'GET'
```

### Best Practices

* Prefer to set all HTTP-related properties as soon as you catch the error, so you capture the most accurate state of the request/response cycle.
* Use this interface in conjunction with others like `Identifiers` for a comprehensive error object.

### Conclusion

The `HttpStatus` interface provides a robust way to capture HTTP-specific information related to errors, making it easier to debug and log errors that occur during API calls or web requests.

***
