import {
  ValidHttpMethods,
  ValidHttpStatusCodes,
  ValidIP,
  ValidKeyedObject,
  ValidNumber,
  ValidURL,
} from '../../validators/validators';
import { HttpStatusCodes } from '../../enums/http-status-codes.enum';
import { HttpMethods } from '../../enums/http-methods.enum';
import { HttpStatus } from '../interfaces/http-status.interface';
import { HttpHeaders, QueryParams, HttpBody } from '../../types';

/**
 * @class HttpStatusEnhancer
 *
 * The HttpStatusEnhancer class enriches error objects with HTTP-specific information.
 * This includes the HTTP status code, request and response headers, and more.
 *
 * @example
 * const httpStatus = new HttpStatusEnhancer(HttpStatusCodes.OK);
 * httpStatus.setUrl("https://example.com").setLatency(120);
 */
export class HttpStatusEnhancer implements HttpStatus {
  /**
   * @private
   * @type {number}
   *
   * Holds the HTTP status code.
   */
  private _httpStatusCode: number = -1; // HTTP Status Code

  /**
   * @private
   * @type {string}
   *
   * Holds the URL where the error occurred.
   */
  private _url: string = '';

  /**
   * @private
   * @type {string}
   *
   * Holds the HTTP method (GET, POST, etc.) for the request that caused the error..
   */
  private _httpMethod: string = '';

  /**
   * @private
   * @type {HttpHeaders}
   *
   * Holds the headers of the HTTP request.
   */
  private _requestHeaders: HttpHeaders = {
    key: '',
    value: undefined,
  };

  /**
   * @private
   * @type {HttpHeaders}
   *
   * Holds the headers in the HTTP response.
   */
  private _responseHeaders: HttpHeaders = {
    key: '',
    value: undefined,
  };

  /**
   * @private
   * @type {QueryParams}
   *
   * Holds the query parameters in the URL.
   */
  private _queryParams: QueryParams = {
    key: '',
    value: undefined,
  };

  /**
   * @private
   * @type {HttpBody}
   *
   * Holds the body of the HTTP request.
   */
  private _requestBody: HttpBody = null;

  /**
   * @private
   * @type {HttpBody}
   *
   * Holds the body of the HTTP response.
   */
  private _responseBody: HttpBody = null;

  /**
   * @private
   * @type {string}
   *
   * Holds the IP address of the client that made the request.
   */
  private _clientIp: string = '';

  /**
   * @private
   * @type {number}
   *
   * Holds the time taken for the request to complete.
   */
  private _latency: number = -1;

  /**
   * @constructor
   *
   * Constructs a new HttpStatusEnhancer object.
   */
  constructor() {}

  /**
   * @public
   * @type {number}
   * @returns The HTTP status code related to the error.
   *
   * Getter method for the HTTP status code.
   */
  public get httpStatusCode(): number {
    return this._httpStatusCode;
  }

  /**
   * @public
   * @type {string}
   * @returns The HTTP status code related to the error.
   *
   * Getter method for the HTTP status code.
   */
  public get url(): string {
    return this._url;
  }

  /**
   * @public
   * @type {string}
   * @returns The HTTP method related to the error.
   *
   * Getter method for retrieving the HTTP method associated with the error.
   */
  public get httpMethod(): string {
    return this._httpMethod;
  }

  /**
   * @public
   * @method setHttpStatusCode
   * @param {number} httpStatusCode - The HTTP status code. Should be one of the values from the HttpStatusCodes enum.
   * @returns {this}
   * @throws Will throw an error if the provided status code is not a valid HTTP status code as per the HttpStatusCodes enum.
   *
   * Sets the HTTP status code related to the error. It's recommended to use values from the HttpStatusCodes enum for better consistency and readability.
   *
   * @see {@link HttpStatusCodes} for the available status codes.
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
   * @public
   * @method setUrl
   * @param {string} url - The URL string.
   * @returns {this}
   * @throws Will throw an error if the URL is not valid.
   *
   * Sets the URL where the error occurred.
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
   * @public
   * @method setHttpMethod
   * @param {string} httpMethod - The HTTP method (GET, POST, etc.)
   * @returns {this}
   * @throws Will throw an error if the method is not a valid HTTP method.
   *
   * Sets the HTTP method for the request that caused the error.
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
   * @public
   * @method setRequestHeaders
   * @param {HttpHeaders} headers - The headers object to set.
   * @returns {this}
   * @throws Will throw an error if the headers object contains invalid keys.
   *
   * Sets the HTTP request headers.
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
   * @public
   * @method setResponseHeaders
   * @param {HttpHeaders} headers - The headers object.
   * @returns {this}
   * @throws Will throw an error if the headers object contains invalid keys.
   *
   * Sets the HTTP response headers.
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
   * @public
   * @method setQueryParams
   * @param {QueryParams} params - The query parameters object to set.
   * @returns {this}
   * @throws Will throw an error if any key is not a valid non-empty string.
   *
   * Sets the query parameters for the URL where the error occurred.
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
   * @public
   * @method setRequestBody
   * @param {HttpBody} body - The request body to set.
   * @returns {this}
   * @throws Will throw an error if the body is null or undefined.
   *
   * Sets the body of the HTTP request. Accepts various data types except null or undefined.
   */
  public setRequestBody(body: HttpBody): this {
    if (body == null) {
      throw new Error('Request body cannot be null or undefined');
    }
    this._requestBody = body;
    return this;
  }

  /**
   * @public
   * @method setResponseBody
   * @param {HttpBody} body - The response body.
   * @returns {this}
   * @throws Will throw an error if the body is null or undefined.
   *
   * Sets the body of the HTTP response.
   */
  public setResponseBody(body: HttpBody): this {
    if (body == null) {
      throw new Error('Response body cannot be null or undefined');
    }
    this._responseBody = body;
    return this;
  }

  /**
   * @public
   * @method setClientIp
   * @param {string} ip - The IP address.
   * @returns {this}
   * @throws Will throw an error if the IP address is not valid.
   *
   * Sets the IP address of the client that made the request.
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
   * @public
   * @method setLatency
   * @param {number} latency - The latency in milliseconds.
   * @returns {this}
   * @throws Will throw an error if the latency is not a valid number.
   *
   * Sets the latency of the request in milliseconds.
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
