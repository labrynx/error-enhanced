/**
 * @interface
 * @group Utilities
 * @category Filter
 * @fileoverview Defines the contract for classes that need to filter out unused properties from an object.
 *
 * Classes that implement this interface should provide a concrete implementation of the `filterUnused` method.
 * The method should return a new instance of the class where "unused" properties are removed.
 * The definition of "unused" is determined by the implementing class and should be clearly documented there.
 *
 * @method
 * @public
 * @name filterUnused
 * @description Returns a new object instance where unused properties have been removed. "Unused" is defined by the implementing class.
 * @returns {this} A new instance of the implementing class with unused properties removed.
 *
 * @example
 * ```typescript
 * class SomeClass implements FilterInterface {
 *   filterUnused(): this {
 *     // Implementation here
 *     return this;
 *   }
 * }
 * ```
 *
 * @usage This interface is commonly used in data models or DTOs (Data Transfer Objects) where some properties might be optional or conditional.
 */
export interface FilterInterface {
  filterUnused(): this;
}
