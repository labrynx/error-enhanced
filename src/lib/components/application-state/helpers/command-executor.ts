import path from 'path';
import shell from 'shelljs';

import { CommandExecutorInterface } from './command-executor.interface';

export class CommandExecutor implements CommandExecutorInterface {
  execute(command: string): string {
    if (!command || typeof command !== 'string') {
      throw new Error('Invalid command');
    }

    const cwd = path.resolve('.');

    shell.cd(cwd);

    const output = shell.exec(command, { silent: true });

    if (output.code === 0) {
      return output.stdout;
    } else {
      throw new Error(output.stderr);
    }
  }
}
