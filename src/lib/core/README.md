# Core - ErrorEnhanced

## Overview

The `ErrorEnhanced` class serves as the core of the error-handling mechanism in the library. This class extends JavaScript's native `Error` object and introduces a flexible architecture that allows for the dynamic addition of functionalities through "enhancers."

The `ErrorEnhanced` class offers a flexible and extensible foundation for advanced error-handling in JavaScript applications. It simplifies the task of enriching error objects with additional context and functionalities, thereby making it a crucial component in the error management ecosystem.

### Key Features

- **Extends Native Error**: Inherits all properties and methods from JavaScript's native `Error` class.
- **Dynamic Functionalities**: Utilizes enhancers to dynamically add new capabilities.
- **Composite Design**: Enables the construction of a composite error object containing a mix of functionalities from multiple enhancers.

## Class Definition

### Syntax

```typescript
export class ErrorEnhanced extends Error {
  constructor(enhancers: any[]);
}
```

### Parameters

- `enhancers`: An array of enhancer objects to mix into the `ErrorEnhanced` instance.

### Dynamic Methods and Properties

The methods and properties available on an instance of `ErrorEnhanced` are dynamically defined based on the enhancers passed to the constructor. They are added using `Object.defineProperty`.

## Internal Mechanism

1. **Iterate through Enhancers**: During the object's construction, it iterates through each enhancer provided in the `enhancers` array.
2. **Copy Methods**: It copies the methods from each enhancer's prototype to the `ErrorEnhanced` instance.
3. **Copy Properties**: It also copies the properties from each enhancer instance onto the `ErrorEnhanced` instance.

## Example Usage

### Basic Usage Example

```typescript
import { HttpStatusEnhancer, IdentifiersEnhancer } from './enhancers';

const error = new ErrorEnhanced([
  new IdentifiersEnhancer(),
  new HttpStatusEnhancer()
]);

error.setErrorCode(404).setSeverity('High');
```

### Comprehensive Example

Here's a more comprehensive example that showcases the various features of the `ErrorEnhanced` class:

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
  ErrorAnalysisInterface,
  HttpStatusInterface,
  IdentifiersInterface,
  SystemContextInterface,
  UserInfoInterface,
  FilterInterface,
  SerializersInterface,
  Severity,
  Category,
  HttpStatusCodes,
  HttpMethods,
} from '../src';

type ErrorEnhancedType = Error &
  IdentifiersInterface &
  HttpStatusInterface &
  SystemContextInterface &
  UserInfoInterface &
  ErrorAnalysisInterface &
  FilterInterface &
  SerializersInterface;

const error = new ErrorEnhanced([
  new IdentifiersEnhancer(),
  new HttpStatusEnhancer(),
  new SystemContextEnhancer(),
  new UserInfoEnhancer(),
  new FilterUtility(),
  new ErrorAnalysisEnhancer(),
  new SerializersUtility(),
]) as ErrorEnhancedType;

// Basic error information
error.name = 'UserNotAuthorizedError';
error.message = 'User is not authorized';

// User Information
error.setUser('john_doe_123').setRoles(['admin', 'user']);

// Associate the error with an original standard Error object
error.setOriginalError(new Error('This is an error'));

// Additional Error Metadata
error.setErrorCode(5432).setErrorCodePrefix('EE');

// Setting Severity and Category
error.setSeverity(Severity.HIGH).setCategory(Category.NETWORK);

// HTTP Context
error
  .setHttpStatusCode(HttpStatusCodes.NOT_FOUND)
  .setUrl('https://api.example.com/user')
  .setHttpMethod(HttpMethods.GET);

// Sanitize unused variables
const filteredError = error.filterUnused();

// Serialize the error object into various formats after filtering unused properties
const serializedErrorJSON = filteredError.toJSON();
const serializedErrorCSV = filteredError.toCSV();
const serializedErrorXML = filteredError.toXML();
const serializedErrorYAML = filteredError.toYAML();

// Log the serialized errors
console.log('\n---\nJSON export: ');
console.log(serializedErrorJSON);
console.log('\n---\nCSV export: ');
console.log(serializedErrorCSV);
console.log('\n---\nXML export: ');
console.log(serializedErrorXML);
console.log('\n---\nYAML export: ');
console.log(serializedErrorYAML);
```

In this example, the `ErrorEnhanced` object is created and enriched with functionalities from multiple enhancers, such as `IdentifiersEnhancer`, `HttpStatusEnhancer`, `SystemContextEnhancer`, and others. Methods like `setErrorCode`, `setSeverity`, `setUser`, `setRoles`, and many more are dynamically available on the `error` object. This makes it a powerful tool for capturing a wide range of details about an error event, thereby aiding in debugging and analytics.

## Best Practices

- **Type Safety**: When using `ErrorEnhanced`, it's beneficial to define a unified Error type using TypeScript for type safety.
- **Dynamic Capabilities**: Use enhancers judiciously. Each enhancer adds additional properties and methods to the `Error` object, potentially increasing its memory footprint.
