# Filter

_File:_ [_`filter.interface.ts`_](../../src/lib/interfaces/filter.interface.ts)

### Introduction

The `Filter` interface is designed to offer a streamlined way to filter out unused or irrelevant data from the error object. This is especially useful when you want to log the error or send it across a network without including unnecessary details.

### Methods

| Method           | Return Type | Description                                                                                    |
| ---------------- | ----------- | ---------------------------------------------------------------------------------------------- |
| `filterUnused()` | `this`      | Filters out unused or irrelevant properties from the error object. Allows for method chaining. |

### Example Usage

```typescript
const error = new ErrorEnhanced([
  // ...other enhancers
  new FilterUtility()
]);

// Filtering unused properties
error.filterUnused();

// Now the error object will only contain relevant data
```

### Best Practices

* Use the `filterUnused` method before logging the error or sending it to an external service to minimize the data payload and focus on the most relevant information.

### Conclusion

The `Filter` interface is a simple yet powerful tool for cleaning up your error objects. By making use of this feature, you can focus on the essential details that help in debugging and resolving issues more effectively.

***
