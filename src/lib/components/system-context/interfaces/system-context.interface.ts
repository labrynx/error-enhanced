/**
 * @interface SystemContextInterface
 *
 * The SystemContext interface defines the contract for classes that enrich
 * error objects with system-level context, such as the originating module
 * and method, as well as various system details like the application's
 * environment, Node.js version, hostname, etc.
 *
 * @property {string} environment
 * A readonly property that returns the application's current environment (e.g., "production", "development").
 *
 * @property {string} nodeVersion
 * A readonly property that returns the version of Node.js in use.
 *
 * @property {string} hostname
 * A readonly property that returns the system's hostname.
 *
 * @property {string} cpuArch
 * A readonly property that returns the CPU architecture of the system.
 *
 * @property {string} osType
 * A readonly property that returns the type of the operating system.
 *
 * @property {string} osRelease
 * A readonly property that returns the release version of the operating system.
 *
 * @property {number} systemUptime
 * A readonly property that returns the system's uptime in seconds.
 *
 * @method setEnvironment(environment: string): this
 * Sets the application environment. Should throw an error if the environment string is invalid.
 *
 * @method refreshSystemInfo(): this
 * Refreshes the system uptime information. Useful for updating the system uptime without creating a new instance.
 */
export interface SystemContextInterface {
  readonly hostname: string;
  readonly cpuArch: string;
  readonly osType: string;
  readonly osRelease: string;
  readonly systemUptime: number;

  refreshSystemInfo(): this;
}
