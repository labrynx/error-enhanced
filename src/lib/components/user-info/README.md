# UserInfoEnhancer

## Overview

The `UserInfoEnhancer` class extends error objects with user-related metadata, providing essential context for debugging and analytics. This includes user identification, session details, roles, and other relevant information.

## Features

- Enriches error objects with user-specific metadata
- Validates the integrity of the data (e.g., valid strings for user ID, session ID, etc.)
- Maintains a history of user actions

## Properties

| Property        | Description                                                                |
| --------------- | -------------------------------------------------------------------------- |
| `user`          | User ID or username associated with the error, default is an empty string. |
| `sessionId`     | Session ID of the user, default is an empty string.                        |
| `roles`         | Array of roles or permissions, default is an empty array.                  |
| `authToken`     | Authentication token, default is an empty string.                          |
| `ipAddress`     | IP address, default is an empty string.                                    |
| `userAgent`     | Browser and OS details, default is an empty string.                        |
| `actionHistory` | Array of previous actions taken by the user, default is an empty array.    |

## Enums and Interfaces

### `UserInfoInterface`

This interface ensures that the following properties and methods exist in classes that implement it. The properties are all read-only and include `sessionId`, `roles`, `authToken`, etc. The methods include `setUser`, `setSessionId`, and so on.

## Methods

### `setUser(user: string)`

Sets the user ID or username after validating that it's a valid string.

#### Usage Example

```typescript
const userInfo = new UserInfoEnhancer();
userInfo.setUser("JohnDoe");
```

### `setSessionId(sessionId: string)`

Sets the session ID after validating that it's a valid string.

#### Usage Example

```typescript
userInfo.setSessionId("sessionId123");
```

### `setRoles(roles: string[])`

Sets the roles or permissions for the user.

#### Usage Example

```typescript
userInfo.setRoles(["admin", "user"]);
```

### `setAuthToken(token: string)`

Sets the authentication token after validating that it's a valid string.

#### Usage Example

```typescript
userInfo.setAuthToken("authToken123");
```

### `setIpAddress(ip: string)`

Sets the IP address after validating that it's a valid string.

#### Usage Example

```typescript
userInfo.setIpAddress("192.168.1.1");
```

### `setUserAgent(userAgent: string)`

Sets the user agent after validating that it's a valid string.

#### Usage Example

```typescript
userInfo.setUserAgent("Mozilla/5.0");
```

### `addActionToHistory(action: string)`

Adds an action to the user's action history after validating that it's a valid string.

#### Usage Example

```typescript
userInfo.addActionToHistory("Clicked Button");
```

## Common Use-Cases

- **Debugging**: Having user metadata can significantly assist in debugging issues, especially those that are user-specific.
- **Audit and Compliance**: Enables you to record user actions and roles to meet audit requirements.
