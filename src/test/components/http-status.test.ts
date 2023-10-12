import {
  ErrorEnhanced,
  HttpStatusInterface,
  HttpStatusEnhancer,
  HttpStatusCodes,
  HttpMethods,
} from '../../lib';
import { HttpBody, HttpHeaders, QueryParams } from '../../lib/shared/types';

type ErrorEnhancedType = Error & HttpStatusInterface;

describe('HttpStatusEnhancer', () => {
  let testeableError: ErrorEnhancedType;

  beforeEach(() => {
    testeableError = new ErrorEnhanced([
      new HttpStatusEnhancer(),
    ]) as ErrorEnhancedType;
  });

  // Property Tests
  describe('Property Tests', () => {
    test('should have default properties', () => {
      expect(testeableError.httpStatusCode).toBe(-1);
      expect(testeableError.url).toBe('');
      expect(testeableError.httpMethod).toBe('');
    });
  });

  describe('Method Tests', () => {
    test('setHttpStatusCode should set valid HTTP status code', () => {
      testeableError.setHttpStatusCode(HttpStatusCodes.OK);
      expect(testeableError.httpStatusCode).toBe(HttpStatusCodes.OK);
    });

    test('setHttpStatusCode should throw error for invalid status code', () => {
      expect(() => {
        testeableError.setHttpStatusCode(999);
      }).toThrow('Invalid httpStatusCode');
    });

    test('setUrl should set valid URL', () => {
      const validUrl = 'https://example.com';
      testeableError.setUrl(validUrl);
      expect(testeableError.url).toBe(validUrl);
    });

    test('setUrl should throw error for invalid URL', () => {
      expect(() => {
        testeableError.setUrl('invalidUrl');
      }).toThrow('Invalid URL');
    });

    test('setHttpMethod should set valid HTTP method', () => {
      testeableError.setHttpMethod(HttpMethods.GET);
      expect(testeableError.httpMethod).toBe(HttpMethods.GET);
    });

    test('setHttpMethod should throw error for invalid HTTP method', () => {
      expect(() => {
        testeableError.setHttpMethod('INVALID_METHOD');
      }).toThrow('Invalid HTTP method');
    });

    test('setRequestHeaders should set valid headers', () => {
      const validHeaders: HttpHeaders = {
        key: 'Authorization',
        value: 'Bearer token',
      };
      testeableError.setRequestHeaders(validHeaders);
      expect(testeableError.requestHeaders).toEqual(validHeaders);
    });

    test('setRequestHeaders should throw error for invalid headers', () => {
      expect(() => {
        testeableError.setRequestHeaders({
          ' ': 'someValue',
        } as unknown as HttpHeaders);
      }).toThrow('Invalid headers: All keys must be valid non-empty strings');
    });

    test('setResponseHeaders should set valid headers', () => {
      const validHeaders: HttpHeaders = {
        key: 'Content-Type',
        value: 'application/json',
      };
      testeableError.setResponseHeaders(validHeaders);
      expect(testeableError.responseHeaders).toEqual(validHeaders);
    });

    test('setResponseHeaders should throw error for invalid headers', () => {
      expect(() => {
        testeableError.setResponseHeaders({
          ' ': 'someValue',
        } as unknown as HttpHeaders);
      }).toThrow('Invalid headers: All keys must be valid non-empty strings');
    });

    test('setQueryParams should set valid query parameters', () => {
      const validParams: QueryParams = { key: 'id', value: '1' };
      testeableError.setQueryParams(validParams);
      expect(testeableError.queryParams).toEqual(validParams);
    });

    test('setQueryParams should throw error for invalid query parameters', () => {
      expect(() => {
        testeableError.setQueryParams({
          ' ': 'someValue',
        } as unknown as QueryParams);
      }).toThrow(
        'Invalid query parameters: All keys must be valid non-empty strings',
      );
    });

    test('setRequestBody should set valid request body', () => {
      const validBody: HttpBody = { foo: 'bar' };
      testeableError.setRequestBody(validBody);
      expect(testeableError.requestBody).toEqual(validBody);
    });

    test('setRequestBody should throw error for null or undefined body', () => {
      expect(() => {
        testeableError.setRequestBody(null);
      }).toThrow('Request body cannot be null or undefined');
    });

    test('setResponseBody should set valid response body', () => {
      const validBody: HttpBody = { foo: 'bar' };
      testeableError.setResponseBody(validBody);
      expect(testeableError.responseBody).toEqual(validBody);
    });

    test('setResponseBody should throw error for null or undefined body', () => {
      expect(() => {
        testeableError.setResponseBody(null);
      }).toThrow('Response body cannot be null or undefined');
    });

    test('setClientIp should set valid IP address', () => {
      const validIp = '192.168.0.1';
      testeableError.setClientIp(validIp);
      expect(testeableError.clientIp).toBe(validIp);
    });

    test('setClientIp should throw error for invalid IP address', () => {
      expect(() => {
        testeableError.setClientIp('invalidIp');
      }).toThrow('Invalid IP address');
    });

    test('setLatency should set valid latency value', () => {
      const validLatency = 100;
      testeableError.setLatency(validLatency);
      expect(testeableError.latency).toBe(validLatency);
    });

    test('setLatency should throw error for invalid latency value', () => {
      expect(() => {
        testeableError.setLatency(-1);
      }).toThrow('Invalid latency value');
    });
  });

  describe('Getter Tests', () => {
    test('httpStatusCode getter should return the correct value', () => {
      testeableError.setHttpStatusCode(HttpStatusCodes.OK);
      expect(testeableError.httpStatusCode).toBe(HttpStatusCodes.OK);
    });

    test('url getter should return the correct value', () => {
      const validUrl = 'https://example.com';
      testeableError.setUrl(validUrl);
      expect(testeableError.url).toBe(validUrl);
    });

    test('latency getter should return the correct value', () => {
      const validLatency = 100;
      testeableError.setLatency(validLatency);
      expect(testeableError.latency).toBe(validLatency);
    });

    test('requestHeaders getter should return the correct value', () => {
      const validHeaders: HttpHeaders = {
        key: 'Authorization',
        value: 'Bearer token',
      };
      testeableError.setRequestHeaders(validHeaders);
      expect(testeableError.requestHeaders).toEqual(validHeaders);
    });

    test('responseHeaders getter should return the correct value', () => {
      const validHeaders: HttpHeaders = {
        key: 'Content-Type',
        value: 'application/json',
      };
      testeableError.setResponseHeaders(validHeaders);
      expect(testeableError.responseHeaders).toEqual(validHeaders);
    });

    test('requestBody getter should return the correct value', () => {
      const validBody: HttpBody = { foo: 'bar' };
      testeableError.setRequestBody(validBody);
      expect(testeableError.requestBody).toEqual(validBody);
    });

    test('responseBody getter should return the correct value', () => {
      const validBody: HttpBody = { foo: 'bar' };
      testeableError.setResponseBody(validBody);
      expect(testeableError.responseBody).toEqual(validBody);
    });

    test('httpMethod getter should return the correct value', () => {
      testeableError.setHttpMethod(HttpMethods.GET);
      expect(testeableError.httpMethod).toBe(HttpMethods.GET);
    });

    test('clientIp getter should return the correct value', () => {
      const validIp = '192.168.0.1';
      testeableError.setClientIp(validIp);
      expect(testeableError.clientIp).toBe(validIp);
    });
  });

  // Cleanup
  afterEach(() => {
    jest.clearAllMocks();
  });
});
