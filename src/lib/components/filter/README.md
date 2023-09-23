# FilterUtility

## Overview

The `FilterUtility` class is a utility mixin designed to filter out unused or null properties from an object, thereby returning a new, cleaner object. This class plays a significant role in scenarios like data sanitization and object property management. It implements the `FilterInterface` to ensure a standardized way of filtering unused properties.

## Features

- Filters out properties considered "unused," such as null, undefined, and empty strings
- Preserves certain properties that should not be removed
- Returns a new object, ensuring immutability
- Provides several utility methods for internal checks

## Class Members

### Static Members

| Static Member           | Description                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------ |
| `_preservedProps: Set<string>` | A set of properties that should never be removed during filtering. Default values include `'name'`, `'message'`, and `'_originalError'`. |

### Methods

#### Public Methods

**`filterUnused(): this`**

Returns a new instance of the object with unused properties removed, except those specified in `_preservedProps`.

##### Usage Example

```typescript
const error = new ErrorEnhanced();
error.someField = null;
error.someOtherField = "usefulData";
const filteredError = error.filterUnused();
// filteredError now only contains 'someOtherField' and other useful properties.
```

#### Private Methods

- **`_isUnused(value: unknown): boolean`**: Checks if the given value is considered unused based on predefined criteria.
- **`_isEmptyObject(obj: unknown): obj is Record<string, unknown>`**: Checks if the given object is empty.
- **`_isEmptyArray(arr: unknown): arr is unknown[]`**: Checks if the given array is empty.
- **`_isPlainObject(obj: unknown): obj is Record<string, unknown>`**: Checks if the given object is a plain object and if it is empty.

## Interface Implemented

### `FilterInterface`

Defines the contract for classes that need to filter out unused properties from an object. It includes a method `filterUnused()` that returns a new object instance where unused properties have been removed.

## Common Use Cases

- **Data Sanitization**: Useful for filtering out null or unused properties before saving an object to a database.
- **Object Normalization**: Helps in creating a consistent object structure by removing unused or irrelevant fields.
