import path from 'path';
import shell, { ExecOptions, ShellString } from 'shelljs';
import { CommandExecutorInterface } from './command-executor.interface';

/**
 * @class CommandExecutor
 * @group Enhancers
 * @category ApplicationState
 * @description Manages the execution of shell commands in a project environment. Provides a method called `execute` to run shell commands and capture their output. Implements the CommandExecutorInterface for command execution.
 * @implements {CommandExecutorInterface}
 * @example
 * ```typescript
 * const executor = new CommandExecutor();
 * ```
 */
export class CommandExecutor implements CommandExecutorInterface {
  /**
   * @private
   * @property {string}
   * @description Stores the current working directory (cwd). Initialized once during class instantiation.
   */
  private readonly cwd: string;

  /**
   * @constructor
   * @description Initializes the CommandExecutor class. Sets the current working directory to the project root.
   * @example
   * ```typescript
   * const executor = new CommandExecutor();
   * ```
   */
  constructor() {
    // Set the working directory only once during instantiation.
    this.cwd = path.resolve('.');
  }

  /**
   * @method execute
   * @public
   * @description Executes a given shell command and returns its standard output. Switches to the project root directory prior to command execution. Uses `shelljs` for command execution.
   * @param {string} command - The shell command to execute.
   * @param {ExecOptions} [options] - Optional execution parameters, like setting environment variables or adjusting the timeout.
   * @returns {string} The standard output of the executed command.
   * @throws {Error} Throws an error if the command is invalid or if the command execution fails.
   * @example
   * ```typescript
   * const output = executor.execute("ls");
   * ```
   */
  execute(command: string, options?: ExecOptions): string {
    // Validate the command string
    if (!command || typeof command !== 'string') {
      throw new Error('Invalid command');
    }

    // Switch to the stored current working directory
    shell.cd(this.cwd);

    // Merge default and provided shell execution options
    const execOptions = { silent: true, ...options };

    // Execute the shell command
    const output = shell.exec(command, execOptions) as ShellString;

    // Check and return the command output or throw an error
    if (output.code === 0) {
      return output.stdout as string;
    } else {
      throw new Error(`Execution failed: ${output.stderr}`);
    }
  }
}
