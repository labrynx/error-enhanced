import stringifySafe from 'json-stringify-safe';
import { create } from 'xmlbuilder';
import { unparse, UnparseConfig } from 'papaparse';
import { dump } from 'js-yaml';

import { JsonReplacer } from '../../shared/types';

import { SerializersInterface } from './interfaces/serializers.interface';

/**
 * @class Serializers
 * @group Utilities
 * @category Serializers
 *
 * @description
 * Utility class for serializing an object into JSON, CSV, XML and YAML strings.
 *
 * @example
 * const serializer = new SerializersUtility();
 * const jsonString = serializer.toJSON();
 * const csvString = serializer.toCSV();
 * const xmlString = serializer.toXML();
 * const yamlString = serializer.toYAML();
 *
 * [[include:utilities/serializersutility.md]]
 */
export class SerializersUtility implements SerializersInterface {
  private _serializableCache: Record<string, any> | null = null;
  /**
   * toJSON
   *
   * Serializes the object to a JSON string. It will exclude null, undefined, and empty string values.
   * Optionally, a custom replacer function can be provided to further customize serialization.
   *
   * @param replacer - Optional replacer function to customize serialization.
   * @returns {string} The serialized JSON string.
   * @throws Will throw an error if serialization fails.
   */
  toJSON(replacer?: JsonReplacer): string {
    try {
      // Obtener el objeto serializable desde el cache o generarlo si necesario
      const serializableObj = this._serializableObject();

      // Serialize to JSON, applying the replacer function if provided
      return stringifySafe(
        serializableObj,
        replacer ||
          ((key: string, value: any) => {
            // Exclude null, undefined, and empty string values
            if (value === null || value === undefined || value === '') {
              return undefined;
            }
            return value;
          }),
      );
    } catch (e) {
      this._handleSerializationError(e as Error, 'JSON');
      return '';
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
      const obj = this._serializableObject();

      const xml = create((this as any).name, {
        version: '1.0',
        encoding: 'UTF-8',
      });

      Object.keys(obj).forEach(key => {
        this._serializeToXmlElement(xml, key, obj[key]);
      });

      return xml.end({ pretty: true });
    } catch (e) {
      this._handleSerializationError(e as Error, 'XML');
      return '';
    }
  }

  /**
   * toCSV
   *
   * Serializes the object to a CSV string using the Papaparse library.
   *
   * @param delimiter - The delimiter to use between fields. Default is ','.
   * @param quotes - Whether or not fields containing strings should be quoted. Default is true.
   *
   * @returns {string} - The CSV string representation of the object.
   *
   * @throws Will throw an error if the serialization fails.
   */
  toCSV(delimiter: string = ',', quotes: boolean = true): string {
    try {
      // Utilizar el objeto serializable desde el caché o generarlo
      const serializableObj = this._serializableObject();

      // Configurar las opciones de Papaparse
      const config: UnparseConfig = {
        delimiter: delimiter,
        quotes: (value, _columnIndex) => {
          return typeof value === 'string' ? quotes : false;
        },
      };

      // Colocar el objeto serializable dentro de un array, como lo espera Papaparse
      const dataArray = [serializableObj].map(record => {
        const flatRecord: Record<string, any> = {};
        Object.keys(record).forEach(key => {
          const value = (record as any)[key];
          if (value instanceof Error) {
            flatRecord[key] = JSON.stringify(this._flattenErrorObject(value));
          } else if (typeof value === 'object') {
            flatRecord[key] = JSON.stringify(value);
          } else {
            flatRecord[key] = value;
          }
        });
        return flatRecord;
      });

      // Realizar la serialización real
      const csv = unparse(dataArray, config);

      // Devolver la cadena CSV generada
      return csv;
    } catch (e) {
      this._handleSerializationError(e as Error, 'CSV');
      return '';
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
      // Utilizamos el objeto serializable en lugar de crear uno desde cero.
      const objForYaml = this._serializableObject();

      return dump(objForYaml);
    } catch (e) {
      this._handleSerializationError(e as Error, 'YAML');
      return '';
    }
  }

  /**
   * @private
   * @method _applyObjectFilter
   *
   * Applies object filter if the 'applyFilter' method is defined in the instance.
   *
   * @returns {any} - The filtered or original object.
   */
  private _applyObjectFilter(): any {
    if ('applyFilter' in this && typeof this['applyFilter'] === 'function') {
      return this['applyFilter']();
    }
    return this;
  }

  /**
   * @private
   * @method _handleSerializationError
   *
   * Handles serialization errors, logging them to the console and throwing a new Error.
   *
   * @param e - The error object.
   * @param format - The serialization format in which the error occurred.
   * @throws {Error} - Throws a new Error with the formatted message.
   */
  private _handleSerializationError(e: Error, format: string) {
    const errorMsg = `Failed to serialize to ${format}: ${
      e.message || 'Unknown error'
    }`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }

  /**
   * @private
   * @method _serializeToXmlElement
   *
   * Helper function for serializing individual properties to XML elements.
   *
   * @param xml - The xmlbuilder element.
   * @param key - The object key.
   * @param value - The object value.
   */
  private _serializeToXmlElement(xml: any, key: string, value: any) {
    const sanitizedKey = this._sanitizeXmlTag(key);

    if (value === null || value === undefined) {
      xml.ele(sanitizedKey, {}, '');
    } else if (value instanceof Error) {
      const errorElement = xml.ele(sanitizedKey);
      const flatError = this._flattenErrorObject(value);
      Object.keys(flatError).forEach(subKey => {
        this._serializeToXmlElement(errorElement, subKey, flatError[subKey]);
      });
    } else if (Array.isArray(value)) {
      const arrayElement = xml.ele(sanitizedKey);
      value.forEach((item, index) => {
        this._serializeToXmlElement(arrayElement, `item_${index}`, item);
      });
    } else if (typeof value === 'object') {
      const objElement = xml.ele(sanitizedKey);
      Object.keys(value).forEach(subKey => {
        this._serializeToXmlElement(objElement, subKey, value[subKey]);
      });
    } else {
      xml.ele(sanitizedKey, {}, value);
    }
  }

  /**
   * Sanitizes the given XML tag name to ensure it adheres to XML naming rules.
   * Replaces invalid characters with underscores and ensures the tag starts with
   * either a letter or an underscore.
   *
   * @private
   * @param tag - The XML tag name to sanitize.
   * @returns {string} The sanitized XML tag name.
   *
   * @example
   * _sanitizeXmlTag("invalid<tag>");  // returns "invalid_tag_"
   * _sanitizeXmlTag("1invalidTag");  // returns "_1invalidTag"
   */
  private _sanitizeXmlTag(tag: string): string {
    // Replace invalid characters with underscore
    let sanitizedTag = tag.replace(/[^a-zA-Z0-9\-._]/g, '_');

    // Ensure the tag starts with a letter or underscore
    if (!/^[a-zA-Z_]/.test(sanitizedTag)) {
      sanitizedTag = '_' + sanitizedTag;
    }

    return sanitizedTag;
  }

  /**
   * @private
   * @method _flattenErrorObject
   *
   * Flattens an Error object into a plain object for easier serialization.
   *
   * @param error - The Error object.
   * @returns {Record \<string, any>} - The flattened Error object.
   */
  private _flattenErrorObject(error: Error): Record<string, any> {
    const plainObject: Record<string, any> = {};

    Object.getOwnPropertyNames(error).forEach(key => {
      plainObject[key] = (error as any)[key];
    });

    return plainObject;
  }

  private _serializableObject(): Record<string, any> {
    if (this._serializableCache) {
      return this._serializableCache;
    }

    const obj = this._applyObjectFilter();
    const serializableObj: Record<string, any> = {};

    Object.keys(obj).forEach(key => {
      const value = (obj as any)[key];
      if (value instanceof Error) {
        serializableObj[key] = this._flattenErrorObject(value);
      } else if (typeof value === 'bigint') {
        serializableObj[key] = value.toString();
      } else {
        serializableObj[key] = value;
      }
    });

    this._serializableCache = serializableObj;
    return serializableObj;
  }
}
