# Core - ErrorEnhanced

### Overview

The `ErrorEnhanced` class serves as the core of the error-handling mechanism in the library. This class extends JavaScript's native `Error` object and introduces a flexible architecture that allows for the dynamic addition of functionalities through "enhancers."

#### Key Features

* **Extends Native Error**: Inherits all the properties and methods from JavaScript's native `Error` class.
* **Dynamic Functionalities**: Utilizes enhancers to dynamically add new capabilities.
* **Composite Design**: Enables the construction of a composite error object containing a mix of functionalities from multiple enhancers.

### Class Definition

#### Syntax

```typescript
export class ErrorEnhanced extends Error {
  constructor(enhancers: any[]);
}
```

#### Parameters

* `enhancers`: An array of enhancer objects to mix into the ErrorEnhanced instance.

#### Methods and Properties

The methods and properties available on an instance of `ErrorEnhanced` are dynamically defined based on the enhancers passed to the constructor.

### How It Works

The class uses JavaScript's `Object.defineProperty` method to dynamically add properties and methods from the enhancer objects to its own instance.

#### Internal Mechanism

1. **Iterate through Enhancers**: During construction, the class iterates through the list of provided enhancers.
2. **Copy Methods**: Copies methods from each enhancer's prototype onto the `ErrorEnhanced` instance.
3. **Copy Properties**: Copies properties from each enhancer instance onto the `ErrorEnhanced` instance.

### Example Usage

Here's a simple example to illustrate how you can use this class:

```typescript
import { HttpStatusEnhancer, IdentifiersEnhancer } from './enhancers';

const error = new ErrorEnhanced([
  new IdentifiersEnhancer(),
  new HttpStatusEnhancer()
]);

error.setErrorCode(404).setSeverity('High');
```

In this example, the `ErrorEnhanced` object is created and enriched with functionalities from `IdentifiersEnhancer` and `HttpStatusEnhancer`. Methods like `setErrorCode` and `setSeverity` are now available on the `error` object.

### Best Practices

* **Type Safety**: While using `ErrorEnhanced`, it's often beneficial to define a unified Error type using TypeScript to ensure type safety.
* **Dynamic Capabilities**: Use enhancers judiciously, as each enhancer adds additional properties and methods to the Error object, potentially increasing its memory footprint.

### Conclusion

The `ErrorEnhanced` class is designed to be a flexible and extensible foundation for advanced error-handling in JavaScript applications. It simplifies the process of enriching error objects with additional context and functionalities, making it a vital component of the error management ecosystem.

For more details, you can visit the individual pages for each [enhancer](https://github.com/labrynx/error-enhanced/wiki/Enhancers).

***
