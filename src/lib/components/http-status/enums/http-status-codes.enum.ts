/**
 * @enum
 * @group Enhancers
 * @category HttpStatus
 * @description
 * `HttpStatusCodes` enum provides a comprehensive list of HTTP status codes.
 *
 * The enum is categorized as follows:
 * - 1XX: Informational Responses
 * - 2XX: Successful Responses
 * - 3XX: Redirection Messages
 * - 4XX: Client Errors
 * - 5XX: Server Errors
 *
 * Each member of the enum represents a specific HTTP status code,
 * which can be used to set the HTTP response status or to understand
 * the type of response received from an HTTP request.
 *
 * @usage
 * This enum is commonly used in HTTP response handling, error handling, and logging.
 *
 * Note that not all HTTP status codes are standardized, and some are
 * specific to certain web services. Therefore, it's crucial to consult
 * the relevant documentation when working with non-standard status codes.
 *
 * @see {@link https://www.rfc-editor.org/rfc/rfc9110#section-15 | RFC 9110 Section 15}
 * @see {@link https://en.wikipedia.org/wiki/List_of_HTTP_status_codes | Wikipedia: List of HTTP status codes}
 * @see {@link https://www.restapitutorial.com/httpstatuscodes.html | REST API Tutorial: HTTP Status Codes}
 * @example
 * ```typescript
 * if (response.status === HttpStatusCodes.OK) {
 *   // Handle OK response
 * }
 * ```
 */
export enum HttpStatusCodes {
  // 1XX - HTTP - Informational Response
  CONTINUE = 100, // The client should continue with its request
  SWITCHING_PROTOCOLS = 101, // Server switching protocols as requested
  PROCESSING = 102, // WebDAV: Server has received and is processing the request
  EARLY_HINTS = 103, // Return some response headers before the final HTTP message

  // 2XX - HTTP - Success
  OK = 200, // Standard response for successful HTTP requests
  CREATED = 201, // Resource has been created
  ACCEPTED = 202, // Request accepted but not yet processed
  NON_AUTHORITATIVE_INFORMATION = 203, // Information returned is from a transformed proxy
  NO_CONTENT = 204, // Request processed successfully but no content returned
  RESET_CONTENT = 205, // Request processed, no content returned, reset document view
  PARTIAL_CONTENT = 206, // Partial resource returned
  MULTI_STATUS = 207, // WebDAV: Multiple status codes for a single request
  ALREADY_REPORTED = 208, // WebDAV: Resource already reported in another part of the response
  IM_USED = 226, // Results follow after instance-manipulations

  // 3XX - HTTP - Redirection
  MULTIPLE_CHOICES = 300, // Multiple options for the resource
  MOVED_PERMANENTLY = 301, // Resource has moved permanently
  FOUND = 302, // Resource has moved temporarily
  SEE_OTHER = 303, // Resource can be found at another URI
  NOT_MODIFIED = 304, // Resource not modified since last request
  USE_PROXY = 305, // Resource must be accessed through a proxy
  TEMPORARY_REDIRECT = 307, // Temporary redirect that should not change the HTTP method for the request
  PERMANENT_REDIRECT = 308, // Permanent redirect

  // 4XX - HTTP - Client Errors
  BAD_REQUEST = 400, // Malformed request
  UNAUTHORIZED = 401, // Authentication required
  PAYMENT_REQUIRED = 402, // Reserved for future use
  FORBIDDEN = 403, // Valid request but server refuses to authorize it
  NOT_FOUND = 404, // Resource not found
  METHOD_NOT_ALLOWED = 405, // HTTP method not supported by the resource
  NOT_ACCEPTABLE = 406, // Resource not capable of generating content according to Accept headers
  PROXY_AUTHENTICATION_REQUIRED = 407, // Authentication required with the proxy
  REQUEST_TIMEOUT = 408, // Server timed out waiting for the request
  CONFLICT = 409, // Conflict in the request, such as an edit conflict
  GONE = 410, // Resource is no longer available and will not be available again
  LENGTH_REQUIRED = 411, // Content length must be specified
  PRECONDITION_FAILED = 412, // Server does not meet one of the preconditions of the request
  PAYLOAD_TOO_LARGE = 413, // Request payload is too large
  URI_TOO_LONG = 414, // URI is too long
  UNSUPPORTED_MEDIA_TYPE = 415, // Unsupported media type
  RANGE_NOT_SATISFIABLE = 416, // Requested range not satisfiable
  EXPECTATION_FAILED = 417, // Expectation in the Expect header could not be met
  IM_A_TEAPOT = 418, // April Fools' joke, should not be implemented by actual HTTP servers
  MISDIRECTED_REQUEST = 421, // Request was sent to a server that is not capable of producing a response
  UNPROCESSABLE_ENTITY = 422, // Request well-formed but semantically erroneous
  LOCKED = 423, // WebDAV: Resource is locked
  FAILED_DEPENDENCY = 424, // WebDAV: Request failed due to failure of a previous request
  TOO_EARLY = 425, // Indicates that the server is unwilling to risk processing a request that might be replayed
  UPGRADE_REQUIRED = 426, // Client should switch to a different protocol
  PRECONDITION_REQUIRED = 428, // Request must be conditional
  TOO_MANY_REQUESTS = 429, // Rate-limiting: Too many requests
  REQUEST_HEADER_FIELDS_TOO_LARGE = 431, // Header fields too large
  UNAVAILABLE_FOR_LEGAL_REASONS = 451, // Resource made unavailable due to legal reasons

  // 5XX - HTTP - Server Errors
  INTERNAL_SERVER_ERROR = 500, // Generic error, no specific message
  NOT_IMPLEMENTED = 501, // Server does not support the functionality required
  BAD_GATEWAY = 502, // Invalid response from an upstream server
  SERVICE_UNAVAILABLE = 503, // Server is currently unavailable
  GATEWAY_TIMEOUT = 504, // Timeout while server was acting as a gateway
  HTTP_VERSION_NOT_SUPPORTED = 505, // HTTP version not supported
  VARIANT_ALSO_NEGOTIATES = 506, // Content negotiation resulted in a circular reference
  INSUFFICIENT_STORAGE = 507, // WebDAV: Server cannot store the representation needed
  LOOP_DETECTED = 508, // WebDAV: Infinite loop detected
  NOT_EXTENDED = 510, // Further extensions needed for the request
  NETWORK_AUTHENTICATION_REQUIRED = 511, // Client needs to authenticate for network access
  NETWORK_READ_TIMEOUT_ERROR = 598, // Indicates that the server timed out while waiting for the client to send a request.
  NETWORK_CONNECT_TIMEOUT_ERROR = 599, // Indicates that the server timed out while trying to establish a connection or the client timed out while waiting for a server response.
}
