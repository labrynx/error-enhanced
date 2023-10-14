import ErrorStackParser from 'error-stack-parser';
import {
  ErrorAnalysisEnhancer,
  ErrorAnalysisInterface,
  ErrorEnhanced,
} from '../../../lib';

// Mock de ErrorStackParser.parse
jest.mock('error-stack-parser', () => ({
  parse: jest.fn(),
}));

type ErrorEnhancedType = Error & ErrorAnalysisInterface;

describe('ErrorAnalysisEnhancer', () => {
  let testeableError: ErrorEnhancedType;

  beforeEach(() => {
    testeableError = new ErrorEnhanced([
      new ErrorAnalysisEnhancer(),
    ]) as ErrorEnhancedType;
  });

  describe('Original Error Management', () => {
    describe('setOriginalError Method & originalError Getter', () => {
      it('should set the original error and trigger _extractErrorInfo', () => {
        const error = new Error('Test Error');
        (ErrorStackParser.parse as jest.Mock).mockReturnValue([]);
        testeableError.setOriginalError(error);
        expect(testeableError.originalError).toBe(error);
      });

      it('should return the original error', () => {
        const error = new Error('Test Error');
        testeableError.setOriginalError(error);
        expect(testeableError.originalError).toBe(error);
      });

      it('should return undefined if no original error is set', () => {
        expect(testeableError.originalError).toBeUndefined();
      });
    });
  });

  describe('Error Stack Analysis', () => {
    describe('_extractErrorInfo Private Method', () => {
      it('should extract error information from the stack trace', () => {
        const stackFrames = [
          {
            functionName: 'testFunction',
            fileName: 'testFile.js',
            lineNumber: 1,
            columnNumber: 1,
            typeName: 'testFunction',
          },
        ];
        const error = new Error('Test Error');
        (ErrorStackParser.parse as jest.Mock).mockReturnValue(stackFrames);
        testeableError.setOriginalError(error);
        expect(testeableError.parsedStack).toEqual(stackFrames);
      });

      it('should handle missing stack trace', () => {
        const error = new Error('Test Error');
        error.stack = undefined;
        (ErrorStackParser.parse as jest.Mock).mockReturnValue([]);
        testeableError.setOriginalError(error);
        expect(testeableError.parsedStack).toEqual([]);
      });
    });

    describe('parsedStack Getter', () => {
      it('should return parsed stack', () => {
        const stackFrames = [
          {
            functionName: 'testFunction',
            fileName: 'testFile.js',
            lineNumber: 1,
            columnNumber: 1,
            typeName: 'testFunction',
          },
        ];
        const error = new Error('Test Error');
        (ErrorStackParser.parse as jest.Mock).mockReturnValue(stackFrames);
        testeableError.setOriginalError(error);
        expect(testeableError.parsedStack).toEqual(stackFrames);
      });

      it('should use cached parsed stack if available', () => {
        const stackFrames = [
          {
            functionName: 'testFunction',
            fileName: 'testFile.js',
            lineNumber: 1,
            columnNumber: 1,
            typeName: 'testFunction',
          },
        ];
        const error = new Error('Test Error');
        (ErrorStackParser.parse as jest.Mock).mockReturnValue(stackFrames);
        testeableError.setOriginalError(error);
        (ErrorStackParser.parse as jest.Mock).mockClear();
        testeableError.setOriginalError(error);
        expect(ErrorStackParser.parse).not.toHaveBeenCalled();
      });

      it('should use default values when stack frames have null or undefined values', () => {
        const stackFrames = [
          {
            functionName: null,
            fileName: undefined,
            lineNumber: null,
            columnNumber: undefined,
          },
        ];
        const error = new Error('Test Error');
        (ErrorStackParser.parse as jest.Mock).mockReturnValue(stackFrames);
        testeableError.setOriginalError(error);

        expect(testeableError.parsedStack).toEqual([
          {
            functionName: 'unknown',
            fileName: 'unknown',
            lineNumber: -1,
            columnNumber: -1,
            typeName: 'unknown',
          },
        ]);
      });

      it('should use actual values when stack frames have valid values', () => {
        const stackFrames = [
          {
            functionName: 'testFunction',
            fileName: 'testFile.js',
            lineNumber: 1,
            columnNumber: 1,
          },
        ];
        const error = new Error('Test Error');
        (ErrorStackParser.parse as jest.Mock).mockReturnValue(stackFrames);
        testeableError.setOriginalError(error);

        expect(testeableError.parsedStack).toEqual([
          {
            functionName: 'testFunction',
            fileName: 'testFile.js',
            lineNumber: 1,
            columnNumber: 1,
            typeName: 'testFunction',
          },
        ]);
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
