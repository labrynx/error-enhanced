/**
 * @class JsonSerializer
 *
 * Utility class for serializing an object into a JSON string.
 *
 * @example
 * const serializer = new JsonSerializer();
 * const jsonString = serializer.toJSON();
 */
export class JsonSerializer {
  /**
   * toJSON
   *
   * Serializes the object to a JSON string. It will exclude null, undefined, and empty string values.
   * Optionally, a custom replacer function can be provided to further customize serialization.
   *
   * @param {Function} replacer - Optional replacer function to customize serialization.
   * @returns {string} The serialized JSON string.
   * @throws Will throw an error if serialization fails.
   */
  toJSON(replacer?: (key: string, value: any) => any): string {
    try {
      // Initialize object with 'this'
      let obj = this;

      // Check for 'applyFilter' method and apply it if exists
      if ('applyFilter' in this && typeof this['applyFilter'] === 'function') {
        obj = this['applyFilter']();
      }

      // Create a plain object to store the keys and values
      const plainObj: Record<string, any> = {};
      Object.keys(obj).forEach(key => {
        // Copy each property to the plain object
        plainObj[key] = (obj as any)[key];
      });

      // Serialize to JSON, applying the replacer function if provided
      return JSON.stringify(
        plainObj,
        replacer ||
          ((key, value) => {
            // Exclude null, undefined, and empty string values
            if (value === null || value === undefined || value === '') {
              return undefined;
            }
            return value;
          }),
      );
    } catch (e) {
      // Handle serialization errors
      const errorMsg = `Failed to serialize to JSON: ${
        (e as Error).message || 'Unknown error'
      }`;
      console.error(errorMsg); // Log the error message
      throw new Error(errorMsg);
    }
  }
}
