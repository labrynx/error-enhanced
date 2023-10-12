/**
 * @type {object} HttpHeaders
 * @group Enhancers
 * @category HttpStatus
 *
 * @description
 * Represents a single key-value pair for an HTTP header.
 *
 * @property {string} key - The header name.
 * @property {any} value - The header value.
 */
export type HttpHeaders = {
  key: string;
  value: any;
};
