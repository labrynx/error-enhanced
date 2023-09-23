# SystemContext

_File:_ [_`system-context.interface.ts`_](../../src/lib/interfaces/system-context.interface.ts)

### Introduction

The `SystemContext` interface in `error-enhanced` is designed to capture system-level information where the error occurred. This can include details about the operating environment, Node.js version, hostname, and more. Having this information readily available can aid in debugging and system monitoring.

### Properties

| Property       | Type     | Description                                                                          |
| -------------- | -------- | ------------------------------------------------------------------------------------ |
| `environment`  | `string` | A read-only property indicating the environment (e.g., `development`, `production`). |
| `nodeVersion`  | `string` | A read-only property showing the Node.js version.                                    |
| `hostname`     | `string` | A read-only property for the hostname where the error occurred.                      |
| `cpuArch`      | `string` | A read-only property for the CPU architecture (e.g., `x64`, `arm`).                  |
| `osType`       | `string` | A read-only property for the operating system type (e.g., `Windows_NT`, `Linux`).    |
| `osRelease`    | `string` | A read-only property for the operating system release version.                       |
| `systemUptime` | `number` | A read-only property for the system uptime in seconds.                               |

### Methods

| Method                                | Return Type | Description                                                               |
| ------------------------------------- | ----------- | ------------------------------------------------------------------------- |
| `setEnvironment(environment: string)` | `this`      | Sets the environment. Allows for method chaining.                         |
| `refreshSystemInfo()`                 | `this`      | Refreshes all the system-related information. Allows for method chaining. |

### Example Usage

```typescript
const error = new ErrorEnhanced([
  new SystemContextEnhancer()
]);

// Setting properties
error
  .setEnvironment('development');

// Accessing properties
console.log(error.environment);  // 'development'
console.log(error.nodeVersion);  // 'v14.x.x'
```

### Best Practices

* Use `refreshSystemInfo()` if you suspect that system information might have changed during the application's runtime.
* Always set the `environment` as soon as the error is captured for more accurate debugging.

### Conclusion

The `SystemContext` interface is crucial for capturing system-level information, aiding both in debugging and in understanding the environment in which errors occur. This makes it an essential part of a comprehensive error management strategy.

***
