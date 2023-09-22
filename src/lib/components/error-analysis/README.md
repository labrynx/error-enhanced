# ErrorAnalysisEnhancer

## Overview

The `ErrorAnalysisEnhancer` class enhances standard JavaScript `Error` objects by providing enriched error information like originating file, line number, column number, function name, and more. The class is a part of the `error-enhanced` library, designed to aid in more granular error tracking and debugging.

## Features

- Sets and retrieves the original `Error` object.
- Extracts and provides detailed error information through parsed stack frames.

## Properties

| Property         | Description                                                              |
| ---------------- | ------------------------------------------------------------------------ |
| `_originalError` | Holds the original `Error` object. Defaults to `undefined`.              |
| `_parsedStack`   | An array containing the parsed stack frames. Defaults to an empty array.  |

## Enums and Interfaces

### `ErrorAnalysisInterface`

This interface ensures that certain properties and methods are present in classes that implement it. It includes properties like `originalError`, `parsedStack`, and a method `setOriginalError`.

## Methods

### Public Methods

#### `setOriginalError(originalError: Error): this`

Sets the original error object and triggers the internal extraction of detailed error information. Returns the instance for method chaining.

##### Usage Example

```typescript
const enhancedError = new ErrorAnalysisEnhancer();
enhancedError.setOriginalError(new Error("Something went wrong"));
```

#### `originalError: Error | undefined`

A getter method that returns the original `Error` object.

#### `parsedStack: Array<StackFrame>`

A getter method that returns the parsed stack frames as an array.

### Private Methods

- `_extractErrorInfo(): this`: Extracts detailed error information from the original error's stack trace and populates `_parsedStack`.

## Getters

- `originalError`
- `parsedStack`

## Common Use-Cases

- **Debugging**: Offers more granular information for debugging purposes.
- **Error Logging**: Enhanced error details are useful for logging systems.
- **Error Analysis**: Enables in-depth error analysis by providing additional data points.

## Error Handling

The class uses a private method, `_extractErrorInfo`, to handle the extraction of detailed error information. This ensures that the parsed stack frames are accurately populated based on the original error's stack trace.
