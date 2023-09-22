import { HttpBody } from './http-body.type';
import { HttpHeaders } from './http-headers.type';
import { QueryParams } from './query-params.type';

/**
 * @interface HttpStatusInterface
 *
 * The HttpStatus interface defines the contract for classes that aim to
 * enrich error objects with HTTP-related information. This includes the HTTP status
 * code, HTTP method, URL, request and response headers, and more.
 *
 * @property {number} httpStatusCode
 * A readonly property that should return the HTTP status code. Should return -1 if not set.
 *
 * @property {string} url
 * A readonly property that should return the URL where the error occurred. Should return an empty string if not set.
 *
 * @property {string} httpMethod
 * A readonly property that should return the HTTP method (GET, POST, etc.) related to the error. Should return an empty string if not set.
 *
 * @method setHttpStatusCode(httpStatusCode: number): this
 * A method to set the HTTP status code related to the error. Should throw an error if the provided status code is not valid.
 *
 * @method setUrl(url: string): this
 * A method to set the URL where the error occurred. Should throw an error if the URL is not valid.
 *
 * @method setHttpMethod(httpMethod: string): this
 * A method to set the HTTP method for the request that caused the error. Should throw an error if the method is not a valid HTTP method.
 *
 * @method setRequestHeaders(headers: HttpHeaders): this
 * A method to set the headers for the HTTP request. Should throw an error if the headers object contains invalid keys.
 *
 * @method setResponseHeaders(headers: HttpHeaders): this
 * A method to set the headers for the HTTP response. Should throw an error if the headers object contains invalid keys.
 *
 * @method setQueryParams(params: QueryParams): this
 * A method to set the query parameters in the URL. Should throw an error if any key is not a valid non-empty string.
 *
 * @method setRequestBody(body: HttpBody): this
 * A method to set the body of the HTTP request. Should throw an error if the body is null or undefined.
 *
 * @method setResponseBody(body: HttpBody): this
 * A method to set the body of the HTTP response. Should throw an error if the body is null or undefined.
 *
 * @method setClientIp(ip: string): this
 * A method to set the IP address of the client that made the request. Should throw an error if the IP address is not valid.
 *
 * @method setLatency(latency: number): this
 * A method to set the latency of the request in milliseconds. Should throw an error if the latency is not a valid number.
 */
export interface HttpStatusInterface {
  readonly httpStatusCode: number;
  readonly url: string;
  readonly httpMethod: string;

  setHttpStatusCode(httpStatusCode: number): this;
  setUrl(url: string): this;
  setHttpMethod(httpMethod: string): this;
  setRequestHeaders(headers: HttpHeaders): this;
  setResponseHeaders(headers: HttpHeaders): this;
  setQueryParams(params: QueryParams): this;
  setRequestBody(body: HttpBody): this;
  setResponseBody(body: HttpBody): this;
  setClientIp(ip: string): this;
  setLatency(latency: number): this;
}
