# AppStateEnhancer

_File:_ [_`application-state.enhancer.ts`_](../../src/lib/enhancers/application-state.enhancer.ts)

### Overview

The `ApplicationStateEnhancer` class enriches standard JavaScript `Error` objects by providing a snapshot of the application's current state, such as environment variables, configurations, and package dependencies. This class is part of the `error-enhanced` library, aiming to aid in debugging and system monitoring.

### Properties

| Property               | Description                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| `_environment`         | Holds the current environment (e.g., "production", "development"). Defaults to an empty string. |
| `_nodeVersion`         | The version of Node.js currently in use. Defaults to an empty string.                           |
| `_configurations`      | Application configurations that could affect behavior.                                          |
| `_envVars`             | Environment variables at the time of instantiation.                                             |
| `_stateSnapshot`       | A snapshot of the application state at a given time.                                            |
| `_eventHistory`        | A limited history of events added to the instance.                                              |
| `_dependencies`        | Current package dependencies.                                                                   |
| `_dependenciesCache`   | Cached package dependencies.                                                                    |
| `_packageManagerCache` | Cache to store the availability of package managers ('npm', 'yarn', etc.).                      |
| `_lastFetchTime`       | The last time dependencies were fetched.                                                        |

### Methods

#### Public Methods

**`setConfigurations(configs: Record<string, any>): this`**

Sets the application configurations.

**Usage Example**:

```typescript
const errorInfo = new ApplicationStateEnhancer();
errorInfo.setConfigurations({ apiEndpoint: "https://api.example.com" });
```

**`setStateSnapshot(snapshot: Record<string, any>): this`**

Sets a snapshot of the application state, which can include any critical variables or settings that you might need for debugging or system monitoring.

**Recommendations**:

* It's useful to call this method before making any significant state changes in your application or right before error-prone operations.
* Consider including information like user IDs, session tokens, or any other state variables that would provide context in case of an error.

**Usage Example**:

```typescript
const snapshot = {
  userID: '12345',
  sessionToken: 'abcde',
};
errorInfo.setStateSnapshot(snapshot);
```

**`addToEventHistory(event: string): this`**

Adds an event to the event history. The history is limited to the last 10 events for memory efficiency.

**Recommendations**:

* Use this method to log significant user actions or system events that lead up to an error or other important system state.
* You may want to add a timestamp to each event for more detailed tracking.

**Usage Example**:

```typescript
errorInfo.addToEventHistory('User logged in');
errorInfo.addToEventHistory('User clicked on button X');
```

**`setEnvironment(environment: Environment): this`**

Sets the current environment of the application. It utilizes an [enum](broken-reference) to ensure strong typing and consistency across different parts of the application.

**Recommendations**:

* Always use the `Environment` enum to set the environment to ensure data consistency.
* You should update this setting whenever your application transitions between different environments to ensure accurate logging and debugging.

**Usage Example**:

```typescript
errorInfo.setEnvironment(Environment.PRODUCTION);
```

#### Private Methods

* **`_fetchDependencies(): any`**: Fetches the dependencies from the package manager.
* **`_isPackageManagerInstalled(name: string): boolean`**: Checks if a package manager is installed, with caching.
* **`_handleAppStateError(e: Error, context: string)`**: Handles application state errors.

### Getters

* `configurations`
* `envVars`
* `stateSnapshot`
* `eventHistory`
* `dependencies`
* `environment`
* `nodeVersion`

### Common Use-Cases

* **Debugging**: Provides rich contextual information useful for debugging.
* **System Monitoring**: Helps in keeping track of system state for monitoring tools.
* **Audit Logging**: Useful for detailed logging of system state during errors.

***
