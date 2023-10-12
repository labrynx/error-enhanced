/**
 * @interface
 * @group Enhancers
 * @category ApplicationState
 * @description Defines the contract for managing the application's state. Information includes environment, Node.js version, and state snapshots. Implemented by ApplicationStateEnhancer.
 * @example
 * ```typescript
 * class AppStateManager implements ApplicationStateInterface {
 *   // implementation here
 * }
 * ```
 */
export interface ApplicationStateInterface {
  /**
   * @public
   * @readonly
   * @property {string}
   * @description Stores the current environment of the application, such as 'production' or 'development'. The property is read-only once set by setEnvironment().
   * @default Initially set to 'unknown'.
   * @example
   * ```typescript
   * const env = appState.environment;
   * ```
   */
  readonly environment: string;

  /**
   * @public
   * @readonly
   * @property {string}
   * @description Stores the Node.js version of the running application. The property is read-only and is set during the class instantiation.
   * @default Node.js version available at runtime.
   * @example
   * ```typescript
   * const nodeVersion = appState.nodeVersion;
   * ```
   */
  readonly nodeVersion: string;

  /**
   * @public
   * @readonly
   * @property {Record<string, any>}
   * @description Contains a snapshot of the application's current state. The property is read-only once set by setStateSnapshot().
   * @default Initially set to an empty object.
   * @example
   * ```typescript
   * const snapshot = appState.stateSnapshot;
   * ```
   */
  readonly stateSnapshot: Record<string, any>;

  /**
   * @public
   * @readonly
   * @property {string[]}
   * @description Stores the history of events in the application. Events are added using addToEventHistory().
   * @default Initially set to an empty array.
   * @example
   * ```typescript
   * const history = appState.eventHistory;
   * ```
   */
  readonly eventHistory: string[];

  /**
   * @public
   * @readonly
   * @property {Record<string, string>}
   * @description Contains the list of application dependencies. Fetched and set during object instantiation.
   * @default Initially set to an empty object.
   * @example
   * ```typescript
   * const deps = appState.dependencies;
   * ```
   */
  readonly dependencies: Record<string, string>;

  /**
   * @public
   * @readonly
   * @property {Record<string, any>}
   * @description Contains various configuration settings. The property is read-only once set by setConfigurations().
   * @default Initially set to an empty object.
   * @example
   * ```typescript
   * const configs = appState.configurations;
   * ```
   */
  readonly configurations: Record<string, any>;

  /**
   * @public
   * @readonly
   * @property {Record<string, any>}
   * @description Contains various configuration settings. The property is read-only once set by setConfigurations().
   * @default Initially set to an empty object.
   * @example
   * ```typescript
   * const configs = appState.configurations;
   * ```
   */
  readonly envVars: Record<string, any>;

  /**
   * @method
   * @public
   * @description Adds an event to the event history. Maintains the last 10 events.
   * @param {string} event - The event to add.
   * @returns {this} Returns the current instance for chaining.
   * @example
   * ```typescript
   * appState.addToEventHistory('User Login');
   * ```
   */
  addToEventHistory(event: string): this;

  /**
   * @method
   * @public
   * @description Sets the environment of the application after validating it through ValidString.safeParse().
   * @param {string} environment - The environment to set.
   * @returns {this} Returns the current instance for chaining.
   * @throws {Error} Throws an error if the environment string is invalid.
   * @example
   * ```typescript
   * appState.setEnvironment('production');
   * ```
   */
  setEnvironment(environment: string): this;

  /**
   * @method
   * @public
   * @description Sets the configurations for the application.
   * @param {Record<string, any>} configs - The configurations to set.
   * @returns {this} Returns the current instance for chaining.
   * @example
   * ```typescript
   * appState.setConfigurations({ key: 'value' });
   * ```
   */
  setConfigurations(configs: Record<string, any>): this;

  /**
   * @method
   * @public
   * @description Sets the state snapshot of the application.
   * @param {Record<string, any>} snapshot - The state snapshot to set.
   * @returns {this} Returns the current instance for chaining.
   * @example
   * ```typescript
   * appState.setStateSnapshot({ key: 'value' });
   * ```
   */
  setStateSnapshot(snapshot: Record<string, any>): this;
}
