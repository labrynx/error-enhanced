/**
 * @interface IdentifiersInterface
 *
 * The Identifiers interface defines the contract for classes that enrich
 * error objects with unique identifiers, error codes, and metadata.
 *
 * @property {string} id
 * A readonly property that returns the unique identifier of the error object.
 *
 * @property {number} errorCode
 * A readonly property that returns the custom error code.
 *
 * @property {string} errorCodePrefix
 * A readonly property that returns the prefix for the error code.
 *
 * @property {string} errorDescription
 * A readonly property that returns the description of the error code.
 *
 * @property {number} timestamp
 * A readonly property that returns the Unix timestamp when the error object was created.
 *
 * @property {string} highPrecisionTimestamp
 * A readonly property that returns the high-precision timestamp of when the error object was created.
 *
 * @property {string} severity
 * A readonly property that returns the severity level of the error.
 *
 * @property {string} category
 * A readonly property that returns the category to which the error belongs.
 *
 * @method setErrorCode(errorCode: number): this
 * Sets the custom error code. Should throw an error if the provided code is not a number.
 *
 * @method setErrorCodePrefix(errorCodePrefix: string): this
 * Sets the prefix for the custom error code. Should throw an error if the prefix is not a valid string.
 *
 * @method setErrorDescription(errorDescription: string): this
 * Sets a description for the error code. Should throw an error if the description is not a valid string.
 *
 * @method getHash(): string
 * Generates a hash value representing the error object. Useful for deduplication or quick comparisons.
 *
 * @method setSeverity(severity: string): this
 * Sets the severity level for the error. Should throw an error if the severity is not in the Severity enum.
 *
 * @method setCategory(category: string): this
 * Sets the category for the error. Should throw an error if the category is not in the Category enum.
 */
export interface IdentifiersInterface {
  readonly id: string;
  readonly errorCode: number;
  readonly errorCodePrefix: string;
  readonly errorDescription: string;
  readonly timestamp: number;
  readonly highPrecisionTimestamp: string;
  readonly severity: string;
  readonly category: string;

  setErrorCode(errorCode: number): this;
  setErrorCodePrefix(errorCodePrefix: string): this;
  setErrorDescription(errorDescription: string): this;
  getHash(): string;
  setSeverity(severity: string): this;
  setCategory(category: string): this;
}
