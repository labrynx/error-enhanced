# SystemContextEnhancer

## Overview

The `SystemContextEnhancer` class enriches error objects with system-level context information, such as the originating module and method, as well as various system details like the hostname, CPU architecture, and operating system type and version. This class is essential for debugging and monitoring, especially when issues may depend on the system where the error occurred.

## Features

- Captures and exposes essential system-level details like hostname, CPU architecture, and OS type and release.
- Provides a method to refresh system uptime information.

## Properties

| Property       | Description                                  |
| -------------- | -------------------------------------------- |
| `hostname`     | The system's hostname.                       |
| `cpuArch`      | The system's CPU architecture.               |
| `osType`       | The type of the operating system.            |
| `osRelease`    | The release version of the operating system. |
| `systemUptime` | The system's uptime in seconds.              |

## Interface

### `SystemContextInterface`

This interface sets the contract for classes that enrich error objects with system-level context. It includes properties like `hostname`, `cpuArch`, `osType`, etc., and a method called `refreshSystemInfo` for updating system uptime.

## Methods

### Public Method

#### `refreshSystemInfo(): this`

Refreshes the system uptime information. This is particularly useful when you need the most up-to-date system uptime data for debugging or monitoring.

##### Usage Example

```typescript
const systemContext = new SystemContextEnhancer();
systemContext.refreshSystemInfo();
```

## Getters

- `hostname`: Returns the system's hostname.
- `cpuArch`: Returns the system's CPU architecture.
- `osType`: Returns the type of the operating system.
- `osRelease`: Returns the release version of the operating system.
- `systemUptime`: Returns the system's uptime in seconds.

## Common Use-Cases

- **Debugging**: The class is indispensable for debugging errors that may be system-specific.
- **Monitoring**: It can be integrated into system monitoring solutions to add contextual information about the system environment.

## Error Handling

There are no specific error-handling methods in this class. However, the class is designed to be robust and should not throw errors during normal operation. For additional safety, consider wrapping the methods in try-catch blocks during usage.
