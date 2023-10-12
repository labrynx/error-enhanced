# Overview

The `Severity` enum, part of the `error-enhanced` library, is designed to offer a standardized approach to categorizing the impact level of errors within a system. By doing so, it facilitates more effective error handling and debugging.

## Features

### Error Impact Classification

- Allows for sorting errors based on their impact level on system operations, enabling a more focused approach to troubleshooting.
  
### Versatility

- Since it's an enum, it's straightforward to extend or adapt to specific project needs, making it both reusable and maintainable.

### Type-Safety

- Written in TypeScript, it provides type-checking advantages, ensuring that the impact level is one of the predefined categories.

## Example Usage

```typescript
const sev = Severity.HIGH;
if (sev === Severity.CRITICAL) {
  // Trigger emergency alert
} else if (sev === Severity.HIGH) {
  // Log and notify admin
} else {
  // Handle less severe cases
}
```

## Extending and Customization

Since the enum is written in TypeScript, extending it or customizing it for specific use-cases is straightforward. For example, you could add a `NONE` member to indicate the absence of an error.
