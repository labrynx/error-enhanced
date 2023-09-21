# Enhancers

### Overview

In `error-enhanced`, Enhancers are modular components designed to extend the functionality of a basic Error object. They enrich the Error object with additional properties, methods, and functionalities, making it easier to manage and categorize errors in your application.

### What Are Enhancers?

Enhancers are classes that implement specific interfaces to extend an Error object with additional capabilities. They add properties like unique identifiers, HTTP status codes, system context information, and more, to a standard Error object.

### Types of Enhancers

These are the available enhancers in `error-enhanced`:

| Enhancer                | Description                                                                                                                        |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `ErrorAnalysisEnhancer` | Analyzes the error and categorizes it based on predefined conditions, such as severity level and category.                         |
| `HttpStatusEnhancer`    | Augments the Error object with HTTP status information, such as HTTP status codes and methods.                                     |
| `IdentifiersEnhancer`   | Adds unique identifiers, like a UUID, to the Error object for better tracking and debugging.                                       |
| `SystemContextEnhancer` | Provides system-related information where the error occurred, such as operating system, CPU architecture, and more.                |
| `UserInfoEnhancer`      | Adds user information to the Error object, which can be helpful for debugging issues related to specific user actions or accounts. |

### Usage Example

Here's a simple example that demonstrates how to use multiple enhancers:

```typescript
import { ErrorEnhanced, ErrorAnalysisEnhancer, HttpStatusEnhancer, IdentifiersEnhancer } from 'error-enhanced';

// Instantiate a new enhanced error object with multiple enhancers
const error = new ErrorEnhanced([
  new ErrorAnalysisEnhancer(),
  new HttpStatusEnhancer(),
  new IdentifiersEnhancer()
]);
```

### Chaining Methods

Enhancers often come with methods that can be chained to set or modify their properties. For instance:

```typescript
error
  .setErrorCode(404)
  .setSeverity(SeverityLevel.HIGH)
  .setHttpStatus(500);
```

### Conclusion

Enhancers play a crucial role in the `error-enhanced` library, offering a modular and flexible way to manage errors. Understanding how to use them effectively will allow you to leverage the library's full potential for error handling in your applications.

For more in-depth information, check out the individual pages for each enhancer.

***
