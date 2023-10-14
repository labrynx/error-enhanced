import {
  ErrorEnhanced,
  HttpStatusInterface,
  HttpStatusEnhancer,
  HttpStatusCodes,
  HttpMethods,
} from '../../../lib';

type ErrorEnhancedType = Error & HttpStatusInterface;

describe('HttpStatusEnhancer', () => {
  let testeableError: ErrorEnhancedType;

  const setters = {
    setHttpStatusCode: [
      HttpStatusCodes.OK,
      'httpStatusCode',
      [['Invalid httpStatusCode', 999]],
    ],
    setUrl: ['https://example.com', 'url', [['Invalid URL', 'invalidUrl']]],
    setHttpMethod: [
      HttpMethods.GET,
      'httpMethod',
      [['Invalid HTTP method', 'INVALID_METHOD']],
    ],
    setRequestHeaders: [
      { key: 'Authorization', value: 'Bearer token' },
      'requestHeaders',
      [['Invalid headers', { ' ': 'someValue' }]],
    ],
    setResponseHeaders: [
      { key: 'Content-Type', value: 'application/json' },
      'responseHeaders',
      [['Invalid headers', { ' ': 'someValue' }]],
    ],
    setQueryParams: [
      { key: 'id', value: '1' },
      'queryParams',
      [['Invalid query parameters', { ' ': 'someValue' }]],
    ],
    setRequestBody: [
      { foo: 'bar' },
      'requestBody',
      [['Request body cannot be null or undefined', null]],
    ],
    setResponseBody: [
      { foo: 'bar' },
      'responseBody',
      [['Response body cannot be null or undefined', null]],
    ],
    setClientIp: [
      '192.168.0.1',
      'clientIp',
      [['Invalid IP address', 'invalidIp']],
    ],
    setLatency: [100, 'latency', [['Invalid latency value', -1]]],
  };

  beforeEach(() => {
    testeableError = new ErrorEnhanced([
      new HttpStatusEnhancer(),
    ]) as ErrorEnhancedType;
  });

  describe('Constructor', () => {
    it('should initialize all properties correctly', () => {
      expect(testeableError.httpStatusCode).toBe(-1);
      expect(testeableError.url).toBe('');
      expect(testeableError.httpMethod).toBe('');
      expect(testeableError.requestHeaders).toEqual({
        key: '',
        value: undefined,
      });
      expect(testeableError.responseHeaders).toEqual({
        key: '',
        value: undefined,
      });
      expect(testeableError.queryParams).toEqual({ key: '', value: undefined });
      expect(testeableError.requestBody).toBeNull();
      expect(testeableError.responseBody).toBeNull();
      expect(testeableError.clientIp).toBe('');
      expect(testeableError.latency).toBe(-1);
    });
  });

  describe('Getters & Setters', () => {
    Object.keys(setters).forEach(setter => {
      const [validValue, getter, invalidTestCases] = setters[setter];
      describe(`${setter} Method & ${getter} getter`, () => {
        it(`should set value correctly using ${setter}`, () => {
          testeableError[setter](validValue);
          expect(testeableError[getter]).toEqual(validValue);
        });

        it(`should throw error for invalid input using ${setter}`, () => {
          if (invalidTestCases) {
            invalidTestCases.forEach(([message, invalidValue]) => {
              expect(() => testeableError[setter](invalidValue)).toThrow(
                message,
              );
            });
          }
        });
      });
    });
  });
});
