# FilterUtility

_File:_ [_`filter.utility.ts`_](../../src/lib/utilities/filter.utility.ts)

### Overview

The `FilterUtility` class is a utility mixin designed to filter out unused or null properties from an object, returning a new, cleaner object. This class is particularly useful for data sanitization and object property management.

### Class Members

#### Static Members

* **`preservedProps: Set<string>`**: A set of properties that should never be removed during filtering. Default values include `'name'` and `'message'`.

#### Methods

**`filterUnused(): this`**

Returns a new instance of the object with unused properties removed.

**Usage Example**:

```typescript
const error = new ErrorEnhanced();
error.someField = null;
error.someOtherField = "usefulData";
const filteredError = error.filterUnused();
// filteredError now only contains 'someOtherField' and other useful properties.
```

**`isUnused(value: unknown): boolean` (Private)**

Checks if the given value is considered unused (e.g., null, undefined, etc.).

**`isEmptyObject(obj: unknown): obj is Record<string, unknown>` (Private)**

Checks if the given object is empty.

**`isEmptyArray(arr: unknown): arr is unknown[]` (Private)**

Checks if the given array is empty.

**`isPlainObject(obj: unknown): obj is Record<string, unknown>` (Private)**

Checks if the given object is a plain object and if it is empty.

### Common Use Cases

* **Data Sanitization**: Filtering out null or unused properties before saving an object to a database.
* **Object Normalization**: Creating a consistent object structure by removing unused or irrelevant fields.

***
