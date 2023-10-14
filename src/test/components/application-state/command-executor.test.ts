import path from 'path';
import shell from 'shelljs';

import { CommandExecutor } from '../../../lib/components/application-state/helpers/command-executor'; // Adjust the path if needed

jest.mock('shelljs', () => ({
  exec: jest.fn(),
  cd: jest.fn(),
}));

describe('CommandExecutor', () => {
  let commandExecutor: CommandExecutor;

  const mockShell = (code: number, stdout: string, stderr: string) => {
    (shell.exec as jest.Mock).mockReturnValue({ code, stdout, stderr });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    commandExecutor = new CommandExecutor();
  });

  describe('Constructor and Initial State', () => {
    it('should initialize without throwing errors', () => {
      expect(() => new CommandExecutor()).not.toThrow();
    });
    it('should initialize cwd correctly', () => {
      expect((commandExecutor as any).cwd).toBe(path.resolve('.'));
    });
  });

  describe('Successful execution', () => {
    it('should execute the command successfully', () => {
      mockShell(0, 'success', '');
      const output = commandExecutor.execute('some-command');
      expect(output).toBe('success');
      expect(shell.exec).toHaveBeenCalledTimes(1);
    });
  });

  describe('Failed execution', () => {
    it('should fail to execute the command', () => {
      mockShell(1, '', 'error');
      let caughtError;
      try {
        commandExecutor.execute('some-command');
      } catch (error) {
        caughtError = error;
      }
      expect(caughtError).toBeDefined();
      expect(caughtError.message).toBe('Execution failed: error');
      expect(shell.exec).toHaveBeenCalledTimes(1);
    });

    it('should throw an unknown error if shell execution has no output', () => {
      (shell.exec as jest.Mock).mockReturnValue(undefined);
      expect(() => commandExecutor.execute('some-command')).toThrowError(
        'Execution failed: Unknown error',
      );
    });

    it('should throw an unknown error if shell execution has no stderr', () => {
      mockShell(1, '', '');
      expect(() => commandExecutor.execute('some-command')).toThrowError(
        'Execution failed: Unknown error',
      );
    });
  });

  describe('Invalid command', () => {
    it('should throw an error for empty command', () => {
      expect(() => commandExecutor.execute('')).toThrowError('Invalid command');
    });
    it('should throw an error for null command', () => {
      expect(() =>
        commandExecutor.execute(null as unknown as string),
      ).toThrowError('Invalid command');
    });
  });

  describe('Stress Tests', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe('Concurrent Execution', () => {
      it('should handle multiple concurrent executions', async () => {
        mockShell(0, 'success', '');
        const promises = Array.from({ length: 50 }, () =>
          Promise.resolve(commandExecutor.execute('some-command')),
        );
        const results = await Promise.all(promises);
        results.forEach(result => expect(result).toBe('success'));
        expect(shell.exec).toHaveBeenCalledTimes(50);
      });
    });

    describe('Varying Execution Times', () => {
      it('should handle commands with varying execution times', async () => {
        const mockOutputs = [
          { code: 0, stdout: 'fast', stderr: '' },
          { code: 0, stdout: 'medium', stderr: '' },
          { code: 0, stdout: 'slow', stderr: '' },
        ];
        let callCount = 0;
        (shell.exec as jest.Mock).mockImplementation(() => {
          const output = mockOutputs[callCount % 3];
          callCount++;
          for (let i = 0; i < (callCount % 3) * 1e6; i++) {
            // Simulate a delay in execution
          }
          return output;
        });
        const promises = Array.from({ length: 100 }, () =>
          Promise.resolve(commandExecutor.execute(`some-command-${callCount}`)),
        );
        const results = await Promise.all(promises);
        results.forEach((result, index) =>
          expect(result).toBe(mockOutputs[index % 3].stdout),
        );
        expect(shell.exec).toHaveBeenCalledTimes(100);
      });
    });
  });
});
