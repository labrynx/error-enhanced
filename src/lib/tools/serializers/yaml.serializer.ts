import { dump } from 'js-yaml';

/**
 * @class YamlSerializer
 *
 * Utility class for serializing an object into YAML format using the js-yaml library.
 *
 * @example
 * const serializer = new YamlSerializer();
 * const yamlString = serializer.toYAML();
 */
export class YamlSerializer {
  /**
   * toYAML
   *
   * Serializes the object to a YAML string using the js-yaml library.
   *
   * @returns {string} - The YAML string representation of the object.
   *
   * @throws {Error} Will throw an error if the serialization fails and logs the error message.
   */
  toYAML(): string {
    try {
      // Use the 'dump' function from js-yaml to serialize the object to a YAML string.
      return dump(this);
    } catch (e: unknown) {
      // Log and re-throw the error with additional context.
      const errorMsg = `Failed to serialize to YAML: ${
        (e as Error).message || 'Unknown error'
      }`;
      console.error(errorMsg); // Log the error message
      throw new Error(errorMsg);
    }
  }
}
