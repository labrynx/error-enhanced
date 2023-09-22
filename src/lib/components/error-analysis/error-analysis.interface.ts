import { StackFrame } from './stack-frame.type';

/**
 * @interface ErrorAnalysisInterface
 *
 * The ErrorAnalysis interface defines the contract for classes that aim to
 * enhance and analyze error objects. Implementing classes should provide details
 * such as the original error object and a parsed stack trace.
 *
 * @property {Error | undefined } originalError
 * A readonly property that should return the original error object. If no error
 * has been set, it should return null.
 *
 * @property {Array<StackFrame>} parsedStack
 * A readonly property that should return an array of parsed stack frames. Each
 * frame should contain details like the function name, file name, line number,
 * and column number.
 *
 * @method setOriginalError(originalError: Error): this
 * A method that takes an original error object as a parameter. It should trigger
 * internal mechanisms to extract and store details from the error object.
 * Should return the instance for chaining.
 */
export interface ErrorAnalysisInterface {
  readonly originalError: Error | undefined;
  readonly parsedStack: Array<StackFrame>;

  setOriginalError(originalError: Error): this;
}
