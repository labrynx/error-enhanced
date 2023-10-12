/**
 * @group Enhancers
 * @category HttpStatus
 * @enum
 * @description Enumerates the HTTP methods supported by the application. These HTTP methods correspond to the CRUD operations
 *              (Create, Read, Update, Delete) in the context of RESTful APIs.
 *
 * GET    - Used for reading resources without side-effects.
 * POST   - Used for creating new resources.
 * PATCH  - Used for partial updates to existing resources.
 * PUT    - Used for full updates or creating a resource if it doesn't exist.
 * DELETE - Used for deleting resources.
 *
 * @example
 * ```typescript
 * const method = HttpMethods.GET;  // sets the method to 'get'
 * ```
 *
 * @note
 * - When using `HttpMethods.POST`, make sure the request payload conforms to the API schema.
 * - `HttpMethods.PATCH` is not idempotent, unlike `HttpMethods.PUT`.
 * - `HttpMethods.DELETE` should be used cautiously, as it removes resources.
 *
 * @see RFC 2616 Section 9 for the HTTP/1.1 specification: https://tools.ietf.org/html/rfc2616#section-9
 */
export enum HttpMethods {
  GET = 'get',
  POST = 'post',
  PATCH = 'patch',
  PUT = 'put',
  DELETE = 'delete',
}
