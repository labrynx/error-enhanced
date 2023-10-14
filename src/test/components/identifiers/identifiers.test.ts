import * as crypto from 'crypto';

import {
  Severity,
  Category,
  IdentifiersInterface,
  IdentifiersEnhancer,
  ErrorEnhanced,
} from '../../../lib';

type ErrorEnhancedType = Error & IdentifiersInterface;

const setters = {
  setErrorCode: [
    5432,
    'errorCode',
    [
      [
        'Invalid Error Code: \'23456789876543234567876543\' is not a number',
        23456789876543234567876543n,
      ],
    ],
  ],
  setErrorCodePrefix: [
    'EE',
    'errorCodePrefix',
    [['Invalid Error Code Prefix: \'123\' is not a valid string', 123]],
  ],
  setErrorDescription: [
    'This is a description',
    'errorDescription',
    [['Invalid Error Description: \'123\' is not a valid string', 123]],
  ],
  setSeverity: [
    Severity.HIGH,
    'severity',
    [
      [
        `Invalid Severity level: '123' not in valid Severity: ${JSON.stringify(
          Severity,
        )}`,
        123,
      ],
    ],
  ],
  setCategory: [
    Category.NETWORK,
    'category',
    [
      [
        `Invalid Category level: '123' not in valid Category: ${JSON.stringify(
          Category,
        )}`,
        123,
      ],
    ],
  ],
};

describe('IdentifiersEnhancer', () => {
  let testeableError: ErrorEnhancedType;

  beforeEach(() => {
    testeableError = new ErrorEnhanced([
      new IdentifiersEnhancer(),
    ]) as ErrorEnhancedType;
  });

  describe('Basic Properties', () => {
    Object.keys(setters).forEach(setter => {
      const [validValue, getter, invalidTestCases] = setters[setter];
      describe(`${setter} Method & ${getter} getter`, () => {
        it(`should set value correctly using ${setter}`, () => {
          testeableError[setter](validValue);
          expect(testeableError[getter]).toEqual(validValue);
        });

        if (invalidTestCases.length > 0) {
          it(`should throw error for invalid input using ${setter}`, () => {
            invalidTestCases.forEach(([message, invalidValue]) => {
              expect(() => testeableError[setter](invalidValue)).toThrow(
                message,
              );
            });
          });
        }
      });
    });
  });

  describe('Other Properties', () => {
    it('should get error hashed value correctly', () => {
      const str = JSON.stringify(testeableError);
      const hashedTesteableError = crypto
        .createHash('md5')
        .update(str)
        .digest('hex');

      expect(testeableError.getHash()).toBe(hashedTesteableError);
    });

    it('should get a valid UUID for id', () => {
      const id = testeableError.id;
      expect(typeof id).toBe('string');
      expect(id).not.toBe('');
    });

    it('should get a valid timestamp', () => {
      expect(typeof testeableError.timestamp).toBe('number');
      expect(testeableError.timestamp).toBeGreaterThanOrEqual(0);
    });

    it('should get a valid highPrecisionTimestamp', () => {
      expect(typeof testeableError.highPrecisionTimestamp).toBe('string');
      expect(
        BigInt(testeableError.highPrecisionTimestamp),
      ).toBeGreaterThanOrEqual(0n);
    });
  });
});
