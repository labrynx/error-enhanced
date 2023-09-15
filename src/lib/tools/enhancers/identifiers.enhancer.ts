import { v4 as uuidv4 } from 'uuid';
import * as crypto from 'crypto';

import { Category } from '../../enums/category.enum';
import { SeverityLevel } from '../../enums/severity.enum';
import {
  ValidCategory,
  ValidNumber,
  ValidSeverityLevel,
  ValidString,
  ValidStringWithEmpty,
} from '../../validators/validators';

/**
 * @class IdentifiersEnhancer
 *
 * The IdentifiersEnhancer class is responsible for enriching error objects with
 * unique identifiers, error codes, and metadata.
 *
 * @example
 * const error = new IdentifiersEnhancer(404);
 * error.setErrorCode(500).setSeverity(SeverityLevel.HIGH);
 */
export class IdentifiersEnhancer {
  private readonly _id: string = ''; // Unique identifier for the error
  private _errorCode: number = -1; // Custom error code, can be any type
  private _errorCodePrefix: string = ''; // Prefix for Error Code
  private _errorDescription: string = ''; // Description for Error Code
  private readonly _timestamp: number = -1; // Unix timestamp when the error was created
  private _severity: string = ''; // Severity level of the error
  private _category: string = ''; // Category to which the error belongs

  public static SeverityLevel = SeverityLevel; // Expose enum for external use
  public static Category = Category; // Expose enum for external use

  /**
   * @constructor
   *
   * Constructs a new IdentifiersEnhancer object.
   * Initializes unique ID, error code, and timestamp.
   *
   * @param errorCode - Initial error code for the error object
   */
  constructor(errorCode: number) {
    this._id = this.generateId(); // Generate a unique ID
    this._errorCode = errorCode; // Set error code if provided
    this._timestamp = Date.now(); // Record the current time
    this._severity = SeverityLevel.MEDIUM; // Default severity level
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
   * @returns {string} - Full error code.
   * @example
   * const code = error.errorCode;  // Output example: "ERR400"
   */
  public get errorCode(): string {
    const fullErrorCode = `${this._errorCodePrefix}${this._errorCode}`;
    return fullErrorCode;
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

  // Get custom error code prefix
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
   * Generates a hash value for the error object.
   * This can be useful for deduplication or quick comparisons.
   * @returns {string} - A hash value.
   * @example
   * const hash = error.getHash();  // Output example: "a4f777d58b7e6c918f45b940a877e37d"
   */
  public getHash(): string {
    return this.generateHash();
  }

  /**
   * Sets the severity level of the error.
   * @param {string} severity - The severity level to set.
   * @returns {IdentifiersEnhancer} - The instance of the class, useful for chaining.
   * @throws Will throw an error if the severity level is not in the valid SeverityLevel enum.
   * @example
   * error.setSeverity(SeverityLevel.HIGH);
   */
  public setSeverity(severity: string): this {
    const parsed = ValidSeverityLevel.safeParse(severity);

    if (!parsed.success) {
      throw new Error(
        `Invalid Severity level: '${severity}' not in valid SeverityLevel: ${JSON.stringify(
          SeverityLevel,
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
   * const level = error.severity;  // Output example: SeverityLevel.HIGH
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
   * Generates a unique identifier using UUID.
   * @private
   * @returns {string} - A unique identifier.
   */
  private generateId(): string {
    return uuidv4();
  }

  /**
   * Generates a hash value based on the properties of the error object.
   * @private
   * @returns {string} - The hash value.
   * @example
   * const hashValue = error.getHash();
   */
  private generateHash(): string {
    const str = JSON.stringify(this);
    return crypto.createHash('md5').update(str).digest('hex');
  }
}
