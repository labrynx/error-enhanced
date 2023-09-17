/**
 * @type {string | object | Array<any> | ArrayBuffer | Blob | FormData | null} HttpBody
 *
 * Represents valid types for both HTTP request and response bodies.
 * Acceptable types are: string, object, array, ArrayBuffer, Blob, FormData, or null.
 */
export type HttpBody =
  | string
  | object
  | Array<any>
  | ArrayBuffer
  | Blob
  | FormData
  | null;

/**
 * @type {object} HttpHeaders
 *
 * Represents a single key-value pair for an HTTP header.
 *
 * @property {string} key - The header name.
 * @property {any} value - The header value.
 */
export type HttpHeaders = {
  key: string;
  value: any;
};

/**
 * @type {object} QueryParams
 *
 * Represents a single key-value pair for a query parameter in a URL.
 *
 * @property {string} key - The query parameter name.
 * @property {any} value - The query parameter value.
 */
export type QueryParams = {
  key: string;
  value: any;
};

/**
 * @type {object} StackFrame
 *
 * Represents a single frame in a stack trace.
 *
 * @property {string} functionName - The name of the function where the error occurred.
 * @property {string} fileName - The name of the file where the error occurred.
 * @property {number} lineNumber - The line number in the file where the error occurred.
 * @property {number} columnNumber - The column number in the line where the error occurred.
 * @property {string} typeName - The name of the object type that the function is a method of.
 */
export type StackFrame = {
  functionName: string;
  fileName: string;
  lineNumber: number;
  columnNumber: number;
  typeName: string;
};

/**
 * @typedef JsonReplacer
 *
 * A type representing a function that takes a key and value as arguments,
 * and returns a value. Typically used for customizing JSON stringification.
 *
 * @param {string} key - The key in the JSON object.
 * @param {any} value - The corresponding value.
 *
 * @returns {any} The new or modified value.
 */
export type JsonReplacer = (key: string, value: any) => any;
