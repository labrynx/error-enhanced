# IdentifiersEnhancer

## Overview

The `IdentifiersEnhancer` class is part of the `error-enhanced` library, aimed at augmenting error objects with unique identifiers, custom error codes, and additional metadata. This enrichment is particularly beneficial for in-depth error analysis in large-scale applications.

## Features

- Generates a unique UUID for each error object
- Allows custom error codes with optional prefixes and descriptions
- Captures Unix and high-precision timestamps of the error occurrence
- Allows setting severity and category levels for better classification

## Enums and Interfaces

### `Severity`

An Enum representing different levels of error severity:

- LOW
- MEDIUM
- HIGH
- CRITICAL

### `Category`

An Enum representing different categories an error can belong to:

- NETWORK
- DATABASE
- VALIDATION
- ... (and so on)

### `IdentifiersInterface`

Defines the contract for classes that enrich error objects with unique identifiers, error codes, and metadata. Refer to the codebase for detailed interface definitions.

## Properties

| Property           | Description                                                                            |
| ------------------ | -------------------------------------------------------------------------------------- |
| `id`               | A unique identifier (UUID) for the error object, auto-generated upon instantiation.    |
| `errorCode`        | A custom error code, default is `-1`.                                                  |
| `errorCodePrefix`  | A prefix for the error code, default is an empty string.                               |
| `errorDescription` | A human-readable description of the error code, default is an empty string.            |
| `timestamp`        | A Unix timestamp representing when the error object was instantiated, default is `-1`. |
| `severity`         | Severity level of the error, defaults to `Severity.MEDIUM`.                            |
| `category`         | Category to which the error belongs, defaults to `Category.UNKNOWN`.                   |

## Methods

### `setErrorCode(errorCode: number): this`

Sets the custom error code and validates it to ensure it's a number.

#### Usage Example

```typescript
const error = new IdentifiersEnhancer();
error.setErrorCode(400);
```

### `setErrorCodePrefix(prefix: string): this`

Sets the error code prefix and validates it to ensure it's a valid string.

#### Usage Example

```typescript
error.setErrorCodePrefix("ERR");
```

### `setErrorDescription(description: string): this`

Sets a human-readable description for the error code and validates it to ensure it's a valid string.

#### Usage Example

```typescript
error.setErrorDescription("Bad Request");
```

### `setSeverity(severity: Severity): this`

Sets the error's severity level and validates it against the `Severity` enum.

#### Usage Example

```typescript
error.setSeverity(Severity.HIGH);
```

### `setCategory(category: Category): this`

Sets the error's category and validates it against the `Category` enum.

#### Usage Example

```typescript
error.setCategory(Category.SYSTEM);
```

### `getHash(): string`

Calculates a hash value based on the error object's properties for quick comparisons or deduplication.

#### Usage Example

```typescript
const hash = error.getHash();
```

## Common Use-Cases

- **Audit & Logging**: This class is useful for attaching additional metadata to errors, aiding in more effective error tracking in logging systems.
- **Error Analysis**: The extra information provided can be helpful for in-depth error analysis.

## Error Handling

Error handling is internalized within the class methods. If invalid types are passed to the setters, the class will throw an error.
