import stringifySafe from "json-stringify-safe";
import { create } from "xmlbuilder";
import { unparse, UnparseConfig } from "papaparse";
import { dump } from "js-yaml";
import { Serializers } from "../interfaces/serializers.interface";

/**
 * @class Serializers
 *
 * Utility class for serializing an object into JSON, CSV, XML and YAML strings.
 *
 * @example
 * const serializer = new SerializersUtility();
 * const jsonString = serializer.toJSON();
 * const csvString = serializer.toCSV();
 * const xmlString = serializer.toXML();
 * const yamlString = serializer.toYAML();
 */
export class SerializersUtility implements Serializers {
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
      const obj = this.applyObjectFilter();

      // Create a plain object to store the keys and values
      const plainObj: Record<string, any> = {};
      Object.keys(obj).forEach((key) => {
        // Copy each property to the plain object
        const value = (obj as any)[key];
        if (typeof value === "bigint") {
          plainObj[key] = value.toString(); // Convert BigInt to String
        } else {
          plainObj[key] = value;
        }
      });

      // Serialize to JSON, applying the replacer function if provided
      return stringifySafe(
        plainObj,
        replacer ||
          ((key: string, value: any) => {
            // Exclude null, undefined, and empty string values
            if (value === null || value === undefined || value === "") {
              return undefined;
            }
            return value;
          })
      );
    } catch (e) {
      this.handleSerializationError(e as Error, "JSON");
      return "";
    }
  }

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
      const obj = this.applyObjectFilter();

      const xml = create((this as any).name, {
        version: "1.0",
        encoding: "UTF-8",
      });

      Object.keys(obj).forEach((key) => {
        const value = obj[key];
        if (key === "_fullStack" && Array.isArray(value)) {
          // Handle _fullStack specially
          const stackContainer = xml.ele("_fullStack");
          value.forEach((item, index) => {
            // Using nested elements with index as an attribute and CDATA section
            const frame = stackContainer.ele("stackFrame", { index: index });
            frame.dat(item); // CDATA section
          });
        } else if (Array.isArray(value)) {
          // Generic handling for other arrays
          const arrayElement = xml.ele(key);
          value.forEach((item, index) => {
            arrayElement.ele(`item_${index}`, {}, item);
          });
        } else {
          // Standard handling for non-array elements
          xml.ele(key, {}, value);
        }
      });

      return xml.end({ pretty: true });
    } catch (e) {
      this.handleSerializationError(e as Error, "XML");
      return "";
    }
  }

  /**
   * toCSV
   *
   * Serializes the object to a CSV string using the Papaparse library.
   *
   * @param {string} delimiter - The delimiter to use between fields. Default is ','.
   * @param {boolean} quotes - Whether or not fields containing strings should be quoted. Default is true.
   *
   * @returns {string} - The CSV string representation of the object.
   *
   * @throws Will throw an error if the serialization fails.
   */
  toCSV(delimiter: string = ",", quotes: boolean = true): string {
    try {
      // Initialize with 'this' object for serialization
      const obj = this.applyObjectFilter();

      // Configure Papaparse settings
      const config: UnparseConfig = {
        delimiter: delimiter,
        quotes: (value, _columnIndex) => {
          // Quote strings if the 'quotes' parameter is true
          return typeof value === "string" ? quotes : false;
        },
      };

      // Put the object inside an array as Papaparse expects an array of objects
      const dataArray = [obj];

      // Perform the actual serialization
      const csv = unparse(dataArray, config);

      // Return the generated CSV string
      return csv;
    } catch (e) {
      this.handleSerializationError(e as Error, "CSV");
      return "";
    }
  }

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
      const filteredObj = this.applyObjectFilter();
      const objForYaml: Record<string, any> = {};

      // Convertir BigInt a String antes de serializar
      Object.keys(filteredObj).forEach((key) => {
        const value = (filteredObj as any)[key];
        if (typeof value === "bigint") {
          objForYaml[key] = value.toString();
        } else {
          objForYaml[key] = value;
        }
      });

      return dump(objForYaml);
    } catch (e) {
      this.handleSerializationError(e as Error, "YAML");
      return "";
    }
  }

  private applyObjectFilter(): any {
    if ("applyFilter" in this && typeof this["applyFilter"] === "function") {
      return this["applyFilter"]();
    }
    return this;
  }

  private handleSerializationError(e: Error, format: string) {
    const errorMsg = `Failed to serialize to ${format}: ${
      e.message || "Unknown error"
    }`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }
}
