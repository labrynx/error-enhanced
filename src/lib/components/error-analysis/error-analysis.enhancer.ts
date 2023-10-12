import ErrorStackParser from 'error-stack-parser';

import { StackFrame } from '../../shared/types';

import { ErrorAnalysisInterface } from './interfaces/error-analysis.interface';

/**
 * @class
 * @group Enhancers
 * @category ErrorAnalysis
 * @description Enhances an error object with additional details such as file information, line number, and column number.
 * @implements {ErrorAnalysisInterface} Implements methods for error analysis.
 * @example
 * ```typescript
 * const enhancer = new ErrorAnalysisEnhancer();
 * ```
 * [[include:enhancers/erroranalysisenhancer.md]]
 */
export class ErrorAnalysisEnhancer implements ErrorAnalysisInterface {
  /**
   * @private
   * @property {Error | undefined}
   * @description Holds the original error object.
   * @default Initially set to undefined.
   * @example
   * ```typescript
   * // Not intended for direct access outside the class.
   * ```
   */
  private _originalError: Error | undefined = undefined;

  /**
   * @private
   * @property {Array<StackFrame>}
   * @description Holds the parsed stack trace details.
   * @default Initially set to an empty array.
   * @example
   * ```typescript
   * // Not intended for direct access outside the class.
   * ```
   */
  private _parsedStack: Array<StackFrame> = [];

  /**
   * @private
   * @property {Map<Error, Array<StackFrame>>}
   * @description Holds a cache for parsed stack traces.
   * @default Initially set to an empty Map.
   * @example
   * ```typescript
   * // Not intended for direct access outside the class.
   * ```
   */
  private static _stackCache: Map<Error, Array<StackFrame>> = new Map();

  /**
   * @constructor
   * @description Initializes a new instance of the ErrorAnalysisEnhancer class.
   * @example
   * ```typescript
   * const enhancer = new ErrorAnalysisEnhancer();
   * ```
   */
  constructor() {}

  /**
   * @method
   * @public
   * @description Sets the original error object and triggers the extraction of error information.
   * @param {Error} originalError - The original error object to set.
   * @returns {this} Returns the instance for method chaining.
   * @example
   * ```typescript
   * enhancer.setOriginalError(new Error('Something went wrong'));
   * ```
   */
  public setOriginalError(originalError: Error): this {
    this._originalError = originalError;
    this._extractErrorInfo();
    return this;
  }

  /**
   * @public
   * @readonly
   * @property {Error | undefined}
   * @description Returns the original error object.
   * @example
   * ```typescript
   * const original = enhancer.originalError;
   * ```
   */
  public get originalError(): Error | undefined {
    return this._originalError;
  }

  /**
   * @method
   * @private
   * @description Extracts detailed error information from the stack trace.
   * @returns {this} Returns the instance for method chaining.
   * @example
   * ```typescript
   * // Not intended for direct access outside the class.
   * ```
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
    ErrorAnalysisEnhancer._stackCache.set(
      this._originalError!,
      this._parsedStack,
    );

    return this;
  }

  /**
   * @public
   * @readonly
   * @property {Array<StackFrame>}
   * @description Returns the parsed stack trace details.
   * @example
   * ```typescript
   * const parsedStack = enhancer.parsedStack;
   * ```
   */
  public get parsedStack(): Array<StackFrame> {
    if (this._parsedStack === null) {
      this._extractErrorInfo();
    }
    return this._parsedStack!;
  }
}
