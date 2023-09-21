# HttpStatusEnhancer

_File:_ [_`http-status.enhancer.ts`_](../../src/lib/enhancers/http-status.enhancer.ts)

### Overview

The `HttpStatusEnhancer` class is designed to augment error objects with HTTP-specific metadata. This can be valuable for debugging, monitoring, and auditing HTTP-related issues within applications.

### Properties

| Property          | Description                                                     |
| ----------------- | --------------------------------------------------------------- |
| `httpStatusCode`  | HTTP Status Code, default is `-1`.                              |
| `url`             | URL where the error occurred, default is an empty string.       |
| `httpMethod`      | HTTP Method used (GET, POST, etc.), default is an empty string. |
| `requestHeaders`  | HTTP request headers, default is an empty object.               |
| `responseHeaders` | HTTP response headers, default is an empty object.              |
| `queryParams`     | Query parameters in the URL, default is an empty object.        |
| `requestBody`     | Body of the HTTP request, default is `null`.                    |
| `responseBody`    | Body of the HTTP response, default is `null`.                   |
| `clientIp`        | Client's IP address, default is an empty string.                |
| `latency`         | Latency in milliseconds, default is `-1`.                       |

### Methods

#### `setHttpStatusCode(httpStatusCode: number)`

Sets the HTTP status code and validates it against known status codes.

**Usage Example**:

```typescript
const httpStatus = new HttpStatusEnhancer();
httpStatus.setHttpStatusCode(200);
```

#### `setUrl(url: string)`

Sets the URL where the error occurred and validates its format.

**Usage Example**:

```typescript
httpStatus.setUrl("https://example.com");
```

#### `setHttpMethod(httpMethod: string)`

Sets the HTTP method used in the request and validates it against known methods.

**Usage Example**:

```typescript
httpStatus.setHttpMethod("GET");
```

#### `setRequestHeaders(headers: { [key: string]: any })`

Sets the request headers.

**Usage Example**:

```typescript
httpStatus.setRequestHeaders({ "Content-Type": "application/json" });
```

#### `setResponseHeaders(headers: { [key: string]: any })`

Sets the response headers.

**Usage Example**:

```typescript
httpStatus.setResponseHeaders({ "Content-Type": "application/json" });
```

#### `setQueryParams(params: { [key: string]: any })`

Sets the query parameters.

**Usage Example**:

```typescript
httpStatus.setQueryParams({ "page": 1, "limit": 10 });
```

#### `setRequestBody(body: any)`

Sets the body of the HTTP request.

**Usage Example**:

```typescript
httpStatus.setRequestBody({ "key": "value" });
```

#### `setResponseBody(body: any)`

Sets the body of the HTTP response.

**Usage Example**:

```typescript
httpStatus.setResponseBody({ "key": "value" });
```

#### `setClientIp(ip: string)`

Sets the client's IP address.

**Usage Example**:

```typescript
httpStatus.setClientIp("192.168.0.1");
```

#### `setLatency(latency: number)`

Sets the latency of the request in milliseconds.

**Usage Example**:

```typescript
httpStatus.setLatency(120);
```

***
