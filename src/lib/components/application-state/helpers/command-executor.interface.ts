/**
 * @interface
 * @group Enhancers
 * @category ApplicationState
 * @description Defines the contract for executing commands within the application.
 * @example
 * ```typescript
 * class CommandExecutor implements CommandExecutorInterface {
 *   execute(command: string): string {
 *     // implementation here
 *   }
 * }
 * ```
 */
export interface CommandExecutorInterface {
  /**
   * @method
   * @public
   * @description Executes a given command and returns the result as a string.
   * @param {string} command - The command to execute.
   * @returns {string} Returns the result of the command execution.
   * @example
   * ```typescript
   * const result = commandExecutor.execute("someCommand");
   * ```
   */
  execute(command: string): string;
}
