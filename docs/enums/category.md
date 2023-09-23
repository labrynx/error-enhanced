# Category

_File:_ [_`category.enum.ts`_](../../src/lib/enums/category.enum.ts)

### Overview

The `Category` enum is part of the `error-enhanced` library and provides a standardized way to categorize errors into various types. This enumeration enhances error tracking and analysis by attaching a specific category to each error.

### Features

* **Error Categorization**: Enables errors to be grouped into specific categories for more granular tracking and debugging.

### Usage Example

```typescript
const cat = Category.NETWORK;
```

### Enum Members

| Key              | Description                                    |
| ---------------- | ---------------------------------------------- |
| `NETWORK`        | Errors related to network operations.          |
| `DATABASE`       | Errors related to database operations.         |
| `VALIDATION`     | Errors related to input validation.            |
| `AUTHENTICATION` | Errors related to authentication processes.    |
| `AUTHORIZATION`  | Errors related to authorization.               |
| `BUSINESS_LOGIC` | Errors related to the business logic.          |
| `CONFIGURATION`  | Errors related to system or app configuration. |
| `DEPRECATION`    | Errors related to deprecated features.         |
| `FILE_SYSTEM`    | Errors related to file system operations.      |
| `PERFORMANCE`    | Errors related to performance issues.          |
| `SECURITY`       | Errors related to security vulnerabilities.    |
| `THIRD_PARTY`    | Errors related to third-party services.        |
| `INTERNAL`       | Errors related to internal app operations.     |
| `UNKNOWN`        | Errors that couldn't be categorized.           |

***
