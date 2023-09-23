# Severity

_File:_ [_`severity.enum.ts`_](../../src/lib/enums/severity.enum.ts)

### Overview

The `Severity` enum, part of the `error-enhanced` library, provides a standardized way to classify the impact level of errors. This allows for prioritized error handling and more effective debugging.

### Features

* **Error Impact Classification**: Enables errors to be sorted according to their impact level on system operations.

### Usage Example

```typescript
const severity = Severity.HIGH;
```

### Enum Members

| Key        | Description                                                                              |
| ---------- | ---------------------------------------------------------------------------------------- |
| `LOW`      | Low-impact errors that generally don't affect system functionality.                      |
| `MEDIUM`   | Moderate-impact errors that may affect some minor functionalities.                       |
| `HIGH`     | High-impact errors affecting critical functionalities but not halting the entire system. |
| `CRITICAL` | Critical-impact errors that demand immediate attention and may cause system outages.     |

***
