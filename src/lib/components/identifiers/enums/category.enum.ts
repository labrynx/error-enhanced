/**
 * @enum Category
 * @group Enhancers
 * @category Identifiers
 *
 * @example
 * ```typescript
 * const cat = Category.NETWORK;
 * ```
 *
 * [[include:enums/category.md]]
 */
export enum Category {
  /**
   * Errors related to network operations.
   */
  NETWORK = 'network',

  /**
   * Errors related to database operations.
   */
  DATABASE = 'database',

  /**
   * Errors related to input validation.
   */
  VALIDATION = 'validation',

  /**
   * Errors related to authentication.
   */
  AUTHENTICATION = 'authentication',

  /**
   * Errors related to authorization.
   */
  AUTHORIZATION = 'authorization',

  /**
   * Errors related to business logic.
   */
  BUSINESS_LOGIC = 'business_logic',

  /**
   * Errors related to configuration.
   */
  CONFIGURATION = 'configuration',

  /**
   * Errors related to deprecated features.
   */
  DEPRECATION = 'deprecation',

  /**
   * Errors related to the file system.
   */
  FILE_SYSTEM = 'file_system',

  /**
   * Errors related to performance issues.
   */
  PERFORMANCE = 'performance',

  /**
   * Errors related to security issues.
   */
  SECURITY = 'security',

  /**
   * Errors related to third-party services.
   */
  THIRD_PARTY = 'third_party',

  /**
   * Errors related to internal operations.
   */
  INTERNAL = 'internal',

  /**
   * Errors that are not categorized.
   */
  UNKNOWN = 'unknown',
}
