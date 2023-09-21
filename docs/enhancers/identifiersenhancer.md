# IdentifiersEnhancer

_File:_ [_`identifiers.enhancer.ts`_](../../src/lib/enhancers/identifiers.enhancer.ts)

### Overview

The `IdentifiersEnhancer` class is a part of the `error-enhanced` library designed to augment error objects with unique identifiers, custom error codes, and additional metadata. This class is particularly beneficial for in-depth error analysis in large-scale applications.

### Properties

| Property           | Description                                                                            |
| ------------------ | -------------------------------------------------------------------------------------- |
| `id`               | A unique identifier (UUID) for the error object, auto-generated upon instantiation.    |
| `errorCode`        | A custom error code, default is `-1`.                                                  |
| `errorCodePrefix`  | A prefix for the error code, default is an empty string.                               |
| `errorDescription` | A human-readable description of the error code, default is an empty string.            |
| `timestamp`        | A Unix timestamp representing when the error object was instantiated, default is `-1`. |
| `severity`         | Severity level of the error, defaults to `SeverityLevel.MEDIUM`.                       |
| `category`         | Category to which the error belongs, defaults to `Category.UNKNOWN`.                   |

### Methods

#### `setErrorCode(errorCode: number)`

Sets the custom error code. Validates if it's a number.

**Usage Example**:

```typescript
const error = new IdentifiersEnhancer();
error.setErrorCode(400);
```

#### `setErrorCodePrefix(prefix: string)`

Sets the error code prefix. Validates if it's a valid string.

**Usage Example**:

```typescript
error.setErrorCodePrefix("ERR");
```

#### `setErrorDescription(description: string)`

Sets a human-readable description for the error code. Validates if it's a valid string.

**Usage Example**:

```typescript
error.setErrorDescription("Bad Request");
```

#### `setSeverity(severity: SeverityLevel)`

Sets the error's severity level. Validates against the `SeverityLevel` enum.

**Usage Example**:

```typescript
error.setSeverity(SeverityLevel.HIGH);
```

#### `setCategory(category: Category)`

Sets the error's category. Validates against the `Category` enum.

**Usage Example**:

```typescript
error.setCategory(Category.SYSTEM);
```

#### `getHash()`

Calculates a hash value for the error object based on its properties.

**Usage Example**:

```typescript
const hash = error.getHash();
```

### Common Use-Cases

* **Audit & Logging**: This class is useful for attaching additional metadata to errors, aiding in more effective error tracking in logging systems.
* **Error Analysis**: The extra information provided can be helpful for in-depth error analysis.

***
