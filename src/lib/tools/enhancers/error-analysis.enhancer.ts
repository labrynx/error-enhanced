import path from 'path';

/**
 * @class ErrorAnalysisEnhanced
 *
 * The ErrorAnalysisEnhanced class enhances an error object with details
 * like file information, line number, column number, etc.
 */
export class ErrorAnalysisEnhancer {
  private _originalError: Error | null = null;
  private _fileInfo: string = '';
  private _lineNumber: number = -1;
  private _columnNumber: number = -1;
  private _functionName: string = '';
  private _typeName: string = '';
  private _methodName: string = '';
  private _fullStack: string[] = [];

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
    this.extractErrorInfo();
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
   * @method extractErrorInfo
   * @returns {this} - Returns the instance for chaining.
   *
   * Extracts detailed error information from the stack trace.
   */
  private extractErrorInfo(): this {
    // Check if _originalError is available and get its stack trace
    const errStack = this._originalError
      ? this._originalError.stack ?? 'unknown'
      : 'unknown';

    // If no stack trace, return the instance as is
    if (errStack === 'unknown') {
      return this;
    }

    // Parse stack trace and populate _fullStack
    const stackList = errStack.split('\n').slice(1);
    this._fullStack = stackList;

    // Find the first relevant stack entry and populate other fields
    const firstRelevantStack = this.findFirstRelevantStack(stackList);
    if (firstRelevantStack) {
      this._fileInfo = path.basename(firstRelevantStack.file);
      this._lineNumber = firstRelevantStack.line;
      this._columnNumber = firstRelevantStack.column;
      this._functionName = firstRelevantStack.functionName;
      this._typeName = firstRelevantStack.typeName;
      this._methodName = firstRelevantStack.method;
    }
    return this;
  }

  /**
   * @private
   * @method findFirstRelevantStack
   * @param {string[]} stackList - The parsed stack trace.
   * @returns {object | null} - Returns the first relevant stack entry or null.
   *
   * Iterates through the stack trace to find the first relevant entry.
   */
  private findFirstRelevantStack(stackList: string[]): any | null {
    const stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i;
    const stackReg2 = /at\s+()(.*):(\d*):(\d*)/i;

    for (const s of stackList) {
      const sp = stackReg.exec(s) || stackReg2.exec(s);
      if (sp && sp.length === 5) {
        const functionName = sp[1];
        const file = sp[2];
        const line = parseInt(sp[3]);
        const column = parseInt(sp[4]);
        let typeName = '';
        let method = '';

        // Split function name into typeName and method if applicable
        if (functionName.includes('.')) {
          [typeName, method] = functionName.split('.');
        }

        // Filter out irrelevant stack entries
        if (!file.includes('error-enhanced') && !file.includes('node:')) {
          return {
            functionName,
            file,
            line,
            column,
            typeName,
            method,
          };
        }
      }
    }
    return null;
  }

  // Getter methods to access the private fields
  public get fileInfo(): string {
    return this._fileInfo;
  }

  public get lineNumber(): number {
    return this._lineNumber;
  }

  public get columnNumber(): number {
    return this._columnNumber;
  }

  public get functionName(): string {
    return this._functionName;
  }

  public get typeName(): string {
    return this._typeName;
  }

  public get methodName(): string {
    return this._methodName;
  }

  public get fullStack(): string[] {
    return this._fullStack;
  }
}
