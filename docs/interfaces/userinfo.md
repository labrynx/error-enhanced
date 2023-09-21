# UserInfo

_File:_ [_`user-info.interface.ts`_](../../src/lib/interfaces/user-info.interface.ts)

### Introduction

The `UserInfo` interface is part of the `error-enhanced` library and focuses on capturing user-specific data related to an error event. This can include session IDs, user roles, authentication tokens, and more. Having this level of user-specific detail aids in debugging and helps in resolving user-specific issues more efficiently.

### Properties

| Property        | Type       | Description                                                                    |
| --------------- | ---------- | ------------------------------------------------------------------------------ |
| `sessionId`     | `string`   | A read-only property indicating the user's session ID.                         |
| `roles`         | `string[]` | A read-only array of roles associated with the user.                           |
| `authToken`     | `string`   | A read-only property for the authentication token.                             |
| `ipAddress`     | `string`   | A read-only property for the user's IP address.                                |
| `userAgent`     | `string`   | A read-only property for the user's agent, usually a browser.                  |
| `actionHistory` | `string[]` | A read-only array capturing a history of user actions leading up to the error. |

### Methods

| Method                               | Return Type | Description                                                              |
| ------------------------------------ | ----------- | ------------------------------------------------------------------------ |
| `setUser(user: string)`              | `this`      | Sets the user identifier. Allows for method chaining.                    |
| `setSessionId(sessionId: string)`    | `this`      | Sets the session ID. Allows for method chaining.                         |
| `setRoles(roles: string[])`          | `this`      | Sets the user roles. Allows for method chaining.                         |
| `setAuthToken(token: string)`        | `this`      | Sets the authentication token. Allows for method chaining.               |
| `setIpAddress(ip: string)`           | `this`      | Sets the user's IP address. Allows for method chaining.                  |
| `setUserAgent(userAgent: string)`    | `this`      | Sets the user agent. Allows for method chaining.                         |
| `addActionToHistory(action: string)` | `this`      | Adds an action to the user's action history. Allows for method chaining. |

### Example Usage

```typescript
const error = new ErrorEnhanced([
  new UserInfoEnhancer()
]);

// Setting properties
error
  .setSessionId('abc123')
  .setRoles(['admin', 'user']);

// Accessing properties
console.log(error.sessionId);  // 'abc123'
console.log(error.roles);  // ['admin', 'user']
```

### Best Practices

* Always set user-related properties as soon as the error is captured for more accurate debugging.
* Use `addActionToHistory` to maintain a running log of user actions leading up to an error, which can be invaluable for debugging.

### Conclusion

The `UserInfo` interface provides a structured way to capture user-specific details when an error occurs. This facilitates debugging and issue resolution, making it an indispensable part of your error management strategy.

***
