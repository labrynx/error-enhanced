import { unparse, UnparseConfig } from 'papaparse';

/**
 * @class CsvSerializer
 *
 * Utility class for serializing an object into a CSV format using Papaparse.
 *
 * @example
 * const serializer = new CsvSerializer();
 * const csvString = serializer.toCSV();
 */
export class CsvSerializer {
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
  toCSV(delimiter: string = ',', quotes: boolean = true): string {
    try {
      // Initialize with 'this' object for serialization
      let obj = this;

      // Check if an 'applyFilter' method exists and apply it if so
      if ('applyFilter' in this && typeof this['applyFilter'] === 'function') {
        obj = this['applyFilter']();
      }

      // Configure Papaparse settings
      const config: UnparseConfig = {
        delimiter: delimiter,
        quotes: (value, _columnIndex) => {
          // Quote strings if the 'quotes' parameter is true
          return typeof value === 'string' ? quotes : false;
        },
      };

      // Put the object inside an array as Papaparse expects an array of objects
      const dataArray = [obj];

      // Perform the actual serialization
      const csv = unparse(dataArray, config);

      // Return the generated CSV string
      return csv;
    } catch (e) {
      // Catch any errors and re-throw with additional context
      const errorMsg = `Failed to serialize to CSV: ${
        (e as Error).message || 'Unknown error'
      }`;
      console.error(errorMsg); // Log the error message
      throw new Error(errorMsg);
    }
  }
}
