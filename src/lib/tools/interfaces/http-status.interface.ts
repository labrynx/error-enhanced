export interface HttpStatus {
  readonly httpStatusCode: number;
  readonly url: string;
  readonly httpMethod: string;

  setHttpStatusCode(httpStatusCode: number): this;
  setUrl(url: string): this;
  setHttpMethod(httpMethod: string): this;
  setRequestHeaders(headers: { [key: string]: any }): this;
  setResponseHeaders(headers: { [key: string]: any }): this;
  setQueryParams(params: { [key: string]: any }): this;
  setRequestBody(body: any): this;
  setResponseBody(body: any): this;
  setClientIp(ip: string): this;
  setLatency(latency: number): this;
}
