import { StackFrame } from './stack-frame.interface';
export interface ErrorAnalysis {
  readonly originalError: Error | null;
  readonly parsedStack: Array<StackFrame>;

  setOriginalError(originalError: Error): this;
}
