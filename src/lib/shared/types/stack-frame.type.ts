/**
 * @type {object} StackFrame
 * @group Enhancers
 * @category ErrorAnalysis
 *
 * @description
 * Represents a single frame in a stack trace.
 *
 * @property {string} functionName - The name of the function where the error occurred.
 * @property {string} fileName - The name of the file where the error occurred.
 * @property {number} lineNumber - The line number in the file where the error occurred.
 * @property {number} columnNumber - The column number in the line where the error occurred.
 * @property {string} typeName - The name of the object type that the function is a method of.
 */
export type StackFrame = {
  functionName: string;
  fileName: string;
  lineNumber: number;
  columnNumber: number;
  typeName: string;
};
