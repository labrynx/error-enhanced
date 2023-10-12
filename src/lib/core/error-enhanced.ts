/**
 * @class ErrorEnhanced
 * @category Core
 * @extends {Error}
 *
 * @overview
 * This class extends the built-in Error object and provides a mechanism for dynamically mixing in
 * additional functionalities, often referred to as "enhancers". It utilizes `Object.defineProperty`
 * to dynamically add properties and methods from the enhancer objects onto the ErrorEnhanced instance.
 *
 * @description
 * The constructor accepts an array of enhancer objects. It then iterates over each enhancer,
 * copying its properties and methods to the ErrorEnhanced instance. This results in a composite object
 * that contains a mix of functionalities from multiple enhancers, thereby enriching the capabilities
 * of the standard Error object.
 *
 * @example
 * ```typescript
 * import { HttpStatusEnhancer, IdentifiersEnhancer } from './enhancers';
 *
 * const error = new ErrorEnhanced([
 *   new IdentifiersEnhancer(),
 *   new HttpStatusEnhancer()
 * ]);
 *
 * error.setErrorCode(404).setSeverity('High');
 * ```
 *
 * @param enhancers - An array of enhancer objects to mix into the ErrorEnhanced instance.
 *
 * @constructor
 * Initializes a new instance of the ErrorEnhanced class, applying the given enhancers to enrich
 * its functionality.
 *
 * [[include:core-concepts/core-errorenhanced.md]]
 */
export class ErrorEnhanced extends Error {
  constructor(enhancers: any[]) {
    super();
    Object.setPrototypeOf(this, new.target.prototype);

    for (const enhancer of enhancers) {
      // Copy methods from the enhancer's prototype
      Object.getOwnPropertyNames(Object.getPrototypeOf(enhancer)).forEach(
        name => {
          if (name !== 'constructor') {
            const descriptor = Object.getOwnPropertyDescriptor(
              Object.getPrototypeOf(enhancer),
              name,
            );
            Object.defineProperty(this, name, descriptor!);
          }
        },
      );

      // Copy properties from the enhancer instance
      Object.getOwnPropertyNames(enhancer).forEach(name => {
        const descriptor = Object.getOwnPropertyDescriptor(enhancer, name);
        Object.defineProperty(this, name, descriptor!);
      });
    }
  }
}
