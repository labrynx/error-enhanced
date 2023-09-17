import ErrorStackParser from 'error-stack-parser';

import { ErrorAnalysis } from '../interfaces/error-analysis.interface';
import { StackFrame } from '../../types';

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
    // Check if _originalError is available and get its stack trace
    const errStack = this._originalError?.stack ?? 'unknown';

    // If no stack trace, return the instance as is
    if (errStack === 'unknown') {
      return this;
    }

    // Parse stack trace and populate _parsedStack
    const stackFrames = ErrorStackParser.parse(this._originalError!);
    this._parsedStack = stackFrames.map(frame => {
      const parts = frame.functionName?.split('.') || [];
      const typeName = parts.length > 1 ? parts[0] : 'unknown';
      return {
        functionName: frame.functionName || 'unknown',
        fileName: frame.fileName || 'unknown',
        lineNumber: frame.lineNumber || -1,
        columnNumber: frame.columnNumber || -1,
        typeName,
      };
    });
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
    return this._parsedStack;
  }
}
