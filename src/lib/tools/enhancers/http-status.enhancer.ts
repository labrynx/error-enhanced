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
  private _httpStatusCode: number = -1; // HTTP Status Code
  private _url: string = ''; // The URL where the error occurred.
  private _httpMethod: string = ''; // The HTTP method (GET, POST, etc.) for the request that caused the error.
  private _requestHeaders: { [key: string]: any } = {}; // The headers of the HTTP request.
  private _responseHeaders: { [key: string]: any } = {}; // The headers in the HTTP response.
  private _queryParams: { [key: string]: any } = {}; // Query parameters in the URL.
  private _requestBody: any = null; // The body of the HTTP request.
  private _responseBody: any = null; // The body of the HTTP response.
  private _clientIp: string = ''; // The IP address of the client that made the request.
  private _latency: number = -1; // The time taken for the request to complete.

  public static HttpStatusCodes = HttpStatusCodes; // Expose HttpStatusCodes enum for external use
  public static HttpMethods = HttpMethods; // Expose HttpMethods enum for external use

  /**
   * @constructor
   *
   * Constructs a new HttpStatusEnhancer object and sets the initial HTTP status code.
   *
   * @param httpStatusCode - The initial HTTP status code for the error object.
   */
  constructor() {}

  /**
   * httpStatusCode
   *
   * Getter method for the HTTP status code.
   *
   * @returns The HTTP status code related to the error.
   */
  public get httpStatusCode(): number {
    return this._httpStatusCode;
  }

  /**
   * httpStatusCode
   *
   * Getter method for the HTTP status code.
   *
   * @returns The HTTP status code related to the error.
   */
  public get url(): string {
    return this._url;
  }

  /**
   * httpMethod
   *
   * Getter method for the HTTP method.
   *
   * @returns The HTTP method related to the error.
   */
  public get httpMethod(): string {
    return this._httpMethod;
  }

  /**
   * setHttpStatusCode
   *
   * Sets the HTTP status code related to the error.
   *
   * @param httpStatusCode - The HTTP status code.
   * @throws Will throw an error if the provided status code is not a valid HTTP status code.
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
   * setUrl
   *
   * Sets the URL where the error occurred.
   *
   * @param url - The URL string.
   * @throws Will throw an error if the URL is not valid.
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
   * setHttpMethod
   *
   * Sets the HTTP method for the request that caused the error.
   *
   * @param httpMethod - The HTTP method (GET, POST, etc.)
   * @throws Will throw an error if the method is not a valid HTTP method.
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
   * setRequestHeaders
   *
   * Sets the HTTP request headers.
   *
   * @param headers - The headers object.
   * @throws Will throw an error if the headers object contains invalid keys.
   */
  public setRequestHeaders(headers: { [key: string]: any }): this {
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
   * setResponseHeaders
   *
   * Sets the HTTP response headers.
   *
   * @param headers - The headers object.
   * @throws Will throw an error if the headers object contains invalid keys.
   */
  public setResponseHeaders(headers: { [key: string]: any }): this {
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
   * setQueryParams
   *
   * Sets the query parameters for the URL where the error occurred.
   *
   * @param params - The query parameters object.
   * @throws Will throw an error if the query parameters object contains invalid keys.
   */
  public setQueryParams(params: { [key: string]: any }): this {
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
   * setRequestBody
   *
   * Sets the body of the HTTP request.
   *
   * @param body - The request body.
   * @throws Will throw an error if the body is null or undefined.
   */
  public setRequestBody(body: any): this {
    if (body == null) {
      throw new Error('Request body cannot be null or undefined');
    }
    this._requestBody = body;
    return this;
  }

  /**
   * setResponseBody
   *
   * Sets the body of the HTTP response.
   *
   * @param body - The response body.
   * @throws Will throw an error if the body is null or undefined.
   */
  public setResponseBody(body: any): this {
    if (body == null) {
      throw new Error('Response body cannot be null or undefined');
    }
    this._responseBody = body;
    return this;
  }

  /**
   * setClientIp
   *
   * Sets the IP address of the client that made the request.
   *
   * @param ip - The IP address.
   * @throws Will throw an error if the IP address is not valid.
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
   * setLatency
   *
   * Sets the latency of the request in milliseconds.
   *
   * @param latency - The latency in milliseconds.
   * @throws Will throw an error if the latency is not a valid number.
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
