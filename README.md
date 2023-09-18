![npm](https://img.shields.io/npm/v/error-enhanced)
[![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/labrynx/error-enhanced/nodejs.yml)
](https://github.com/labrynx/error-enhanced/actions/workflows/nodejs.yml)

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

| Enhancer                                    | Description                                                                                     |
|:-------------------------------------------:|-------------------------------------------------------------------------------------------------|
| [IdentifiersEnhancer](https://github.com/labrynx/error-enhanced/wiki/Enhancer:-IdentifiersEnhancer) | Enriches error objects with unique identifiers and other contextual information.                |
| [SystemContextEnhancer](https://github.com/labrynx/error-enhanced/wiki/Enhancer:-SystemContextEnhancer) | Adds system-level context to error objects.                                                      |
| [UserInfoEnhancer](https://github.com/labrynx/error-enhanced/wiki/Enhancer:-UserInfoEnhancer)       | Includes user-related information in error objects.                                              |
| [HttpStatusEnhancer](https://github.com/labrynx/error-enhanced/wiki/Enhancer:-HttpStatusEnhancer)   | Incorporates HTTP request-related details to error objects.                                      |
| [ErrorAnalysisEnhancer](https://github.com/labrynx/error-enhanced/wiki/Enhancer:-ErrorAnalysisEnhancer) | Offers a detailed analysis of error origins, like file, line, and column.                        |

[Back to top](#top)

---

## Utilities

Utilities provide additional functionalities:

| Utility                                     | Description                                                                                     |
|:-------------------------------------------:|-------------------------------------------------------------------------------------------------|
| [FilterUtility](https://github.com/labrynx/error-enhanced/wiki/Utility:-FilterUtility)             | Filters out unused properties from the error object.                                             |
| [SerializersUtility](https://github.com/labrynx/error-enhanced/wiki/Utility:-SerializersUtility)   | Provides methods to serialize error objects into various formats such as JSON, CSV, XML, and YAML.|

---

## Enums

Enums in the `error-enhanced`` library offer a set of named constants that help standardize the categorization and handling of errors across your application. These include predefined constants for HTTP status codes, severity levels, categories, and HTTP methods. By using these enums, you ensure consistency and readability, making the error objects easier to interpret and manage.

| Enum                                                                 | Description                                                                                                                                                 |
|:--------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------|
| [Category](https://github.com/labrynx/error-enhanced/wiki/Enum:-Category)          | Enumerates different categories to which an error can belong. These categories help in sorting and managing errors more effectively. Examples include "NETWORK", "DATABASE", etc. |
| [SeverityLevel](https://github.com/labrynx/error-enhanced/wiki/Enum:-SeverityLevel) | Specifies the severity of an error. It has levels like "LOW", "MEDIUM", "HIGH", and "CRITICAL", which help in understanding the urgency of an error and the kind of attention it demands. |
| [HttpMethods](https://github.com/labrynx/error-enhanced/wiki/Enum:-HttpMethods)     | Lists the HTTP methods such as "GET", "POST", "PUT", etc. Useful for defining and checking the HTTP method used in API calls.                                 |
| [HttpStatusCodes](https://github.com/labrynx/error-enhanced/wiki/Enum:-HttpStatusCodes) | Enumerates various HTTP status codes, categorized as "1XX", "2XX", "3XX", "4XX", and "5XX". This helps in setting or identifying the HTTP response status. |

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

For guidelines on how to contribute to this project, please see [CONTRIBUTING.md](docs/CONTRIBUTING.md).

[Back to top](#top)

--- 

## Changelog

For a detailed list of changes, please refer to the [CHANGELOG.md](docs/CHANGELOG.md).

[Back to top](#top)
