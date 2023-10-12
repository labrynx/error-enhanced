import { StackFrame } from '../../../shared/types';

/**
 * @interface
 * @group Enhancers
 * @category ErrorAnalysis
 * @description Defines the contract for enhancing and analyzing error objects. Provides details like the original error object and parsed stack trace.
 * @example
 * ```typescript
 * class MyErrorAnalyzer implements ErrorAnalysisInterface {
 *   // implementation here
 * }
 * ```
 */
export interface ErrorAnalysisInterface {
  /**
   * @public
   * @readonly
   * @property {Error | undefined}
   * @description Should return the original error object. If no error has been set, it should return undefined.
   * @example
   * ```typescript
   * const originalError = myErrorAnalyzer.originalError;
   * ```
   */
  readonly originalError: Error | undefined;

  /**
   * @public
   * @readonly
   * @property {Array<StackFrame>}
   * @description Should return an array of parsed stack frames containing function name, file name, line number, and column number.
   * @example
   * ```typescript
   * const parsedStack = myErrorAnalyzer.parsedStack;
   * ```
   */
  readonly parsedStack: Array<StackFrame>;

  /**
   * @method
   * @public
   * @description Takes an original error object as a parameter and triggers internal mechanisms to extract and store details from the error object. Should return the instance for chaining.
   * @param {Error} originalError - The original error object to set.
   * @returns {this} Returns the instance for method chaining.
   * @example
   * ```typescript
   * myErrorAnalyzer.setOriginalError(new Error('Something went wrong'));
   * ```
   */
  setOriginalError(originalError: Error): this;
}
