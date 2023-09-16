export interface ErrorAnalysis {
  readonly originalError: Error | null;
  readonly fileInfo: string;
  readonly lineNumber: number;
  readonly columnNumber: number;
  readonly functionName: string;
  readonly typeName: string;
  readonly methodName: string;
  readonly fullStack: string[];

  setOriginalError(originalError: Error): this;
}
