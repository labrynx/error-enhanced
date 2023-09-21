# Basic Usage

## Creating an Enhanced Error Object

Here's a simple example demonstrating how to create an enhanced error object:

```typescript
import { ErrorEnhanced, IdentifiersEnhancer, SeverityLevel } from 'error-enhanced';

// Instantiate a new enhanced error object
const error = new ErrorEnhanced([
  new IdentifiersEnhancer()
]);
```

## Setting Properties

You can set various properties like the error code and severity level:

```typescript
error
  .setErrorCode(404)
  .setSeverity(SeverityLevel.HIGH);
```

## Accessing Properties

You can easily retrieve the properties you've set:

```typescript
console.log(error.id);  // Outputs a unique identifier for the error
console.log(error.severity);  // Outputs the severity level, e.g., "HIGH"
```

***
