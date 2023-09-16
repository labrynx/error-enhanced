/**
 * @class FilterUtility
 *
 * Utility mixin that provides a method to filter out unused properties from an object.
 * This version returns a new object rather than modifying the existing one.
 *
 * @example
 * const error = new ErrorEnhanced();
 * error.someField = null;
 * error.someOtherField = "usefulData";
 * const filteredError = error.filterUnused();
 * // Now, filteredError only contains 'someOtherField' and other useful properties.
 */
export class FilterUtility {
  /**
   * @static
   * @type {Set<string>}
   * A set of properties that should never be deleted.
   */
  private static readonly preservedProps: Set<string> = new Set([
    'name',
    'message',
  ]);

  /**
   * @public
   * @returns {this} A new object instance with unused properties removed.
   *
   * Iterates over each property of the object and deletes any that are unused,
   * except for properties listed in 'preservedProps'.
   */
  public filterUnused(): this {
    const newObj = Object.create(Object.getPrototypeOf(this));
    Object.assign(newObj, this);

    Object.keys(newObj).forEach(key => {
      if (!FilterUtility.preservedProps.has(key)) {
        const value = newObj[key];
        if (this.isUnused(value)) {
          delete newObj[key];
        }
      }
    });

    return newObj as this;
  }

  /**
   * @private
   * @param {unknown} value - The value to check.
   * @returns {boolean} - Whether the value is considered unused.
   *
   * Helper method to validate empty or unused values.
   */
  private isUnused(value: unknown): boolean {
    return (
      value === null ||
      value === undefined ||
      value === '' ||
      value === -1 ||
      (Array.isArray(value) && this.isEmptyArray(value)) ||
      (this.isPlainObject(value) && this.isEmptyObject(value))
    );
  }

  /**
   * Helper method to check if an object is empty.
   */
  private isEmptyObject(obj: unknown): obj is Record<string, unknown> {
    return (
      typeof obj === 'object' && obj !== null && Object.keys(obj).length === 0
    );
  }

  /**
   * @private
   * @param {unknown} arr - The array to check.
   * @returns {boolean} - Whether the array is empty.
   *
   * Helper method to check if an array is empty.
   */
  private isEmptyArray(arr: unknown): arr is unknown[] {
    return Array.isArray(arr) && arr.length === 0;
  }

  /**
   * @private
   * @param {unknown} obj - The object to check.
   * @returns {boolean} - Whether the object is empty.
   *
   * Helper method to check if an object is empty.
   */
  private isPlainObject(obj: unknown): obj is Record<string, unknown> {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      !Array.isArray(obj) &&
      Object.keys(obj).length === 0
    );
  }
}
