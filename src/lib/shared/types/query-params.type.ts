/**
 * @type {object} QueryParams
 * @group Enhancers
 * @category HttpStatus
 *
 * @description
 * Represents a single key-value pair for a query parameter in a URL.
 *
 * @property {string} key - The query parameter name.
 * @property {any} value - The query parameter value.
 */
export type QueryParams = {
  key: string;
  value: any;
};
