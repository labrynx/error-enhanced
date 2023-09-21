# ErrorAnalysisEnhancer

_File:_ [_`error-analysis.enhancer.ts`_](../../src/lib/enhancers/error-analysis.enhancer.ts)

### Overview

The `ErrorAnalysisEnhancer` class enhances standard JavaScript `Error` objects by providing enriched error information like originating file, line number, column number, function name, and more. The class is a part of the `error-enhanced` library, designed to aid in more granular error tracking and debugging.

### Properties

| Property         | Description                                                              |
| ---------------- | ------------------------------------------------------------------------ |
| `_originalError` | Holds the original `Error` object. Defaults to `null`.                   |
| `_parsedStack`   | An array containing the parsed stack frames. Defaults to an empty array. |

### Methods

#### Public Methods

**`setOriginalError(originalError: Error): this`**

Sets the original error object and triggers the internal extraction of detailed error information. Returns the instance for method chaining.

**Usage Example**:

```typescript
const enhancedError = new ErrorAnalysisEnhancer();
enhancedError.setOriginalError(new Error("Something went wrong"));
```

**`originalError: Error | null`**

A getter method that returns the original `Error` object.

**`parsedStack: Array<StackFrame>`**

A getter method that returns the parsed stack frames as an array.

#### Private Methods

* **`_extractErrorInfo(): this`**: Extracts detailed error information from the original error's stack trace and populates `_parsedStack`.

### Getters

* `originalError`
* `parsedStack`

### Common Use-Cases

* **Debugging**: Offers more granular information for debugging purposes.
* **Error Logging**: Enhanced error details are useful for logging systems.
* **Error Analysis**: Enables in-depth error analysis by providing additional data points.

***
