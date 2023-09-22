/**
 * @interface FilterInterface
 *
 * The Filter interface defines the contract for classes that need to filter
 * out unused properties from an object.
 *
 * @method filterUnused(): this
 * Returns a new object instance where unused properties have been removed.
 * "Unused" is defined by the implementing class.
 */
export interface FilterInterface {
  filterUnused(): this;
}
