# Utilities

### Introduction

Utilities in the `error-enhanced` library are specialized helper classes designed to supplement the library's core functionalities. They provide a set of convenience methods for tasks such as error handling, data filtering, and object serialization.

### What Are Utilities?

In the `error-enhanced` ecosystem, Utilities function as supportive components that enhance various facets of error management. Unlike Enhancers, which augment the native Error object, Utilities offer discrete functionalities that can either complement enhanced error objects or operate independently.

### Key Utility Classes

The `error-enhanced` library brings several utility classes to the table, each addressing a specific need:

| Utility              | Description                                                                                                                                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `FilterUtility`      | This utility class offers methods to sanitize error objects by filtering out sensitive or extraneous data. It comes in handy when you're logging errors or transmitting them to external monitoring services. |
| `SerializersUtility` | This utility focuses on serialization and deserialization of enhanced error objects. This becomes crucial when you're storing, transmitting, or logging errors in formats like JSON.                          |

### Practical Example

Here's a concise example illustrating how you can employ `FilterUtility` and `SerializersUtility`:

```typescript
import { ErrorEnhanced, IdentifiersEnhancer, FilterUtility, SerializersUtility } from 'error-enhanced';

// Instantiate an enhanced error object
const error = new ErrorEnhanced([
  new IdentifiersEnhancer(),
  new FilterUtility(),
  new SerializersUtility()
]);

// Apply filtering and serialization
const filteredError = error.filterUnused();
const serializedError = filteredError.toJSON();

console.log(serializedError);
```

#### Method Chaining with Utilities

For more efficient code, utilities can be chained together in a single expression:

```typescript
const serializedErrorChained = error.filterUnused().toJSON();
console.log(serializedErrorChained);
```

### Conclusion

Utilities are invaluable assets in the `error-enhanced` library, simplifying otherwise complex operations and enabling efficient error management in your applications.

To delve further into each utility class, refer to their dedicated documentation for in-depth explanations and usage examples.

***
