import { Filter } from '../interfaces/filter.interface';

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
export class FilterUtility implements Filter {
  /**
   * @static
   * @type {Set<string>}
   * A set of properties that should never be deleted.
   */
  private static readonly _preservedProps: Set<string> = new Set([
    'name',
    'message',
    '_originalError',
  ]);

  /**
   * @public
   * @returns {this} A new object instance with unused properties removed.
   *
   * Iterates over each property of the object and deletes any that are unused,
   * except for properties listed in 'preservedProps'.
   */
  public filterUnused(): this {
    // Create a new object with the same prototype as 'this'.
    const newObj = Object.create(Object.getPrototypeOf(this));

    // Get all the own properties of the object (this will include methods).
    const allProps = Object.getOwnPropertyNames(this);

    allProps.forEach(key => {
      // Ignore properties that should be preserved.
      if (!FilterUtility._preservedProps.has(key)) {
        const descriptor = Object.getOwnPropertyDescriptor(this, key);
        if (descriptor) {
          // Check if the property is a "value" (and not a getter/setter).
          if ('value' in descriptor) {
            // If the property value is considered "unused", we skip it.
            if (this._isUnused(descriptor.value)) {
              return;
            }
          }
          // If we get here, we copy the property to the new object.
          Object.defineProperty(newObj, key, descriptor);
        }
      } else {
        // If the property should be preserved, we copy it no matter its value.
        const descriptor = Object.getOwnPropertyDescriptor(this, key);
        if (descriptor) {
          Object.defineProperty(newObj, key, descriptor);
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
  private _isUnused(value: unknown): boolean {
    if (typeof value === 'function') {
      return false;
    }

    return (
      value === null ||
      value === undefined ||
      value === '' ||
      value === -1 ||
      (Array.isArray(value) && this._isEmptyArray(value)) ||
      (this._isPlainObject(value) && this._isEmptyObject(value))
    );
  }

  /**
   * Helper method to check if an object is empty.
   */
  private _isEmptyObject(obj: unknown): obj is Record<string, unknown> {
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
  private _isEmptyArray(arr: unknown): arr is unknown[] {
    return Array.isArray(arr) && arr.length === 0;
  }

  /**
   * @private
   * @param {unknown} obj - The object to check.
   * @returns {boolean} - Whether the object is empty.
   *
   * Helper method to check if an object is empty.
   */
  private _isPlainObject(obj: unknown): obj is Record<string, unknown> {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      !Array.isArray(obj) &&
      Object.keys(obj).length === 0
    );
  }
}
