# HttpStatusEnhancer

### Overview

The `HttpStatusEnhancer` class serves to enrich error objects with metadata specific to HTTP. This enhancement can be instrumental for debugging, monitoring, and auditing HTTP-related issues within applications.

### Properties

| Property          | Description                                                     |
| ----------------- | --------------------------------------------------------------- |
| `httpStatusCode`  | HTTP Status Code, defaults to `-1`.                              |
| `url`             | URL where the error occurred, defaults to an empty string.       |
| `httpMethod`      | HTTP Method (GET, POST, etc.), defaults to an empty string.      |
| `requestHeaders`  | HTTP request headers, defaults to an empty object.               |
| `responseHeaders` | HTTP response headers, defaults to an empty object.              |
| `queryParams`     | Query parameters in the URL, defaults to an empty object.        |
| `requestBody`     | Body of the HTTP request, defaults to `null`.                    |
| `responseBody`    | Body of the HTTP response, defaults to `null`.                   |
| `clientIp`        | Client's IP address, defaults to an empty string.                |
| `latency`         | Latency in milliseconds, defaults to `-1`.                       |

### Methods

#### Public Methods

##### `setHttpStatusCode(httpStatusCode: number): this`

Sets and validates the HTTP status code against a list of known status codes.

**Usage Example**:

```typescript
const httpStatus = new HttpStatusEnhancer();
httpStatus.setHttpStatusCode(200);
```

##### `setUrl(url: string): this`

Sets the URL where the error occurred and performs format validation.

**Usage Example**:

```typescript
httpStatus.setUrl("https://example.com");
```

##### `setHttpMethod(httpMethod: string): this`

Sets the HTTP method for the request and validates it against known methods.

**Usage Example**:

```typescript
httpStatus.setHttpMethod("GET");
```

##### `setRequestHeaders(headers: { [key: string]: any }): this`

Sets the headers for the HTTP request.

**Usage Example**:

```typescript
httpStatus.setRequestHeaders({ "Content-Type": "application/json" });
```

##### `setResponseHeaders(headers: { [key: string]: any }): this`

Sets the headers for the HTTP response.

**Usage Example**:

```typescript
httpStatus.setResponseHeaders({ "Content-Type": "application/json" });
```

##### `setQueryParams(params: { [key: string]: any }): this`

Sets the query parameters for the URL.

**Usage Example**:

```typescript
httpStatus.setQueryParams({ "page": 1, "limit": 10 });
```

##### `setRequestBody(body: any): this`

Sets the body of the HTTP request.

**Usage Example**:

```typescript
httpStatus.setRequestBody({ "key": "value" });
```

##### `setResponseBody(body: any): this`

Sets the body of the HTTP response.

**Usage Example**:

```typescript
httpStatus.setResponseBody({ "key": "value" });
```

##### `setClientIp(ip: string): this`

Sets the IP address of the client.

**Usage Example**:

```typescript
httpStatus.setClientIp("192.168.0.1");
```

##### `setLatency(latency: number): this`

Sets the request latency in milliseconds.

**Usage Example**:

```typescript
httpStatus.setLatency(120);
```

### Common Use-Cases

* **Debugging**: Provides enriched error objects with HTTP-specific metadata useful for pinpointing issues.
* **Monitoring**: Enables more effective monitoring of HTTP-related events in the application.
* **Auditing**: Useful for detailed logging of HTTP interactions for compliance or analysis purposes.
