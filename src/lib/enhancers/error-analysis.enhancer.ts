import ErrorStackParser from 'error-stack-parser';

import { ErrorAnalysis } from '../interfaces';
import { StackFrame } from '../types';

/**
 * @class ErrorAnalysisEnhancer
 *
 * The ErrorAnalysisEnhancer class enhances an error object with details
 * like file information, line number, column number, etc.
 */
export class ErrorAnalysisEnhancer implements ErrorAnalysis {
  /**
   * @private
   * @type {Error | null}
   *
   * Holds the original error object.
   */
  private _originalError: Error | null = null;

  /**
   * @private
   * @type {Array<StackFrame>}
   *
   * Holds the parsed stack trace details.
   */
  private _parsedStack: Array<StackFrame> = [];

  private static _stackCache: Map<Error, Array<StackFrame>> = new Map();

  /**
   * @constructor
   *
   * Initializes a new instance of the ErrorAnalysisEnhancer class.
   */
  constructor() {}

  /**
   * @public
   * @method setOriginalError
   * @param {Error} originalError - The original error object.
   * @returns {this} - Returns the instance for chaining.
   *
   * Sets the original error and triggers extraction of error information.
   */
  public setOriginalError(originalError: Error): this {
    this._originalError = originalError;
    this._extractErrorInfo();
    return this;
  }

  /**
   * @public
   * @method originalError
   * @returns {Error | null} - Returns the original error object.
   */
  public get originalError(): Error | null {
    return this._originalError;
  }

  /**
   * @private
   * @method _extractErrorInfo
   * @returns {this} - Returns the instance for chaining.
   *
   * Extracts detailed error information from the stack trace.
   */
  private _extractErrorInfo(): this {
    if (ErrorAnalysisEnhancer._stackCache.has(this._originalError!)) {
      this._parsedStack = ErrorAnalysisEnhancer._stackCache.get(
        this._originalError!,
      )!;
      return this;
    }

    const errStack = this._originalError?.stack ?? 'unknown';

    if (errStack === 'unknown') {
      return this;
    }

    const stackFrames = ErrorStackParser.parse(this._originalError!);

    this._parsedStack = stackFrames.map(
      ({ functionName, fileName, lineNumber, columnNumber }) => ({
        functionName: functionName || 'unknown',
        fileName: fileName || 'unknown',
        lineNumber: lineNumber ?? -1,
        columnNumber: columnNumber ?? -1,
        typeName: functionName?.split('.')[0] ?? 'unknown',
      }),
    );

    return this;
  }

  /**
   * @public
   * @method parsedStack
   * @returns {Array<StackFrame>} - Returns the parsed stack trace details.
   *
   * Getter for the parsed stack trace details.
   */
  public get parsedStack(): Array<StackFrame> {
    if (this._parsedStack === null) {
      this._extractErrorInfo();
    }
    return this._parsedStack!;
  }
}
