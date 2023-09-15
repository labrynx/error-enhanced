/**
 * @class FilterHelper
 *
 * Utility class that provides a method to filter out unused properties from an object.
 * This is particularly useful for cleaning up objects before serialization or logging.
 *
 * @example
 * const helper = new FilterHelper();
 * helper.someField = null;
 * helper.someOtherField = "usefulData";
 * helper.filterUnused();
 * // Now, helper object only contains 'someOtherField'.
 */
export class FilterHelper {
  /**
   * filterUnused
   *
   * Iterates over each property of the object and deletes any that are:
   * - null
   * - undefined
   * - empty strings
   * - empty arrays
   * - empty objects
   *
   * @returns The object instance itself, but with unused properties removed.
   */
  public filterUnused() {
    // Cast 'this' to any type to bypass TypeScript's type checking
    // as we dynamically access object properties
    Object.keys(this as any).forEach(key => {
      // Access the property value
      const value = (this as any)[key];

      // Check conditions to consider a property "unused"
      if (
        value === null || // Check for null
        value === undefined || // Check for undefined
        value === '' || // Check for empty string
        (Array.isArray(value) && value.length === 0) || // Check for empty array
        (typeof value === 'object' && Object.keys(value).length === 0) // Check for empty object
      ) {
        // Delete the unused property
        delete (this as any)[key];
      }
    });

    // Return the filtered object
    return this;
  }
}
