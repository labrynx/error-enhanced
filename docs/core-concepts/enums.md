# Enums

### Introduction

Enumerations (Enums) are a critical aspect of the `error-enhanced` library. Enums help standardize the values for various properties like error categories, severity levels, HTTP methods, and status codes. Using enums ensures consistency across your application and makes it easier to manage and filter errors.

### Types of Enums

`error-enhanced` provides several enums to categorize and manage errors more effectively:

| Enum                                                                                       | Description                                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`Category`](https://github.com/labrynx/error-enhanced/wiki/Enums:-Category)               | This enum allows you to categorize errors into various types, such as network-related, database-related, validation errors, and more. Categorizing errors enables easier debugging and better error reporting. |
| [`SeverityLevel`](https://github.com/labrynx/error-enhanced/wiki/Enums:-SeverityLevel)     | Defines the impact of an error on the system. Severity levels range from low to critical, giving you more control over how errors are managed and escalated within your application.                           |
| [`HttpMethods`](https://github.com/labrynx/error-enhanced/wiki/Enums:-HttpMethods)         | Lists the HTTP methods (`GET`, `POST`, `PATCH`, etc.) that can be associated with an error. This is particularly useful for categorizing errors in web applications and APIs.                                  |
| [`HttpStatusCodes`](https://github.com/labrynx/error-enhanced/wiki/Enums:-HttpStatusCodes) | Provides a comprehensive list of HTTP status codes to be associated with an error. This enum covers everything from informational responses to client and server errors.                                       |

### Usage Example

Here's how you can use enums in your code:

```typescript
import { ErrorEnhanced, IdentifiersEnhancer, HttpStatusEnhancer, Category, SeverityLevel, HttpMethods, HttpStatusCodes } from 'error-enhanced';

const error = new ErrorEnhanced([
  new IdentifiersEnhancer(),
  new HttpStatusEnhancer()
]);

// Using Enums to set properties
error
  .setCategory(Category.NETWORK)
  .setSeverity(SeverityLevel.HIGH)
  .setHttpMethod(HttpMethods.GET)
  .setHttpStatusCode(HttpStatusCodes.NOT_FOUND);
```

#### Why Use Enums?

1. **Type Safety**: Enums provide a type-safe way to work with predefined constants, reducing the risk of errors.
2. **Readability**: Using enums makes the code more readable and self-explanatory.
3. **Maintainability**: Enums make it easier to manage changes. You can easily add or remove values without causing side effects in your codebase.
4. **Extensibility**: While the library offers a robust set of predefined enums, it's designed to allow developers to extend these enums according to their specific requirements.

#### Best Practices

* Always use Enums for properties that have a finite set of valid values to maintain type safety.
* Keep Enum names and values descriptive for better code readability.

> **References**:
>
> * [TypeScript Enum Documentation](https://www.typescriptlang.org/docs/handbook/enums.html)

#### Extending Enums: Code Sample

```typescript
// Extending an existing Enum
enum CustomCategory extends Category {
  CUSTOM_ERROR = 'custom_error',
}
```

#### Conclusion

Enums in `error-enhanced` offer a standardized yet flexible way to set properties like category, severity, and HTTP-related information. By utilizing enums, you can make your error handling more robust, consistent, maintainable, and extensible.

For more in-depth information on each enum, you can check their individual pages.

***
