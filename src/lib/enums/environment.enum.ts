/**
 * Enum to represent the different environments where the application can run.
 */
export enum Environment {
  /**
   * Indicates the development environment, usually local and for debugging.
   */
  DEVELOPMENT = 'development',

  /**
   * Indicates the testing environment, used for automated tests.
   */
  TESTING = 'testing',

  /**
   * Indicates the staging environment, a pre-production setup.
   */
  STAGING = 'staging',

  /**
   * Indicates the production environment, where the live application runs.
   */
  PRODUCTION = 'production',

  /**
   * In case the environment is unknown.
   */
  UNKNOWN = 'unknown',
}
