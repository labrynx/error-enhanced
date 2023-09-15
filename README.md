# Enhanced Error Handling with `ts-mixer`

## Table of Contents 
1. [Overview](#overview)
2. [Installation](#installation)
3. [Features](#features)
4. [Classes](#classes)
5. [Helpers](#helpers)
6. [Example Usage](#example-usage)
7. [Full Example](#full-example)
8. [Troubleshooting](#troubleshooting) 
9. [Contributing](#contributing) 
10. [Changelog](#changelog) 

## Overview

This TypeScript library supercharges error management in Node.js applications, offering an out-of-the-box, customizable solution that goes beyond stack traces. By leveraging the power of [ts-mixer](https://github.com/tannerntannern/ts-mixer), the library introduces a modular architecture that allows you to enrich error objects with a plethora of contextual information and metadata. Whether you're capturing system-level details, user interactions, or HTTP statuses, this library provides a holistic view of errors, facilitating debugging, logging, and ultimately, enhancing the robustness of your application.

**Quick Example**:
```typescript
const error = new ErrorEnhanced();
error.setErrorCode(400).setSeverity(ErrorEnhanced.SeverityLevel.HIGH);
```

---

## Installation

Before installing this library, make sure you have `Node.js` and `npm` installed on your machine.

To install the library, run the following command:

```bash
npm install error-enhanced
```

### Peer Dependencies

This library is designed to be used with `ts-mixer`. If you haven't already installed it, you can add it by running:

```bash
npm install ts-mixer
```

For more details, visit tannerntannern's [ts-mixer](https://github.com/tannerntannern/ts-mixer) project.

---

## Features

- Enriches error objects with multiple layers of metadata, providing a comprehensive view for debugging and logging.
- Modular architecture allows customization to fit diverse error-handling needs.
- Validation methods to ensure data integrity.
- Unused properties filtering to optimize the error object.
- Multiple serialization formats for easy error object storage or sending to external services.

> **Note**: Each feature is discussed in detail in the [Classes](#classes) and [Helpers](#helpers) sections.

---

## Classes

### IdentifiersEnhancer

This class enriches errors with unique identifiers, error codes, and more.

#### Properties

- `_id`: Unique identifier (UUID) - Automatically generated
- `_errorCode`: Custom error code (Number)
- `_errorCodePrefix`: Prefix for error code (String)
- `_errorDescription`: Description for error code (String)
- `_timestamp`: Unix timestamp when the error was created (Number) - Automatically generated
- `_severity`: Severity level of the error (Enum)
- `_category`: Category to which the error belongs (Enum)

#### Methods

##### `setErrorCode(errorCode: number)`

Sets the custom error code. Validates if it's a number.

```typescript
const error = new ErrorEnhanced();
error.setErrorCode(400);
```

##### `setErrorCodePrefix(prefix: string)`

Sets the error code prefix. Validates if it's a string.

```typescript
error.setErrorCodePrefix("ERR");
```

##### `setErrorDescription(description: string)`

Sets the error description. Validates if it's a string.

```typescript
error.setErrorDescription("This is a description of an error");
```

##### `setSeverity(severity: SeverityLevel)`

Sets the severity level. Validates against the `SeverityLevel` enum.

```typescript
error.setSeverity(ErrorEnhanced.SeverityLevel.HIGH);
```

##### `setCategory(category: Category)`

Sets the error category. Validates against the `Category` enum.

```typescript
error.setCategory(ErrorEnhanced.Category.SYSTEM);
```

##### `getHash()`

Calculates a hash value for the error.

```typescript
const hash = error.getHash();
```

---

### SystemContextEnhancer

This class adds system-level context information to errors, such as the originating module, method, and various system details.

#### Properties

- `_module`: Module where the error originated (String)
- `_method`: Method where the error originated (String)
- `_environment`: Application environment (String)
- `_nodeVersion`: Node.js version (String)
- `_hostname`: System hostname (String)
- `_cpuArch`: CPU architecture (String)
- `_osType`: OS type (String)
- `_osRelease`: OS release version (String)
- `_systemUptime`: System uptime in seconds (Number)

#### Methods

##### `setModule(module: string)`

Sets the originating module name. Validates if it's a string.

```typescript
const error = new ErrorEnhanced();
error.setModule('myModule');
```

##### `setMethod(method: string)`

Sets the originating method name. Validates if it's a string.

```typescript
error.setMethod('myMethod');
```

##### `setEnvironment(environment: string)`

Sets the application environment. Validates if it's a string.

```typescript
error.setEnvironment('production');
```

### UserInfoEnhancer

This class adds user-related context information to errors.

#### Properties

- `_user`: User ID or username related to the error (String)
- `_sessionId`: User session ID (String)
- `_roles`: User roles or permissions (Array)
- `_authToken`: Authentication token (String)
- `_ipAddress`: IP Address (String)
- `_userAgent`: Browser and OS details (String)
- `_actionHistory`: Previous user actions (Array)

#### Methods

##### `setUser(user: string)`

Sets the user ID or username. Validates if it's a string.

```typescript
error.setUser('JohnDoe');
```

##### `setSessionId(sessionId: string)`

Sets the user session ID. Validates if it's a string.

```typescript
error.setSessionId('sess_12345');
```

##### `setRoles(roles: string[])`

Sets the user roles. Expects an array of strings.

```typescript
error.setRoles(['admin', 'user']);
```

##### `setAuthToken(token: string)`

Sets the authentication token. Validates if it's a string.

```typescript
error.setAuthToken('some-token');
```

### HttpStatusEnhancer

This class adds HTTP-specific context information to errors.

#### Properties

- `_httpStatusCode`: HTTP status code (Enum)
- `_url`: URL (String)
- `_httpMethod`: HTTP Method (Enum)
- `_requestHeaders`: Request headers (Object)
- `_responseHeaders`: Response headers (Object)
- `_queryParams`: Query parameters (Object)
- `_requestBody`: Request body (Any)
- `_responseBody`: Response body (Any)
- `_clientIp`: Client IP address (String)
- `_latency`: Latency in milliseconds (Number)

#### Methods

##### `setHttpStatusCode(code: HttpStatusCodes)`

Sets the HTTP status code. Validates against the `HttpStatusCodes` enum.

```typescript
error.setHttpStatusCode(ErrorEnhanced.HttpStatusCodes.FORBIDDEN);
```

##### `setUrl(url: string)`

Sets the URL. Validates if it's a valid URL.

```typescript
error.setUrl('https://example.com');
```

##### `setHttpMethod(method: HttpMethods)`

Sets the HTTP method. Validates against the `HttpMethods` enum.

```typescript
error.setHttpMethod(ErrorEnhanced.HttpMethods.GET);
```

##### `setRequestHeaders(headers: Object)`

Sets the request headers. Validates if keys are non-empty strings.

```typescript
error.setRequestHeaders({'Content-Type': 'application/json'});
```

##### `setResponseHeaders(headers: Object)`

Sets the response headers. Validates if keys are non-empty strings.

```typescript
error.setResponseHeaders({'Content-Type': 'application/json'});
```

---

## Helpers

### FilterHelper

- Utility to filter out unused properties.

- **Methods:**
  - `filterUnused()`: Removes all properties that are null, undefined, or empty.

### Serializers

- Utility to serialize the object into a JSON, CSV, XML and YAML string.

- **Methods:**
  - `toJSON()`: Serializes the object to a JSON string.
  - `toCSV()`: Serializes the object to a CSV string.
  - `toXML()`: Serializes the object to a XML string.
  - `toYAML()`: Serializes the object to a YAML string.

> Note: If used combined FilterHelper and Serializers it filters out properties that are null, undefined, or empty and serializes to a new object.

---

## Example Usage

Below is a step-by-step guide to create an enriched error object.

### Basic Example

Firstly, import the required modules and initialize the `ErrorEnhanced` class.

```typescript
import { ErrorEnhanced } from 'error-enhanced';

const error = new ErrorEnhanced();
```

### Setting Error Properties

You can set various properties to provide more context to the error.

```typescript
// Setting error code and its prefix
error.setErrorCode(123).setErrorCodePrefix('EE');

// Setting error severity and category
error.setSeverity(ErrorEnhanced.SeverityLevel.HIGH)
     .setCategory(ErrorEnhanced.Category.SYSTEM);
```

### Adding System Context

Add system-level details for more insightful debugging.

```typescript
error.setModule('AuthenticationModule')
     .setMethod('validateUser');
```

### Adding HTTP Context

If the error is related to an HTTP request, you can attach relevant details.

```typescript
error.setHttpStatusCode(404)
     .setUrl('https://api.example.com/user')
     .setHttpMethod('GET');
```

### Serialization

Finally, serialize the enriched error object into a JSON string.

```typescript
const serializedError = error.filterUnused().toJson();
console.log(serializedError);
```

This will output a JSON string containing all the set properties, filtered to remove any that are unused.

The resulting JSON can then be used for logging, debugging, or reporting purposes.

```json
{
  "_errorCodePrefix": "EE",
  "_id": "51cbe61a-fc93-4413-b7cd-3b65f93c0cd4",
  "_errorCode": 123,
  "_timestamp": 1694770264690,
  "_severity": "high",
  "_category": "network",
  "_url": "https://api.example.com/user",
  "_httpMethod": "GET",
  "_latency": 150,
  "_httpStatusCode": 404,
  "_module": "AuthenticationModule",
  "_method": "validateUser",
  "_environment": "production",
  "_nodeVersion": "v14.17.3",
  "_hostname": "prod-server-01",
  "_cpuArch": "x64",
  "_osType": "Linux",
  "_osRelease": "Ubuntu 20.04",
  "_systemUptime": 745632,
  "_user": "john_doe",
  "_sessionId": "sess_876ASDGH123",
  "_authToken": "jh12GHD83kSHD92k",
  "_ipAddress": "192.168.1.2",
  "_userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.3",
  "name": "UserNotAuthorizedError",
  "message": "User is not authorized"
}
```

## Full example

And here is the full example.

```typescript
import { Mixin } from 'ts-mixer';

import {
  IdentifiersEnhancer,
  HttpStatusEnhancer,
  SystemContextEnhancer,
  JsonSerializer,
  FilterHelper,
  UserInfoEnhancer,
} from './tools';

class ErrorEnhanced extends Mixin(
  Error, // <= Must!
  IdentifiersEnhancer,
  HttpStatusEnhancer,
  SystemContextEnhancer,
  UserInfoEnhancer,
  FilterHelper,
  JsonSerializer,
) {
  constructor() {
    super();
    Object.setPrototypeOf(this, ErrorEnhanced.prototype);
  }
}

const error = new ErrorEnhanced();

// Its a normal error, give it a name and error message
error.name = 'UserNotAuthorizedError';
error.message = 'User is not authorized';

// Setting error code and its prefix
error.setErrorCode(123).setErrorCodePrefix('EE');

// Setting error severity and category
error
  .setSeverity(ErrorEnhanced.SeverityLevel.HIGH)
  .setCategory(ErrorEnhanced.Category.NETWORK);

// Add some context
error.setModule('AuthenticationModule').setMethod('validateUser');
error
  .setHttpStatusCode(404)
  .setUrl('https://api.example.com/user')
  .setHttpMethod(ErrorEnhanced.HttpMethods.GET);

const serializedErrorJSON = error.filterUnused().toJSON();
const serializedErrorCSV = error.filterUnused().toCSV();
const serializedErrorXML = error.filterUnused().toXML();
const serializedErrorYAML = error.filterUnused().toYAML();
```

This will create an `ErrorEnhanced` object, set some properties, filter out the unused ones, and serialize it to a any string.

---

## Troubleshooting

---

## Contributing

--- 

## Changelog
