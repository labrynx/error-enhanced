/**
 * @enum
 * @group Enhancers
 * @category ApplicationState
 * @description Enumerates the possible environments where the application can run.
 * @example
 * ```typescript
 * const currentEnvironment = Environment.DEVELOPMENT;
 * ```
 */
export enum Environment {
  /**
   * @description Indicates the development environment, usually local and for debugging.
   */
  DEVELOPMENT = 'development',

  /**
   * @description Indicates the testing environment, used for automated tests.
   */
  TESTING = 'testing',

  /**
   * @description Indicates the staging environment, a pre-production setup.
   */
  STAGING = 'staging',

  /**
   * @description Indicates the production environment, where the live application runs.
   */
  PRODUCTION = 'production',

  /**
   * @description In case the environment is unknown.
   */
  UNKNOWN = 'unknown',
}
