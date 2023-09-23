# ApplicationState

_File:_ [_`error-analysis.interface.ts`_](../../src/lib/interfaces/error-analysis.interface.ts)

### Introduction

The `ErrorAnalysis` interface is a key component of the `error-enhanced` library. It aims to provide in-depth error analysis, capturing the original error, stack frames, and more. The detailed data gathered through this interface can be highly beneficial for debugging and root cause analysis.

### Properties

| Property        | Type                | Description                                                                   |
| --------------- | ------------------- | ----------------------------------------------------------------------------- |
| `originalError` | `Error \| null`     | A read-only property representing the original error object, if available.    |
| `parsedStack`   | `Array<StackFrame>` | A read-only array containing the parsed stack frames from the original error. |

### Methods

| Method                                   | Return Type | Description                                                                                                 |
| ---------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------- |
| `setOriginalError(originalError: Error)` | `this`      | Sets the original error object and triggers the extraction of the stack frames. Allows for method chaining. |

### Example Usage

```typescript
const error = new ErrorEnhanced([
  new ErrorAnalysisEnhancer()
]);

// Setting properties
error.setOriginalError(new Error('Something went wrong'));

// Accessing properties
console.log(error.originalError);  // Original Error object
console.log(error.parsedStack);  // Parsed stack frames
```

### Best Practices

* Use `setOriginalError` to set the original error object, which also populates `parsedStack` for better root cause analysis.
* Inspect properties like `originalError` and `parsedStack` for a comprehensive understanding of the error event.

### Conclusion

The `ErrorAnalysis` interface offers a structured approach to capture in-depth error diagnostics. It is an essential component for effective error management and debugging.

***
