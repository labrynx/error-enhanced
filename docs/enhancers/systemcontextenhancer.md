# SystemContextEnhancer

_File:_ [_`system-context.enhancer.ts`_](../../src/lib/enhancers/system-context.enhancer.ts)

### Overview

The `SystemContextEnhancer` class enriches error objects with system-level context information. It includes details about the operating environment, system hardware, and the Node.js runtime. This class is particularly useful for diagnosing issues that may be dependent on the system where the error occurred.

### Properties

| Property       | Description                                  |
| -------------- | -------------------------------------------- |
| `hostname`     | The system's hostname.                       |
| `cpuArch`      | The system's CPU architecture.               |
| `osType`       | The type of the operating system.            |
| `osRelease`    | The release version of the operating system. |
| `systemUptime` | The system's uptime in seconds.              |

### Methods

#### `refreshSystemInfo()`

Refreshes the system uptime information. Useful when you need the most up-to-date info.

**Usage Example**:

```typescript
systemContext.refreshSystemInfo();
```

### Getters

#### `hostname`

Returns the system's hostname.

#### `cpuArch`

Returns the system's CPU architecture.

#### `osType`

Returns the type of the operating system.

#### `osRelease`

Returns the release version of the operating system.

#### `systemUptime`

Returns the system's uptime in seconds.

### Common Use-Cases

* **Debugging**: The class is useful for debugging errors that may be system-specific.
* **Monitoring**: Can be used in system monitoring solutions to add contextual information about the environment.

***
