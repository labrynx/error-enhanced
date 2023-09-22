import { execSync } from 'child_process';

import { ApplicationStateInterface } from './application-state.interface';
import { ValidString } from '../../validators';

/**
 * @class ApplicationStateEnhancer
 *
 * The ApplicationStateEnhancer class enriches the error object with the current
 * state of the application, including environment variables, configurations,
 * and package dependencies.
 *
 * @example
 * ```typescript
 * const errorInfo = new ApplicationStateEnhancer();
 * errorInfo.setConfigurations({ apiEndpoint: "https://api.example.com" });
 * ```
 */
export class ApplicationStateEnhancer implements ApplicationStateInterface {
  /**
   * @private
   * @type {string}
   * The application's current environment (e.g., "production", "development").
   */
  private _environment: string = '';

  /**
   * @private
   * @type {string}
   * The version of Node.js in use.
   */
  private _nodeVersion: string = '';

  /**
   * @private
   * Application configurations that could affect behavior.
   */
  private _configurations: Record<string, any> = {};

  /**
   * @private
   * Environment variables captured at the time of instantiation.
   */
  private _envVars: Record<string, any> = {};

  /**
   * @private
   * A snapshot of application state at a given time.
   */
  private _stateSnapshot: Record<string, any> = {};

  /**
   * @private
   * A limited history of events that have been added to the instance.
   */
  private _eventHistory: string[] = [];

  /**
   * @private
   * Current package dependencies.
   */
  private _dependencies: Record<string, string> = {};

  /**
   * @private
   * Cached package dependencies.
   */
  private _dependenciesCache: Record<string, string> | undefined = undefined;

  /**
   * @private
   * Cache to store the availability of package managers ('npm', 'yarn', etc.).
   */
  private _packageManagerCache: Record<string, boolean> = {};

  /**
   * @private
   * The last time dependencies were fetched.
   */
  private _lastFetchTime: number = 0;

  /**
   * @constructor
   * Constructs a new ApplicationStateEnhancer object and initializes it with
   * environment variables and fetches package dependencies.
   */
  constructor() {
    this._environment = process.env.NODE_ENV || 'unknown';
    this._nodeVersion = process.version;
    this._envVars = process.env;
    this._fetchDependencies();
  }

  /**
   * @public
   * Sets the application configurations.
   *
   * @param {Record<string, any>} configs - The application configurations.
   * @returns {this} - The instance of the class, useful for chaining.
   *
   * @example
   * ```typescript
   * errorInfo.setConfigurations({ apiEndpoint: "https://api.example.com" });
   * ```
   */
  public setConfigurations(configs: Record<string, any>): this {
    this._configurations = configs;
    return this;
  }

  /**
   * @public
   * Sets a snapshot of the application state.
   *
   * @param {Record<string, any>} snapshot - The application state snapshot.
   * @returns {this} - The instance of the class, useful for chaining.
   */
  public setStateSnapshot(snapshot: Record<string, any>): this {
    this._stateSnapshot = snapshot;
    return this;
  }

  /**
   * @public
   * Sets a snapshot of the application state.
   *
   * @param {Record<string, any>} snapshot - The application state snapshot.
   * @returns {this} - The instance of the class, useful for chaining.
   */
  public addToEventHistory(event: string): this {
    this._eventHistory.push(event);
    if (this._eventHistory.length > 10) {
      this._eventHistory.shift();
    }
    return this;
  }

  /**
   * @public
   * @method setEnvironment
   * @param {string} environment - The application environment to set (e.g., "production", "development").
   * @returns {SystemContextEnhancer} - The instance of the class, useful for chaining.
   * @throws Will throw an error if the environment string is invalid.
   *
   * Sets the application environment.
   */
  public setEnvironment(environment: string): this {
    const parsed = ValidString.safeParse(environment);
    if (!parsed.success) {
      throw new Error('Invalid environment');
    }
    this._environment = environment;
    return this;
  }

  /**
   * @public
   * Gets the current application configurations.
   *
   * @returns {Record<string, any>} - The current application configurations.
   */
  public get configurations(): Record<string, any> {
    return this._configurations;
  }

  /**
   * @public
   * Gets the current environment variables.
   *
   * @returns {Record<string, any>} - The current environment variables.
   */
  public get envVars(): Record<string, any> {
    return this._envVars;
  }

  /**
   * @public
   * Gets the current state snapshot.
   *
   * @returns {Record<string, any>} - The current state snapshot.
   */
  public get stateSnapshot(): Record<string, any> {
    return this._stateSnapshot;
  }

  /**
   * Gets the application environment.
   *
   * @returns Name of the environment
   */
  public get environment(): string {
    return this._environment;
  }

  /**
   * Gets the Node.js version.
   *
   * @returns Node.js version
   */
  public get nodeVersion(): string {
    return this._nodeVersion;
  }

  /**
   * @public
   * Gets the event history.
   *
   * @returns {string[]} - The event history.
   */
  public get eventHistory(): string[] {
    return this._eventHistory;
  }

  /**
   * @public
   * Gets the current dependencies.
   *
   * @returns {Record<string, string>} - The current dependencies.
   */
  public get dependencies(): Record<string, string> {
    return this._dependencies;
  }

  /**
   * @private
   * Fetches the dependencies from the package manager.
   *
   * @returns {Record<string, string> | null} - The fetched dependencies or null if fetch fails.
   */
  private _fetchDependencies(): any {
    const currentTime = Date.now();

    // Check if cached data is recent (less than 5 minutes old)
    if (this._dependenciesCache && currentTime - this._lastFetchTime < 300000) {
      return this._dependenciesCache;
    }

    try {
      // Check for npm package manager
      if (this._isPackageManagerInstalled('npm')) {
        const output = execSync('npm list --json', { encoding: 'utf8' });
        const parsed = JSON.parse(output);
        this._dependencies = parsed.dependencies || {};

        // Update the cache and the last fetch time
        this._dependenciesCache = this._dependencies;
        this._lastFetchTime = currentTime;

        return this._dependencies;
      }
      // Check for yarn package manager
      else if (this._isPackageManagerInstalled('yarn')) {
        const output = execSync('yarn list --json', { encoding: 'utf8' });
        const lines = output.trim().split('\n');
        lines.forEach(line => {
          const parsed = JSON.parse(line);
          if (parsed.type === 'tree') {
            this._dependencies = parsed.data.trees;
          }
        });

        // Update the cache and the last fetch time
        this._dependenciesCache = this._dependencies;
        this._lastFetchTime = currentTime;

        return this._dependencies;
      }
      // Check for pnpm package manager
      else if (this._isPackageManagerInstalled('pnpm')) {
        const output = execSync('pnpm list --json', { encoding: 'utf8' });
        const parsed = JSON.parse(output);
        this._dependencies = parsed.dependencies || {};

        // Update the cache and the last fetch time
        this._dependenciesCache = this._dependencies;
        this._lastFetchTime = currentTime;

        return this._dependencies;
      }
    } catch (error) {
      // Handle the error if fetching dependencies fails
      this._handleAppStateError(error as Error, '_fetchDependencies');
      return null;
    }
  }

  /**
   * @private
   * Checks if a package manager is installed, with caching.
   *
   * @param {string} name - The name of the package manager.
   * @returns {boolean} - Whether the package manager is installed.
   */
  private _isPackageManagerInstalled(name: string): boolean {
    // Check if the result is already in the cache
    if (Object.prototype.hasOwnProperty.call(this._packageManagerCache, name)) {
      return this._packageManagerCache[name];
    }

    try {
      // Try to get the version of the package manager, if it throws an error it's not installed
      execSync(`${name} --version`, { stdio: 'ignore' });
      this._packageManagerCache[name] = true;
      return true;
    } catch (error) {
      // If the command throws an error, the package manager is not installed
      this._packageManagerCache[name] = false;
      return false;
    }
  }

  /**
   * @private
   * @method _handleAppStateError
   *
   * Handles application state errors, logging them to the console and throwing a new Error.
   *
   * @param {Error} e - The error object.
   * @param {string} context - The context in which the error occurred.
   * @throws {Error} - Throws a new Error with the formatted message.
   */
  private _handleAppStateError(e: Error, context: string) {
    const errorMsg = `Failed during ${context}: ${
      e.message || 'Unknown error'
    }`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }
}
