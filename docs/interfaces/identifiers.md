# Identifiers

_File:_ [_`identifiers.interface.ts`_](../../src/lib/interfaces/identifiers.interface.ts)

### Introduction

The `Identifiers` interface serves as the backbone for adding identification metadata to your enhanced Error objects. It includes properties for unique identifiers, error codes, timestamps, and categories, making it easier to track, log, and categorize errors.

### Properties

| Property                 | Type     | Description                                                     |
| ------------------------ | -------- | --------------------------------------------------------------- |
| `id`                     | `string` | A read-only unique identifier for each error instance.          |
| `errorCode`              | `number` | A read-only error code that provides more details on the error. |
| `errorCodePrefix`        | `string` | A read-only prefix for the error code.                          |
| `errorDescription`       | `string` | A read-only description of the error.                           |
| `timestamp`              | `number` | A read-only Unix timestamp for the error.                       |
| `highPrecisionTimestamp` | `string` | A read-only high-precision timestamp.                           |
| `severity`               | `string` | A read-only field for the error's severity.                     |
| `category`               | `string` | A read-only field for the error's category.                     |

### Methods

| Method                                          | Return Type | Description                                                 |
| ----------------------------------------------- | ----------- | ----------------------------------------------------------- |
| `setErrorCode(errorCode: number)`               | `this`      | Set the error code. Allows for method chaining.             |
| `setErrorCodePrefix(errorCodePrefix: string)`   | `this`      | Set the error code prefix. Allows for method chaining.      |
| `setErrorDescription(errorDescription: string)` | `this`      | Set the error description. Allows for method chaining.      |
| `getHash()`                                     | `string`    | Generate a hash based on the error's unique properties.     |
| `setSeverity(severity: string)`                 | `this`      | Set the severity level. Allows for method chaining.         |
| `setCategory(category: string)`                 | `this`      | Set the category for the error. Allows for method chaining. |

### Example Usage

```typescript
const error = new ErrorEnhanced([
  new IdentifiersEnhancer()
]);

// Setting properties
error
  .setErrorCode(404)
  .setSeverity('High')
  .setCategory('Network');

// Accessing properties
console.log(error.id);  // Unique identifier
console.log(error.errorCode);  // 404
console.log(error.severity);  // 'High'
```

### Best Practices

* Prefer setting the error code and severity as soon as the error object is initialized.
* Use the `getHash()` method for error deduplication in logging or analytics.

### Conclusion

The `Identifiers` interface plays a vital role in error tracking and categorization. By understanding its properties and methods, you'll be better equipped to manage errors effectively.

***
