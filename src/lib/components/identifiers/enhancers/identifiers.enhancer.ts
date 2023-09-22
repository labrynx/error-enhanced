import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';

import { IdentifiersInterface } from '../interfaces/identifiers.interface';
import { Category } from '../enums/category.enum';
import { Severity } from '../enums/severity.enum';
import {
  ValidCategory,
  ValidNumber,
  ValidSeverity,
  ValidStringWithEmpty,
  ValidString,
} from '@shared/validators';

/**
 * @class IdentifiersEnhancer
 *
 * The IdentifiersEnhancer class is responsible for enriching error objects with
 * unique identifiers, error codes, and metadata.
 *
 * @example
 * const error = new IdentifiersEnhancer(404);
 * error.setErrorCode(500).setSeverity(Severity.HIGH);
 */
export class IdentifiersEnhancer implements IdentifiersInterface {
  /**
   * @private
   * @type {string}
   *
   * Unique identifier for the error.
   */
  private readonly _id: string = '';

  /**
   * @private
   * @type {number}
   *
   * Custom error code, can be any type.
   */
  private _errorCode: number = -1;

  /**
   * @private
   * @type {string}
   *
   * Prefix for Error Code.
   */
  private _errorCodePrefix: string = '';

  /**
   * @private
   * @type {string}
   *
   * Description for Error Code.
   */
  private _errorDescription: string = '';

  /**
   * @private
   * @type {number}
   *
   * Unix timestamp when the error was created.
   */
  private readonly _timestamp: number = -1;

  /**
   * @private
   * @type {bigint}
   *
   * Stores the high-precision timestamp of when the error object was created.
   */
  private readonly _highPrecisionTimestamp: bigint;

  /**
   * @private
   * @type {string}
   *
   * Severity level of the error.
   */
  private _severity: string = '';

  /**
   * @private
   * @type {string}
   *
   * Category to which the error belongs.
   */
  private _category: string = '';

  /**
   * @constructor
   *
   * Constructs a new IdentifiersEnhancer object.
   * Initializes unique ID, error code, and timestamp.
   *
   * @param errorCode - Initial error code for the error object
   */
  constructor() {
    this._id = this._generateUUIDv4(); // Generate a unique ID
    this._timestamp = Date.now(); // Record the current time
    this._highPrecisionTimestamp = process.hrtime.bigint(); // Capture the current time using Node.js's process.hrtime.bigint() function.
    this._severity = Severity.MEDIUM; // Default severity level
    this._category = Category.UNKNOWN; // Default category
  }

  // ====================================================================
  // Getters & Setters
  // ====================================================================

  /**
   * Gets the unique identifier of the error.
   * @returns {string} - Unique identifier.
   */
  public get id(): string {
    return this._id;
  }

  /**
   * Sets the custom error code.
   * @param {number} errorCode - The error code to set.
   * @returns {IdentifiersEnhancer} - The instance of the class, useful for chaining.
   * @throws Will throw an error if the error code is not a number.
   * @example
   * error.setErrorCode(400);
   */
  public setErrorCode(errorCode: number): this {
    const parsed = ValidNumber.safeParse(errorCode);
    if (!parsed.success) {
      throw new Error(`Invalid Error Code: '${errorCode}' is not a number`);
    }
    this._errorCode = errorCode;
    return this;
  }

  /**
   * Gets the full error code including the prefix.
   * @returns {number} - Full error code.
   * @example
   * const code = error.errorCode;  // Output example: "ERR400"
   */
  public get errorCode(): number {
    return this._errorCode;
  }

  /**
   * Sets the custom prefix for the error code.
   * @param {string} errorCodePrefix - The prefix to set.
   * @returns {IdentifiersEnhancer} - The instance of the class, useful for chaining.
   * @throws Will throw an error if the prefix is not a valid string.
   * @example
   * error.setErrorCodePrefix("ERR");
   */
  public setErrorCodePrefix(errorCodePrefix: string): this {
    const parsed = ValidStringWithEmpty.safeParse(errorCodePrefix);
    if (!parsed.success) {
      throw new Error(
        `Invalid Error Code Prefix: '${errorCodePrefix}' is not a valid string`,
      );
    }
    this._errorCodePrefix = errorCodePrefix;
    return this;
  }

  /**
   * @public
   * @method errorCodePrefix
   * @returns {string} - The custom prefix for the error code.
   * @throws None.
   *
   * Gets the custom prefix set for the error code.
   */
  public get errorCodePrefix(): string {
    return this._errorCodePrefix;
  }

  /**
   * Sets a description for the error code.
   * @param {string} errorDescription - The description to set.
   * @returns {IdentifiersEnhancer} - The instance of the class, useful for chaining.
   * @throws Will throw an error if the description is not a valid string.
   * @example
   * error.setErrorDescription("Bad Request");
   */
  public setErrorDescription(errorDescription: string): this {
    const parsed = ValidString.safeParse(errorDescription);
    if (!parsed.success) {
      throw new Error(
        `Invalid Error Description: '${errorDescription}' is not a valid string`,
      );
    }
    this._errorDescription = errorDescription;
    return this;
  }

  /**
   * Gets the description of the error code.
   * @returns {string} - The description of the error code.
   * @example
   * const desc = error.errorDescription;  // Output example: "Bad Request"
   */
  public get errorDescription(): string {
    return this._errorDescription;
  }

  /**
   * Gets the Unix timestamp of when the error object was created.
   * @returns {number} - Unix timestamp.
   * @example
   * const time = error.timestamp;  // Output example: 1631232059000
   */
  public get timestamp(): number {
    return this._timestamp;
  }

  /**
   * Gets the high-precision Unix timestamp of when the error object was created.
   * The timestamp is represented as a bigint.
   * @returns {string} - High-precision Unix timestamp as a string.
   * @example
   * const time = error.highPrecisionTimestamp;  // Output example: "1631232059000000000"
   */
  public get highPrecisionTimestamp(): string {
    return this._highPrecisionTimestamp.toString();
  }

  /**
   * @public
   * @method getHash
   * @returns {string} - The hash value representing the error object.
   * @throws None.
   *
   * Generates a hash value for the error object. This can be useful for deduplication or quick comparisons.
   */
  public getHash(): string {
    return this._generateHash();
  }

  /**
   * Sets the severity level of the error.
   * @param {string} severity - The severity level to set.
   * @returns {IdentifiersEnhancer} - The instance of the class, useful for chaining.
   * @throws Will throw an error if the severity level is not in the valid Severity enum.
   * @example
   * error.setSeverity(Severity.HIGH);
   */
  public setSeverity(severity: string): this {
    const parsed = ValidSeverity.safeParse(severity);

    if (!parsed.success) {
      throw new Error(
        `Invalid Severity level: '${severity}' not in valid Severity: ${JSON.stringify(
          Severity,
        )}`,
      );
    }

    this._severity = severity;
    return this;
  }

  /**
   * Gets the severity level of the error.
   * @returns {string} - The severity level of the error.
   * @example
   * const level = error.severity;  // Output example: Severity.HIGH
   */
  public get severity(): string {
    return this._severity;
  }

  /**
   * Sets the category of the error.
   * @param {string} category - The category to set.
   * @returns {IdentifiersEnhancer} - The instance of the class, useful for chaining.
   * @throws Will throw an error if the category is not in the valid Category enum.
   * @example
   * error.setCategory(Category.SYSTEM);
   */
  public setCategory(category: string): this {
    const parsed = ValidCategory.safeParse(category);

    if (!parsed.success) {
      throw new Error(
        `Invalid Severity level: '${category}' not in valid Category: ${JSON.stringify(
          Category,
        )}`,
      );
    }

    this._category = category;
    return this;
  }

  /**
   * Gets the category of the error.
   * @returns {string} - The category of the error.
   * @example
   * const cat = error.category;  // Output example: Category.SYSTEM
   */
  public get category(): string {
    return this._category;
  }

  // ====================================================================
  // Private methods
  // ====================================================================

  /**
   * @private
   * @method _generateUUIDv4
   * @returns {string} - A unique identifier generated using UUID.
   * @throws None.
   *
   * Generates a unique identifier for the error object using the UUID library.
   */
  private _generateUUIDv4(): string {
    return uuidv4();
  }

  /**
   * @private
   * @method _generateHash
   * @returns {string} - The hash value calculated from the object's properties.
   * @throws None.
   *
   * Generates a hash value based on the properties of the error object using the MD5 hashing algorithm.
   */
  private _generateHash(): string {
    const str = JSON.stringify(this);
    return crypto.createHash('md5').update(str).digest('hex');
  }
}
