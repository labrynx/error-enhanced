import os from 'os';
import path from 'path';
import { ValidString } from '../../validators/validators';

/**
 * @class SystemContextEnhancer
 *
 * The SystemContextEnhancer class enriches an error object with system-level
 * context, such as the originating module and method, as well as various system details.
 *
 * @example
 * const systemContext = new SystemContextEnhancer();
 * systemContext.setModule('AuthModule').setMethod('validateUser');
 */
export class SystemContextEnhancer {
  private _module: string = ''; // Module where the error originated
  private _method: string = ''; // Method where the error originated
  private _environment: string; // Application environment (e.g., "production", "development")
  private _nodeVersion: string; // Node.js version
  private _hostname: string; // System hostname
  private _cpuArch: string; // CPU architecture
  private _osType: string; // OS type
  private _osRelease: string; // OS release version
  private _systemUptime: number; // System uptime in seconds

  /**
   * @constructor
   *
   * Constructs a new SystemContextEnhancer object and initializes it with system context.
   */
  constructor() {
    // Capture originating module and method, and initialize system info
    this.captureModuleAndMethod();

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
   * Sets the name of the originating module.
   *
   * @param module - Name of the module
   * @returns this instance for chaining
   *
   * @example
   * systemContext.setModule('AuthModule');
   */
  public setModule(module: string): this {
    const parsed = ValidString.safeParse(module);
    if (!parsed.success) {
      throw new Error('Invalid module name');
    }
    this._module = module;
    return this;
  }

  /**
   * Gets the name of the originating module.
   *
   * @returns Name of the module
   */
  public get module(): string {
    return this._module;
  }

  /**
   * Sets the name of the originating method.
   *
   * @param method - Name of the method
   * @returns this instance for chaining
   *
   * @example
   * systemContext.setMethod('validateUser');
   */
  public setMethod(method: string): this {
    const parsed = ValidString.safeParse(method);
    if (!parsed.success) {
      throw new Error('Invalid method name');
    }
    this._method = method;
    return this;
  }

  /**
   * Gets the name of the originating method.
   *
   * @returns Name of the method
   */
  public get method(): string {
    return this._method;
  }

  /**
   * Gets the name of the originating method.
   *
   * @returns Name of the method
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
   * Refreshes the system uptime information.
   *
   * @returns this instance for chaining
   *
   * @example
   * systemContext.refreshSystemInfo();
   */
  public refreshSystemInfo(): this {
    this._systemUptime = os.uptime();
    return this;
  }

  // ====================================================================
  // Private methods
  // ====================================================================

  /**
   * Captures the originating module and method names from the call stack.
   * This is a private method and is called in the constructor to capture
   * the initial module and method context.
   */
  private captureModuleAndMethod(): this {
    const errStack = new Error().stack;
    if (!errStack) {
      this._module = 'unknown';
      this._method = 'unknown';
      return this;
    }

    const stackList = errStack.split('\n').slice(3);
    const stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi;
    const stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi;

    const s = stackList[0] || stackList[1] || 'unknown';
    const sp = stackReg.exec(s) || stackReg2.exec(s);

    if (sp && sp.length === 5) {
      this._method = sp[1];
      this._module = path.basename(sp[2]);
    }
    return this;
  }
}
