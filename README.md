[![Node.js CI/CD](https://github.com/labrynx/error-enhanced/actions/workflows/nodejs.yml/badge.svg?branch=main)](https://github.com/labrynx/error-enhanced/actions/workflows/nodejs.yml)

<a name="top"></a>
# `error-enhanced` - Enhanced Error Handling

## Table of Contents 
[Overview](#overview) | [Installation](#installation) | [Features](#features) | [Enhancers](#enhancers) | [Utilities](#utilities) | [Example Usage](#example-usage) | [Full Example](#full-example) | [Contributing](#contributing) | [Changelog](#changelog) 

### Enhancers

[IdentifiersEnhancer](#identifiersenhancer) | [SystemContextEnhancer](#systemcontextenhancer) | [UserInfoEnhancer](#userinfoenhancer) | [HttpStatusEnhancer](#httpstatusenhancer) | [ErrorAnalysisEnhancer](#erroranalysisenhancer)

### Utilities

[FilterUtility](#filterutility) | [SerializersUtility](#serializersutility)

## Overview

error-enhanced is a TypeScript library that enhances error handling in Node.js applications. It offers an out-of-the-box, customizable solution that goes beyond stack traces. 

The library introduces a modular architecture that allows enriching error objects with plenty of contextual information and metadata. Whether you are capturing system-level details, user interactions, or HTTP statuses, this library provides a holistic view of errors, facilitating debugging, logging, and ultimately, improving the robustness of your application.

**Quick Example**:
```typescript
const error = new ErrorEnhanced([new IdentifiersEnhanced()]);
error.setErrorCode(400).setSeverity(ErrorEnhanced.SeverityLevel.HIGH);
```

[Back to top](#top)

---

## Installation

Before installing this library, make sure you have `Node.js` and `npm` installed on your machine.

To install the library, run the following command:

```bash
npm install error-enhanced
```

[Back to top](#top)

---

## Features

- Enriches error objects with multiple layers of metadata, providing a comprehensive view for debugging and logging.
- Modular architecture allows customization to fit diverse error handling needs.
- Validation methods to ensure data integrity.
- Unused properties filtering to optimize the error object. 
- Multiple serialization formats for easy error object storage or sending to external services.

> **Note**: Each feature is discussed in detail in the [Enhancers](#enhancers) and [Utilities](#utilities) sections.

[Back to top](#top)

---

## Enhancers

Enhancers are classes that enrich the error object with additional information. Included enhancers are:

- [IdentifiersEnhancer](#identifiersenhancer): Unique identifiers, error codes, severity, etc.
- [SystemContextEnhancer](#systemcontextenhancer): System context information like module, environment, etc.
- [UserInfoEnhancer](#userinfoenhancer): User related information like ID, roles, token, etc.  
- [HttpStatusEnhancer](#httpstatusenhancer): HTTP request related information.
- [ErrorAnalysisEnhancer](#erroranalysisenhancer): Detailed error analysis like file, line, column, etc.

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
error.setSeverity(SeverityLevel.HIGH);
```

##### `setCategory(category: Category)`

Sets the error category. Validates against the `Category` enum.

```typescript
error.setCategory(Category.SYSTEM);
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
error.setHttpStatusCode(HttpStatusCodes.FORBIDDEN);
```

##### `setUrl(url: string)`

Sets the URL. Validates if it's a valid URL.

```typescript
error.setUrl('https://example.com');
```

##### `setHttpMethod(method: HttpMethods)`

Sets the HTTP method. Validates against the `HttpMethods` enum.

```typescript
error.setHttpMethod(HttpMethods.GET);
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

### ErrorAnalysisEnhancer

This class provides an extra layer of detailed error analysis to your error objects. It extracts information like the originating file, line number, column number, function name, type name, and method name where the error occurred. This can be especially useful for debugging and logging purposes.

#### Properties

- `_originalError`: The original Error object or `null`.
- `_fileInfo`: The file where the error originated.
- `_lineNumber`: The line number in the file where the error originated.
- `_columnNumber`: The column number in the file where the error originated.
- `_functionName`: The function name where the error originated.
- `_typeName`: The type name (if applicable) where the error originated.
- `_methodName`: The method name where the error originated.
- `_fullStack`: The full stack trace of the original error.

#### Methods

##### `setOriginalError(originalError: Error)`

Sets the original error object and triggers the extraction of additional error details.

```typescript
const error = new ErrorEnhanced();
error.setOriginalError(new Error('Something went wrong'));
```

##### `extractErrorInfo()`

Private method to extract detailed error information from the original error's stack trace. This method is automatically called when setting the original error using `setOriginalError`.

##### `findFirstRelevantStack(stackList: string[])`

Private method to find the first relevant stack trace entry that can be used to extract detailed error information.

##### Getters

The following getter methods are available to retrieve the extracted error details:

- `fileInfo`: Gets the file information where the error originated.
- `lineNumber`: Gets the line number where the error originated.
- `columnNumber`: Gets the column number where the error originated.
- `functionName`: Gets the function name where the error originated.
- `typeName`: Gets the type name where the error originated.
- `methodName`: Gets the method name where the error originated.
- `fullStack`: Gets the full stack trace of the original error.

#### Example Usage

Here is how to use `ErrorAnalysisEnhanced` in your code:

```typescript
const error = new ErrorEnhanced();
error.setOriginalError(new Error('Something bad happened'));

console.log('File:', error.fileInfo);
console.log('Line:', error.lineNumber);
console.log('Column:', error.columnNumber);
console.log('Function:', error.functionName);
console.log('Type:', error.typeName);
console.log('Method:', error.methodName);
console.log('Full Stack:', error.fullStack);
```

[Back to top](#top)

---

## Utilities

Utilities provide additional functionalities:

- [FilterUtility](#filterutility): Filters unused properties.
- [SerializersUtility](#serializersutility): Serializes object to JSON, CSV, XML and YAML.

### FilterUtility

- Utility to filter out unused properties.

- **Methods:**
  - `filterUnused()`: Removes all properties that are null, undefined, or empty.

### SerializersUtility

- Utility to serialize the object into a JSON, CSV, XML and YAML string.

- **Methods:**
  - `toJSON()`: Serializes the object to a JSON string.
  - `toCSV()`: Serializes the object to a CSV string.
  - `toXML()`: Serializes the object to a XML string.
  - `toYAML()`: Serializes the object to a YAML string.

> Note: If used combined FilterHelper and Serializers it filters out properties that are null, undefined, or empty and serializes to a new object.

[Back to top](#top)

---

## Example Usage

Below is a step-by-step guide to create an enriched error object.

### Basic Example

Firstly, import all needed enhancers, utilities, interfaces and enumerators.

```typescript
import {
  ErrorEnhanced,
  ErrorAnalysisEnhancer,
  HttpStatusEnhancer,
  IdentifiersEnhancer,
  SystemContextEnhancer,
  UserInfoEnhancer,
  FilterUtility,
  SerializersUtility,
  ErrorAnalysis,
  HttpStatus,
  Identifiers,
  SystemContext,
  UserInfo,
  Filter,
  Serializers,
  SeverityLevel,
  Category,
  HttpStatusCodes,
  HttpMethods,
} from 'error-enhanced';
```

Create a new type to help view all properties and methods, use the interfaces.

```typescript
type ErrorEnhancedType = Error &
  Identifiers &
  HttpStatus &
  SystemContext &
  UserInfo &
  ErrorAnalysis &
  Filter &
  Serializers;
```

Then assign to a new objet the ErrorEnhanced class enriched with the enhancers and utilities

```typescript
const error = new ErrorEnhanced([
  new IdentifiersEnhancer(),
  new HttpStatusEnhancer(),
  new SystemContextEnhancer(),
  new UserInfoEnhancer(),
  new FilterUtility(),
  new ErrorAnalysisEnhancer(),
  new SerializersUtility(),
]) as ErrorEnhancedType;
```

### Setting Error Properties

You can set various properties to provide more context to the error.

```typescript
// Basic error information
error.name = 'UserNotAuthorizedError';
error.message = 'User is not authorized';

// User Information
error.setUser('john_doe_123').setRoles(['admin', 'user']);

// Additional Error Metadata
error.setErrorCode(5432).setErrorCodePrefix('EE');

// Setting Severity and Category
error.setSeverity(SeverityLevel.HIGH).setCategory(Category.NETWORK);
```

### Adding Stack Context

Associate the new error with an original standard Error object for stack automatic analysis.

```typescript
// Associate the error with an original standard Error object
error.setOriginalError(new Error('This is an error'));
```

### Adding HTTP Context

If the error is related to an HTTP request, you can attach relevant details.

```typescript
// HTTP Context
error
  .setHttpStatusCode(HttpStatusCodes.NOT_FOUND)
  .setUrl('https://api.example.com/user')
  .setHttpMethod(HttpMethods.GET);
```

### Serialization

Finally, serialize the enriched error object into a JSON string.

```typescript
const serializedErrorJSON = error.filterUnused().toJSON();
console.log(serializedErrorJSON);
```

This will output a JSON string containing all the set properties, filtered to remove any that are unused.

The resulting JSON can then be used for logging, debugging, or reporting purposes.

```json
{
  "_id": "123abc45-6789-de01-2345-fghi6789jklm",
  "_errorCode": 9876,
  "_errorCodePrefix": "CE",
  "_timestamp": 1699999999999,
  "_severity": "medium",
  "_category": "authentication",
  "_httpStatusCode": 401,
  "_url": "https://api.fake-example.com/login",
  "_httpMethod": "post",
  "_environment": "production",
  "_nodeVersion": "v16.13.0",
  "_hostname": "PROD-SERVER-001",
  "_cpuArch": "x64",
  "_osType": "Ubuntu",
  "_osRelease": "20.04.3 LTS",
  "_systemUptime": 100000,
  "_user": "jane_doe_789",
  "_roles": ["user"],
  "_fullStack": [
    "at Object.<anonymous> (/home/jane/projects/fake-project/example.js:40:12)",
    "at Module._compile (internal/modules/cjs/loader.js:1138:30)",
    "at Object.Module._extensions..js (internal/modules/cjs/loader.js:1158:10)",
    "at Module.load (internal/modules/cjs/loader.js:986:32)",
    "at Function.Module._load (internal/modules/cjs/loader.js:879:14)",
    "at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:71:12)",
    "at internal/main/run_main_module.js:17:47"
  ],
  "name": "AuthenticationFailedError",
  "message": "Invalid username or password"
}
```

[Back to top](#top)

---

## Full example

For a full example please check the [examples](examples/) folder.

[Back to top](#top)

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

For guidelines on how to contribute to this project, please see [CONTRIBUTING.md](CONTRIBUTING.md).

[Back to top](#top)

--- 

## Changelog

For a detailed list of changes, please refer to the [CHANGELOG.md](CHANGELOG.md).

[Back to top](#top)
