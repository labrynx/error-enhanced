import { execSync } from 'child_process';

import { ValidString } from '../../../shared/validators';

import { ApplicationStateInterface } from '../interfaces/application-state.interface';
import { CommandExecutor } from '../helpers/command-executor';

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

  private _commandExecutor: CommandExecutor;

  /**
   * @constructor
   * Constructs a new ApplicationStateEnhancer object and initializes it with
   * environment variables and fetches package dependencies.
   */
  constructor() {
    this._commandExecutor = new CommandExecutor();
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
   * @async
   * Fetches the dependencies from the package manager.
   *
   * @returns {Promise<Record<string, string> | null>}
   * A promise that resolves to a Record containing dependency names as keys and their versions as values.
   * Returns null if fetching fails or if no package manager is detected.
   */
  private async _fetchDependencies(): Promise<any> {
    const currentTime = Date.now();

    if (this._isCacheValid(currentTime)) {
      return this._dependenciesCache;
    }

    const packageManager = this._detectPackageManager();
    if (!packageManager) {
      return null;
    }

    try {
      const output = await this._executeCommand(
        `${packageManager} list --json`,
      );
      this._parseAndCacheDependencies(output, currentTime);
      return this._dependencies;
    } catch (error) {
      this._handleAppStateError(error as any, '_fetchDependencies');
      return null;
    }
  }

  /**
   * @private
   * Checks if the cache is still valid based on the last fetch time.
   *
   * @param {number} currentTime - The current time in milliseconds since the Unix epoch.
   * @returns {boolean} True if the cache is valid, false otherwise.
   */
  private _isCacheValid(currentTime: number): boolean {
    if (this._dependenciesCache) {
      return currentTime - this._lastFetchTime < 300000;
    }
    return false;
  }

  /**
   * @private
   * Detects the package manager used in the current environment.
   *
   * @returns {string | null} The detected package manager or null if none found.
   */
  private _detectPackageManager(): string | null {
    const managers = ['npm', 'yarn', 'pnpm'];
    for (const manager of managers) {
      if (this._isPackageManagerInstalled(manager)) {
        return manager;
      }
    }
    return null;
  }

  /**
   * @private
   * @async
   * Executes a shell command.
   *
   * @param {string} command - The shell command to execute.
   * @returns {Promise<string>} A promise that resolves to the standard output of the executed command.
   */
  private async _executeCommand(command: string): Promise<string> {
    return this._commandExecutor.execute(command);
  }

  /**
   * @private
   * Parses and caches the dependencies.
   *
   * @param {string} output - The JSON-formatted string output from the package manager.
   * @param {number} currentTime - The current time in milliseconds since the Unix epoch.
   */
  private _parseAndCacheDependencies(
    output: string,
    currentTime: number,
  ): void {
    try {
      const parsed = JSON.parse(output);
      this._dependencies = parsed.dependencies || {};
      this._dependenciesCache = this._dependencies;
      this._lastFetchTime = currentTime;
    } catch (e) {
      this._handleAppStateError(
        new Error(`Failed to parse JSON: ${e as any}`),
        '_parseAndCacheDependencies',
      );
      return;
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
