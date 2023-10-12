import * as crypto from 'crypto';

import {
  Severity,
  Category,
  IdentifiersInterface,
  IdentifiersEnhancer,
  ErrorEnhanced,
} from '../../lib';

type ErrorEnhancedType = Error & IdentifiersInterface;

// Test cases related to setters and getters
describe('Setters and Getters', () => {
  let testeableError: ErrorEnhancedType;

  beforeEach(() => {
    testeableError = new ErrorEnhanced([
      new IdentifiersEnhancer(),
    ]) as ErrorEnhancedType;
  });

  describe('Basic Properties', () => {
    it('should set and get errorCode correctly', () => {
      testeableError.setErrorCode(5432);
      expect(testeableError.errorCode).toBe(5432);
    });

    it('should set and get errorCodePrefix correctly', () => {
      testeableError.setErrorCodePrefix('EE');
      expect(testeableError.errorCodePrefix).toBe('EE');
    });

    it('should set and get errorDescription correctly', () => {
      testeableError.setErrorDescription('This is a description');
      expect(testeableError.errorDescription).toBe('This is a description');
    });

    it('should set and get severiy correctly', () => {
      testeableError.setSeverity(Severity.HIGH);
      expect(testeableError.severity).toBe(Severity.HIGH);
    });

    it('should set and get category correctly', () => {
      testeableError.setCategory(Category.NETWORK);
      expect(testeableError.category).toBe(Category.NETWORK);
    });

    it('should get error hashed value correctly', () => {
      const str = JSON.stringify(testeableError);
      const hashedTesteableError = crypto
        .createHash('md5')
        .update(str)
        .digest('hex');

      expect(testeableError.getHash()).toBe(hashedTesteableError);
    });

    test('should get a valid UUID for id', () => {
      const id = testeableError.id;
      expect(typeof id).toBe('string');
      expect(id).not.toBe('');
    });

    test('should throw error for invalid error code', () => {
      expect(() =>
        testeableError.setErrorCode(23456789876543234567876543n as any),
      ).toThrow(Error);
    });

    test('should throw error for invalid error code prefix', () => {
      expect(() => testeableError.setErrorCodePrefix(123 as any)).toThrow(
        Error,
      );
    });

    test('should throw error for invalid error description', () => {
      expect(() => testeableError.setErrorDescription(123 as any)).toThrow(
        Error,
      );
    });

    test('should throw error for invalid Severity', () => {
      expect(() => testeableError.setSeverity(123 as any)).toThrow(Error);
    });

    test('should throw error for invalid Category', () => {
      expect(() => testeableError.setCategory(123 as any)).toThrow(Error);
    });

    test('should get a valid timestamp', () => {
      expect(typeof testeableError.timestamp).toBe('number');
      expect(testeableError.timestamp).toBeGreaterThanOrEqual(0);
    });

    test('should get a valid highPrecisionTimestamp', () => {
      expect(typeof testeableError.highPrecisionTimestamp).toBe('string');
      expect(
        BigInt(testeableError.highPrecisionTimestamp),
      ).toBeGreaterThanOrEqual(0n);
    });
  });
});
