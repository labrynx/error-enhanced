import { ValidString } from '../../shared/validators';

import { ApplicationStateInterface } from './interfaces/application-state.interface';
import { CommandExecutor } from './helpers/command-executor';

/**
 * @class
 * @group Enhancers
 * @category ApplicationState
 * @description Enhances error objects with the current state of the application, including environment variables, configurations, and package dependencies.
 * @implements {ApplicationStateInterface}
 * @example
 * ```typescript
 * const errorInfo = new ApplicationStateEnhancer();
 * errorInfo.setConfigurations({ apiEndpoint: "https://api.example.com" });
 * ```
 * [[include:enhancers/appstateenhancer.md]]
 */
export class ApplicationStateEnhancer implements ApplicationStateInterface {
  /**
   * @private
   * @property {string}
   * @description The application's current environment (e.g., "production", "development").
   */
  private _environment: string = '';

  /**
   * @private
   * @property {string}
   * @description The version of Node.js in use.
   */
  private _nodeVersion: string = '';

  /**
   * @private
   * @property {Record\<string, any>}
   * @description Application configurations that could affect behavior.
   */
  private _configurations: Record<string, any> = {};

  /**
   * @private
   * @property {Record\<string, any>}
   * @description Environment variables captured at the time of instantiation.
   */
  private _envVars: Record<string, any> = {};

  /**
   * @private
   * @property {Record\<string, any>}
   * @description A snapshot of application state at a given time.
   */
  private _stateSnapshot: Record<string, any> = {};

  /**
   * @private
   * @property {string[]}
   * @description A limited history of events that have been added to the instance.
   */
  private _eventHistory: string[] = [];

  /**
   * @private
   * @property {Record\<string, string>}
   * @description Current package dependencies.
   */
  private _dependencies: Record<string, string> = {};

  /**
   * @private
   * @property {Record\<string, string> | undefined}
   * @description Cached package dependencies.
   */
  private _dependenciesCache: Record<string, string> | undefined = undefined;

  /**
   * @private
   * @property {Record\<string, boolean>}
   * @description Cache to store the availability of package managers ('npm', 'yarn', etc.).
   */
  private _packageManagerCache: Record<string, boolean> = {};

  /**
   * @private
   * @property {Record\<string, boolean>}
   * @description Cache to store the availability of package managers ('npm', 'yarn', etc.).
   */
  private _lastFetchTime: number = 0;

  /**
   * @private
   * @property {CommandExecutor}
   * @description Handles the execution of shell commands.
   */
  private _commandExecutor: CommandExecutor;

  /**
   * @constructor
   * @description Initializes the ApplicationStateEnhancer class, capturing environment variables and fetching package dependencies.
   * @example
   * ```typescript
   * const errorInfo = new ApplicationStateEnhancer();
   * ```
   */
  constructor() {
    this._commandExecutor = new CommandExecutor();
    this._environment = process.env.NODE_ENV || 'unknown';
    this._nodeVersion = process.version;
    this._envVars = process.env;
    this._fetchDependencies();
  }

  /**
   * @method
   * @public
   * @description Sets the application configurations.
   * @param configs - The application configurations.
   * @throws {Error} Throws an error if configs is not an object or is null.
   * @returns {this} The instance of the class, useful for chaining.
   * @example
   * ```typescript
   * errorInfo.setConfigurations({ apiEndpoint: "https://api.example.com" });
   * ```
   */
  public setConfigurations(configs: Record<string, any>): this {
    if (typeof configs !== 'object' || configs === null) {
      throw new Error('Invalid configuration: Must be an object.');
    }
    this._configurations = configs;
    return this;
  }

  /**
   * @method
   * @public
   * @description Sets a snapshot of the application state.
   * @param snapshot - The application state snapshot.
   * @throws {Error} Throws an error if snapshot is not an object or is null.
   * @returns {this} The instance of the class, useful for chaining.
   * @example
   * ```typescript
   * errorInfo.setStateSnapshot({ key: "value" });
   * ```
   */
  public setStateSnapshot(snapshot: Record<string, any>): this {
    if (typeof snapshot !== 'object' || snapshot === null) {
      throw new Error('Invalid state snapshot: Must be an object.');
    }
    this._stateSnapshot = snapshot;
    return this;
  }

  /**
   * @method
   * @public
   * @description Adds an event to the event history.
   * @param event - The event to add.
   * @throws {Error} Throws an error if event is not a non-empty string.
   * @returns {this} The instance of the class, useful for chaining.
   * @example
   * ```typescript
   * errorInfo.addToEventHistory("User logged in");
   * ```
   */
  public addToEventHistory(event: string): this {
    if (typeof event !== 'string' || event.trim() === '') {
      throw new Error('Invalid event: Must be a non-empty string.');
    }
    this._eventHistory.push(event);
    if (this._eventHistory.length > 10) {
      this._eventHistory.shift();
    }
    return this;
  }

  /**
   * @method
   * @public
   * @description Sets the application environment.
   * @param environment - The application environment to set (e.g., "production", "development").
   * @returns {this} The instance of the class, useful for chaining.
   * @throws {Error} Throws an error if the environment string is invalid.
   * @example
   * ```typescript
   * errorInfo.setEnvironment("development");
   * ```
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
   * @readonly
   * @property {Record\<string, any>}
   * @description Gets the current application configurations.
   * @example
   * ```typescript
   * const configs = errorInfo.configurations;
   * ```
   */
  public get configurations(): Record<string, any> {
    return this._configurations;
  }

  /**
   * @public
   * @readonly
   * @property {Record\<string, any>}
   * @description Gets the current environment variables.
   * @returns {Record\<string, any>} The current environment variables.
   * @example
   * ```typescript
   * const currentEnvVars = errorInfo.envVars;
   * ```
   */
  public get envVars(): Record<string, any> {
    return this._envVars;
  }

  /**
   * @public
   * @readonly
   * @property {Record\<string, any>}
   * @description Gets the current state snapshot.
   * @returns {Record\<string, any>} The current state snapshot.
   * @example
   * ```typescript
   * const currentState = errorInfo.stateSnapshot;
   * ```
   */
  public get stateSnapshot(): Record<string, any> {
    return this._stateSnapshot;
  }

  /**
   * @public
   * @readonly
   * @property {string}
   * @description Gets the application environment.
   * @returns {string} Name of the environment.
   * @example
   * ```typescript
   * const env = errorInfo.environment;
   * ```
   */
  public get environment(): string {
    return this._environment;
  }

  /**
   * @public
   * @readonly
   * @property {string}
   * @description Gets the Node.js version.
   * @returns {string} Node.js version.
   * @example
   * ```typescript
   * const nodeVersion = errorInfo.nodeVersion;
   * ```
   */
  public get nodeVersion(): string {
    return this._nodeVersion;
  }

  /**
   * @public
   * @readonly
   * @property {string[]}
   * @description Gets the event history.
   * @returns {string[]} The event history.
   * @example
   * ```typescript
   * const history = errorInfo.eventHistory;
   * ```
   */
  public get eventHistory(): string[] {
    return this._eventHistory;
  }

  /**
   * @public
   * @readonly
   * @property {Record\<string, string>}
   * @description Gets the current dependencies.
   * @returns {Record\<string, string>} The current dependencies.
   * @example
   * ```typescript
   * const currentDeps = errorInfo.dependencies;
   * ```
   */
  public get dependencies(): Record<string, string> {
    return this._dependencies;
  }

  /**
   * @method
   * @async
   * @private
   * @description Fetches the dependencies from the package manager.
   * @returns {any} A Record containing dependency names as keys and their versions as values. Returns null if fetching fails or if no package manager is detected.
   * @throws {Error} Throws an error if the fetching process fails.
   * @example
   * ```typescript
   * const dependencies = this._fetchDependencies();
   * ```
   */
  private _fetchDependencies(): any {
    const currentTime = Date.now();

    if (this._isCacheValid(currentTime)) {
      return this._dependenciesCache;
    }

    const packageManager = this._detectPackageManager();
    if (!packageManager) {
      return null;
    }

    try {
      const output = this._executeCommand(`${packageManager} list --json`);
      this._parseAndCacheDependencies(output, currentTime);
      return this._dependencies;
    } catch (error) {
      this._handleAppStateError(error as any, '_fetchDependencies');
    }
  }

  /**
   * @method
   * @private
   * @description Checks if the cache is still valid based on the last fetch time.
   * @param currentTime - The current time in milliseconds since the Unix epoch.
   * @returns {boolean} True if the cache is valid, false otherwise.
   * @example
   * ```typescript
   * const isValid = this._isCacheValid(Date.now());
   * ```
   */
  private _isCacheValid(currentTime: number): boolean {
    if (this._dependenciesCache) {
      return currentTime - this._lastFetchTime < 300000;
    }
    return false;
  }

  /**
   * @method
   * @private
   * @description Detects the package manager used in the current environment.
   * @returns {string | null} The detected package manager or null if none found.
   * @example
   * ```typescript
   * const manager = this._detectPackageManager();
   * ```
   */
  private _detectPackageManager(): string | null {
    const managers = ['npm', 'yarn', 'pnpm'];
    for (const manager of managers) {
      const isInstalled = this._isPackageManagerInstalled(manager);
      if (isInstalled) {
        return manager;
      }
    }
    return null;
  }

  /**
   * @method
   * @private
   * @description Executes a shell command.
   * @param command - The shell command to execute.
   * @returns {string} Standard output of the executed command.
   * @example
   * ```typescript
   * const output = this._executeCommand('npm list --json');
   * ```
   */
  private _executeCommand(command: string): string {
    const com = this._commandExecutor.execute(command);
    return com;
  }

  /**
   * @method
   * @private
   * @description Parses and caches the dependencies.
   * @param output - The JSON-formatted string output from the package manager.
   * @param currentTime - The current time in milliseconds since the Unix epoch.
   * @example
   * ```typescript
   * this._parseAndCacheDependencies(output, Date.now());
   * ```
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
      const errorMsg = `Failed to parse JSON: ${
        (e as any).message
      }. JSON Content: ${output}`;
      this._handleAppStateError(
        new Error(`Failed to parse JSON: ${e as any}`),
        '_parseAndCacheDependencies',
      );
    }
  }

  /**
   * @method
   * @private
   * @description Checks if a package manager is installed, with caching.
   * @param name - The name of the package manager.
   * @returns {boolean} Whether the package manager is installed.
   * @example
   * ```typescript
   * const isInstalled = this._isPackageManagerInstalled('npm');
   * ```
   */
  private _isPackageManagerInstalled(name: string): boolean {
    // Check if the result is already in the cache
    if (Object.prototype.hasOwnProperty.call(this._packageManagerCache, name)) {
      return this._packageManagerCache[name];
    }

    try {
      // Try to get the version of the package manager; if it throws an error, it's not installed
      this._executeCommand(`${name} --version`);
      this._packageManagerCache[name] = true;
      return true;
    } catch (error) {
      // If the command throws an error, the package manager is not installed
      this._packageManagerCache[name] = false;
      return false;
    }
  }

  /**
   * @method
   * @private
   * @description Handles application state errors, logging them to the console and throwing a new Error.
   * @param e - The error object.
   * @param context - The context in which the error occurred.
   * @throws {Error} Throws a new Error with the formatted message.
   * @example
   * ```typescript
   * this._handleAppStateError(new Error('Something went wrong'), '_fetchDependencies');
   * ```
   */
  private _handleAppStateError(e: Error, context: string) {
    const errorMsg = `Failed during ${context}: ${
      e.message || 'Unknown error'
    }`;
    console.error(errorMsg);
    throw new Error(errorMsg);
  }
}
