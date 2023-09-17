import os from 'os';
import { ValidString } from '../validators/string.validator';
import { SystemContext } from '../interfaces';

/**
 * @class SystemContextEnhancer
 *
 * The SystemContextEnhancer class enriches an error object with system-level
 * context, such as the originating module and method, as well as various system details.
 *
 * @example
 * const systemContext = new SystemContextEnhancer();
 * systemContext.setEnvironment('production').refreshSystemInfo();
 */
export class SystemContextEnhancer implements SystemContext {
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
   * @type {string}
   * The system's hostname.
   */
  private _hostname: string = '';

  /**
   * @private
   * @type {string}
   * The CPU architecture of the system.
   */
  private _cpuArch: string = '';

  /**
   * @private
   * @type {string}
   * The type of the operating system.
   */
  private _osType: string = '';

  /**
   * @private
   * @type {string}
   * The release version of the operating system.
   */
  private _osRelease: string = '';

  /**
   * @private
   * @type {number}
   * The system's uptime in seconds.
   */
  private _systemUptime: number = -1;

  /**
   * @constructor
   *
   * Constructs a new SystemContextEnhancer object and initializes it with system context.
   */
  constructor() {
    this._environment = process.env.NODE_ENV || 'unknown';
    this._nodeVersion = process.version;
    this._hostname = os.hostname();
    this._cpuArch = os.arch();
    this._osType = os.type();
    this._osRelease = os.release();
    this._systemUptime = os.uptime();
  }

  // ====================================================================
  // Getters & Setters
  // ====================================================================

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
   * Gets the system hostname.
   *
   * @returns System hostname
   */
  public get hostname(): string {
    return this._hostname;
  }

  /**
   * Gets the CPU architecture.
   *
   * @returns CPU architecture
   */
  public get cpuArch(): string {
    return this._cpuArch;
  }

  /**
   * Gets the OS type.
   *
   * @returns OS type
   */
  public get osType(): string {
    return this._osType;
  }

  /**
   * Gets the OS release version.
   *
   * @returns OS release version
   */
  public get osRelease(): string {
    return this._osRelease;
  }

  /**
   * Gets the system uptime in seconds.
   *
   * @returns System uptime
   */
  public get systemUptime(): number {
    return this._systemUptime;
  }

  // ====================================================================
  // Public methods
  // ====================================================================

  /**
   * @public
   * @method refreshSystemInfo
   * @returns {SystemContextEnhancer} - The instance of the class, useful for chaining.
   * @throws None.
   *
   * Refreshes the system uptime information. This method can be used to update the system uptime without
   * having to create a new instance of the class.
   */
  public refreshSystemInfo(): this {
    this._systemUptime = os.uptime();
    return this;
  }
}
