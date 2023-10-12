import { HttpStatusInterface } from './interfaces/http-status.interface';

import { HttpBody, HttpHeaders, QueryParams } from '../../shared/types';
import {
  ValidKeyedObject,
  ValidNumber,
  ValidHttpMethods,
  ValidHttpStatusCodes,
  ValidIP,
  ValidURL,
} from '../../shared/validators';

import { HttpMethods } from './enums/http-methods.enum';
import { HttpStatusCodes } from './enums/http-status-codes.enum';

/**
 * @class
 * @group Enhancers
 * @category HttpStatus
 * @description The HttpStatusEnhancer class serves as an enhancer for error objects, adding HTTP-specific details to them.
 *             The class provides functionality to attach various pieces of HTTP-related data, like the status code,
 *             request/response headers, and latency among others. This enriched information aids in debugging and
 *             error handling when dealing with HTTP-related operations. The class is particularly useful in applications
 *             like API gateways, HTTP middleware, and logging services where capturing the HTTP context is crucial.
 * @implements {HttpStatusInterface} Implements methods defined in HttpStatusInterface, ensuring that any class that
 *                                  extends HttpStatusEnhancer must provide implementations for enhancing HTTP status.
 * @example
 * ```typescript
 * // Creating a new instance of HttpStatusEnhancer
 * const httpStatus = new HttpStatusEnhancer();
 *
 * // Setting various HTTP-related properties
 * httpStatus.setHttpStatusCode(404)
 *            .setUrl('https://example.com')
 *            .setLatency(200);
 * ```
 * [[include:enhancers/httpstatusenhancer.md]]
 */
export class HttpStatusEnhancer implements HttpStatusInterface {
  /**
   * @private
   * @property {number}
   * @description Holds the HTTP status code.
   * @default Initially set to -1.
   * @example
   * ```typescript
   * // Not intended for direct access outside the class.
   * ```
   */
  private _httpStatusCode: number = -1; // HTTP Status Code

  /**
   * @private
   * @property {string}
   * @description Holds the URL where the error occurred.
   * @default Initially set to an empty string.
   * @example
   * ```typescript
   * // Not intended for direct access outside the class.
   * ```
   */
  private _url: string = '';

  /**
   * @private
   * @property {string}
   * @description Holds the HTTP method (GET, POST, etc.) for the request that caused the error.
   * @default Initially set to an empty string.
   * @example
   * ```typescript
   * // Not intended for direct access outside the class.
   * ```
   */
  private _httpMethod: string = '';

  /**
   * @private
   * @property {HttpHeaders}
   * @description Holds the headers of the HTTP request.
   * @default Initially set to an object with empty key and undefined value.
   * @example
   * ```typescript
   * // Not intended for direct access outside the class.
   * ```
   */
  private _requestHeaders: HttpHeaders = {
    key: '',
    value: undefined,
  };

  /**
   * @private
   * @property {HttpHeaders}
   * @description Holds the headers in the HTTP response.
   * @default Initially set to an object with empty key and undefined value.
   * @example
   * ```typescript
   * // Not intended for direct access outside the class.
   * ```
   */
  private _responseHeaders: HttpHeaders = {
    key: '',
    value: undefined,
  };

  /**
   * @private
   * @property {QueryParams}
   * @description Holds the query parameters in the URL.
   * @default Initially set to an object with empty key and undefined value.
   * @example
   * ```typescript
   * // Not intended for direct access outside the class.
   * ```
   */
  private _queryParams: QueryParams = {
    key: '',
    value: undefined,
  };

  /**
   * @private
   * @property {HttpBody}
   * @description Holds the body of the HTTP request.
   * @default Initially set to null.
   * @example
   * ```typescript
   * // Not intended for direct access outside the class.
   * ```
   */
  private _requestBody: HttpBody = null;

  /**
   * @private
   * @property {HttpBody}
   * @description Holds the body of the HTTP response.
   * @default Initially set to null.
   * @example
   * ```typescript
   * // Not intended for direct access outside the class.
   * ```
   */
  private _responseBody: HttpBody = null;

  /**
   * @private
   * @property {string}
   * @description Holds the IP address of the client that made the request.
   * @default Initially set to an empty string.
   * @example
   * ```typescript
   * // Not intended for direct access outside the class.
   * ```
   */
  private _clientIp: string = '';

  /**
   * @private
   * @property {number}
   * @description Holds the time taken for the request to complete.
   * @default Initially set to -1.
   * @example
   * ```typescript
   * // Not intended for direct access outside the class.
   * ```
   */
  private _latency: number = -1;

  /**
   * @constructor
   * @description Initializes a new instance of the HttpStatusEnhancer class.
   * @example
   * ```typescript
   * const httpStatus = new HttpStatusEnhancer();
   * ```
   */
  constructor() {}

  /**
   * @method
   * @public
   * @description Retrieves the HTTP status code associated with the error.
   * @returns {number} Returns the HTTP status code.
   * @example
   * ```typescript
   * const statusCode = httpStatus.httpStatusCode;
   * ```
   */
  public get httpStatusCode(): number {
    return this._httpStatusCode;
  }

  /**
   * @public
   * @readonly
   * @property {string}
   * @description Returns the URL related to the error.
   * @example
   * ```typescript
   * const url = httpStatus.url;
   * ```
   */
  public get url(): string {
    return this._url;
  }

  /**
   * @public
   * @readonly
   * @property {number}
   * @description Returns the latency related to the error in milliseconds.
   * @example
   * ```typescript
   * const latency = httpStatus.latency;
   * ```
   */
  public get latency(): number {
    return this._latency;
  }

  /**
   * @public
   * @readonly
   * @property {HttpHeaders}
   * @description Returns the request headers related to the error.
   * @example
   * ```typescript
   * const reqHeaders = httpStatus.requestHeaders;
   * ```
   */
  public get requestHeaders(): HttpHeaders {
    return this._requestHeaders;
  }

  /**
   * @public
   * @readonly
   * @property {HttpHeaders}
   * @description Returns the response headers related to the error.
   * @example
   * ```typescript
   * const resHeaders = httpStatus.responseHeaders;
   * ```
   */
  public get responseHeaders(): HttpHeaders {
    return this._responseHeaders;
  }

  /**
   * @public
   * @readonly
   * @property {HttpBody}
   * @description Returns the request body related to the error.
   * @example
   * ```typescript
   * const reqBody = httpStatus.requestBody;
   * ```
   */
  public get requestBody(): HttpBody {
    return this._requestBody;
  }

  /**
   * @public
   * @readonly
   * @property {HttpBody}
   * @description Returns the response body related to the error.
   * @example
   * ```typescript
   * const resBody = httpStatus.responseBody;
   * ```
   */
  public get responseBody(): HttpBody {
    return this._responseBody;
  }

  /**
   * @public
   * @readonly
   * @property {string}
   * @description Returns the HTTP method related to the error.
   * @example
   * ```typescript
   * const method = httpStatus.httpMethod;
   * ```
   */
  public get httpMethod(): string {
    return this._httpMethod;
  }

  /**
   * @public
   * @readonly
   * @property {string}
   * @description Returns the client IP address related to the error.
   * @example
   * ```typescript
   * const clientIP = httpStatus.clientIp;
   * ```
   */
  public get clientIp(): string {
    return this._clientIp;
  }

  /**
   * @public
   * @readonly
   * @property {QueryParams}
   * @description Returns the query parameters related to the error.
   * @example
   * ```typescript
   * const queryParams = httpStatus.queryParams;
   * ```
   */
  public get queryParams(): QueryParams {
    return this._queryParams;
  }

  /**
   * @method
   * @public
   * @description Sets the HTTP status code related to the error.
   * @param {number} httpStatusCode - The status code to set.
   * @returns {this} Returns the instance for method chaining.
   * @throws Will throw an error if the provided status code is not valid.
   * @example
   * ```typescript
   * httpStatus.setHttpStatusCode(404);
   * ```
   */
  public setHttpStatusCode(httpStatusCode: number): this {
    const parsed = ValidHttpStatusCodes.safeParse(httpStatusCode);
    if (!parsed.success) {
      throw new Error(
        `Invalid httpStatusCode: '${httpStatusCode}' not in valid HttpStatusCodes: ${JSON.stringify(
          HttpStatusCodes,
        )}`,
      );
    }
    this._httpStatusCode = httpStatusCode;
    return this;
  }

  /**
   * @method
   * @public
   * @description Sets the URL associated with the error.
   * @param {string} url - The URL to set.
   * @returns {this} Returns the instance for method chaining.
   * @throws Will throw an error if the URL is invalid.
   * @example
   * ```typescript
   * httpStatus.setUrl("https://example.com");
   * ```
   */
  public setUrl(url: string): this {
    const parsed = ValidURL.safeParse(url);
    if (!parsed.success) {
      throw new Error(`Invalid URL: '${url}'`);
    }
    this._url = url;
    return this;
  }

  /**
   * @method
   * @public
   * @description Sets the HTTP method used in the request causing the error.
   * @param {string} httpMethod - The HTTP method to set.
   * @returns {this} Returns the instance for method chaining.
   * @throws Will throw an error if the method is not valid.
   * @example
   * ```typescript
   * httpStatus.setHttpMethod("GET");
   * ```
   */
  public setHttpMethod(httpMethod: string): this {
    const parsed = ValidHttpMethods.safeParse(httpMethod);
    if (!parsed.success) {
      throw new Error(
        `Invalid HTTP method: '${httpMethod}' not in valid HttpMethods: ${JSON.stringify(
          HttpMethods,
        )}`,
      );
    }
    this._httpMethod = httpMethod;
    return this;
  }

  /**
   * @method
   * @public
   * @description Sets the request headers associated with the error.
   * @param {HttpHeaders} headers - The headers to set.
   * @returns {this} Returns the instance for method chaining.
   * @throws Will throw an error if the headers are invalid.
   * @example
   * ```typescript
   * httpStatus.setRequestHeaders({ "Content-Type": "application/json" });
   * ```
   */
  public setRequestHeaders(headers: HttpHeaders): this {
    const parsed = ValidKeyedObject.safeParse(headers);
    if (!parsed.success) {
      throw new Error(
        'Invalid headers: All keys must be valid non-empty strings',
      );
    }
    this._requestHeaders = headers;
    return this;
  }

  /**
   * @method
   * @public
   * @description Sets the response headers associated with the error.
   * @param {HttpHeaders} headers - The headers to set.
   * @returns {this} Returns the instance for method chaining.
   * @throws Will throw an error if the headers are invalid.
   * @example
   * ```typescript
   * httpStatus.setResponseHeaders({ "Content-Type": "application/json" });
   * ```
   */
  public setResponseHeaders(headers: HttpHeaders): this {
    const parsed = ValidKeyedObject.safeParse(headers);
    if (!parsed.success) {
      throw new Error(
        'Invalid headers: All keys must be valid non-empty strings',
      );
    }
    this._responseHeaders = headers;
    return this;
  }

  /**
   * @method
   * @public
   * @description Sets the query parameters in the URL associated with the error.
   * @param {QueryParams} params - The query parameters to set.
   * @returns {this} Returns the instance for method chaining.
   * @throws Will throw an error if any parameter is invalid.
   * @example
   * ```typescript
   * httpStatus.setQueryParams({ key1: "value1", key2: "value2" });
   * ```
   */
  public setQueryParams(params: QueryParams): this {
    const parsed = ValidKeyedObject.safeParse(params);
    if (!parsed.success) {
      throw new Error(
        'Invalid query parameters: All keys must be valid non-empty strings',
      );
    }
    this._queryParams = params;
    return this;
  }

  /**
   * @method
   * @public
   * @description Sets the request body associated with the error.
   * @param {HttpBody} body - The body to set.
   * @returns {this} Returns the instance for method chaining.
   * @throws Will throw an error if the body is null or undefined.
   * @example
   * ```typescript
   * httpStatus.setRequestBody({ key: "value" });
   * ```
   */
  public setRequestBody(body: HttpBody): this {
    if (body == null) {
      throw new Error('Request body cannot be null or undefined');
    }
    this._requestBody = body;
    return this;
  }

  /**
   * @method
   * @public
   * @description Sets the response body associated with the error.
   * @param {HttpBody} body - The body to set.
   * @returns {this} Returns the instance for method chaining.
   * @throws Will throw an error if the body is null or undefined.
   * @example
   * ```typescript
   * httpStatus.setResponseBody({ key: "value" });
   * ```
   */
  public setResponseBody(body: HttpBody): this {
    if (body == null) {
      throw new Error('Response body cannot be null or undefined');
    }
    this._responseBody = body;
    return this;
  }

  /**
   * @method
   * @public
   * @description Sets the client IP address associated with the error.
   * @param {string} ip - The IP address to set.
   * @returns {this} Returns the instance for method chaining.
   * @throws Will throw an error if the IP address is invalid.
   * @example
   * ```typescript
   * httpStatus.setClientIp("192.168.1.1");
   * ```
   */
  public setClientIp(ip: string): this {
    const parsed = ValidIP.safeParse(ip);
    if (!parsed.success) {
      throw new Error(`Invalid IP address: '${ip}'`);
    }
    this._clientIp = ip;
    return this;
  }

  /**
   * @method
   * @public
   * @description Sets the latency time associated with the error in milliseconds.
   * @param {number} latency - The latency time to set.
   * @returns {this} Returns the instance for method chaining.
   * @throws Will throw an error if the latency time is invalid.
   * @example
   * ```typescript
   * httpStatus.setLatency(100);
   * ```
   */
  public setLatency(latency: number): this {
    const parsed = ValidNumber.safeParse(latency);
    if (!parsed.success) {
      throw new Error(`Invalid latency value: ${latency}`);
    }
    this._latency = latency;
    return this;
  }
}
