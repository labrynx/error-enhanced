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
