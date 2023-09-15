import { create } from 'xmlbuilder';

/**
 * @class XmlSerializer
 *
 * Utility class for serializing an object into an XML format using xmlbuilder.
 *
 * @example
 * const serializer = new XmlSerializer();
 * const xmlString = serializer.toXML();
 */
export class XmlSerializer {
  /**
   * toXML
   *
   * Serializes the object to an XML string using the xmlbuilder library.
   *
   * @returns {string} - The XML string representation of the object.
   *
   * @throws Will throw an error if the serialization fails and logs the error message.
   */
  toXML(): string {
    try {
      // Initialize with 'this' object for serialization
      let obj = this;

      // Check if an 'applyFilter' method exists and apply it if so
      if ('applyFilter' in this && typeof this['applyFilter'] === 'function') {
        obj = this['applyFilter']();
      }

      // Initialize the XML document with the object's name, XML version, and encoding
      const xml = create((this as any).name, {
        version: '1.0',
        encoding: 'UTF-8',
      });

      // Loop through object keys to add elements to the XML document
      Object.keys(obj).forEach(key => {
        xml.ele(key, {}, (obj as Record<string, unknown>)[key]);
      });

      // Return the pretty-printed XML string
      return xml.end({ pretty: true });
    } catch (e) {
      // Catch any errors, log them, and re-throw with additional context
      const errorMsg = `Failed to serialize to XML: ${
        (e as Error).message || 'Unknown error'
      }`;
      console.error(errorMsg); // Log the error message
      throw new Error(errorMsg);
    }
  }
}
