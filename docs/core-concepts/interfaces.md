# Interfaces

### Introduction

The `error-enhanced` package offers a robust way to handle errors in TypeScript applications. A central feature of this package is the use of interfaces and a unified error type:`ErrorEnhancedType`.&#x20;

This type combines several interfaces to create a single, type-safe error object. This document aims to guide you through the role of interfaces and how they contribute to the creation of `ErrorEnhancedType`.

### Why Interfaces?

Interfaces in `error-enhanced` serve as the blueprint for these enhanced Error objects. They enforce type safety and consistency, allowing developers to understand the properties and methods available on each Error object. This is essential for writing robust and maintainable code.

### Available Interfaces

Below are the key interfaces that you can extend to create a customized error object:

| Interface       | Description                                                                                                      |
| --------------- | ---------------------------------------------------------------------------------------------------------------- |
| `Identifiers`   | Defines properties for unique identification of errors, like `id` and `errorCode`.                               |
| `HttpStatus`    | Focuses on HTTP-specific information such as `statusCode` and `statusMessage`.                                   |
| `SystemContext` | Captures system-level information where the error occurred, like the operating system and environment variables. |
| `UserInfo`      | Contains user-specific data related to the error, useful for debugging issues related to specific users.         |
| `ErrorAnalysis` | Holds properties for categorizing the error based on its severity level, type, and other factors.                |
| `Filter`        | Provides properties to filter the error data, possibly for logging or analytics purposes.                        |
| `Serializers`   | Defines methods for serializing the error object, useful for logging or transmitting over a network.             |

### The Unified Error Type: `ErrorEnhancedType`

#### Why is it Important?

The `ErrorEnhancedType` takes all these interfaces and merges them into a single, type-safe object. This unified error type allows TypeScript and IDEs to recognize the extended properties and methods. This is crucial for:

1. **Type Safety**: Ensuring you're working with an object that has all the expected properties and methods.
2. **IntelliSense**: Providing auto-completion and inline documentation in IDEs.
3. **Error Handling**: Enabling a unified approach to error handling, making the codebase easier to manage and debug.

#### Definition and Example

The `ErrorEnhancedType` is defined as:

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

You must create an ErrorEnhanced object of this type as follows:

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

By doing so, you ensure that the `error` object will have all the properties and methods defined in the contributing interfaces, offering a comprehensive way to manage errors.

### Best Practices

* Always check for the existence of optional properties before accessing them.
* Utilize TypeScript's IntelliSense to discover available properties and methods on the enhanced Error object.

### Conclusion

The use of interfaces and the unified `ErrorEnhancedType` make `error-enhanced` a robust and type-safe library for error management. Understanding these elements will help you effectively utilize the library and develop more maintainable and consistent code.

***
