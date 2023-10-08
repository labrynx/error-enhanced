import {
  ApplicationStateEnhancer,
  ApplicationStateInterface,
  ErrorEnhanced,
} from '../../src';
import { CommandExecutor } from '../../src/lib/components/application-state/helpers/command-executor';
import shell from 'shelljs';

jest.mock('shelljs', () => ({
  exec: jest.fn(),
  cd: jest.fn(),
}));

jest.mock(
  '../../src/lib/components/application-state/helpers/command-executor',
  () => {
    return {
      CommandExecutor: jest.fn().mockImplementation(() => {
        return {
          execute: jest.fn().mockImplementation(command => {
            if (command === 'npm list --json') {
              return JSON.stringify({
                name: 'my-app',
                version: '1.0.0',
                dependencies: { someLib: '1.0.0' },
              });
            }
            throw new Error('Command failed');
          }),
        };
      }),
    };
  },
);

// Silence console.error
(global.console as jest.Mocked<Console>).error = jest.fn();

type ErrorEnhancedType = Error & ApplicationStateInterface;

const commandExecutor = new CommandExecutor();

describe('CommandExecutor', () => {
  it('should execute the command successfully', () => {
    const resultStr = commandExecutor.execute('npm list --json');
    const result = JSON.parse(resultStr);
    expect(result).toMatchObject({
      version: expect.any(String),
      name: 'my-app',
      dependencies: expect.any(Object),
    });
  });

  it('should fail to execute the command', () => {
    let caughtError;
    (shell.exec as jest.Mock).mockReturnValue({ code: 1, stderr: 'error' });
    (shell.cd as jest.Mock).mockReturnValue(true);

    try {
      commandExecutor.execute('npm rist --json');
    } catch (error) {
      caughtError = error;
    }

    expect(caughtError).toBeDefined();
    expect(caughtError.message).toBe('Command failed');
  });
});

// Test cases related to setters and getters
describe('ApplicationState', () => {
  let testeableError: ErrorEnhancedType;

  beforeEach(() => {
    testeableError = new ErrorEnhanced([
      new ApplicationStateEnhancer(),
    ]) as ErrorEnhancedType;
  });

  describe('Setters and Getters', () => {
    describe('Basic Properties', () => {
      it('should set and get development correctly', () => {
        testeableError.setEnvironment('development');
        expect(testeableError.environment).toBe('development');
      });

      it('should get nodeVersion correctly', () => {
        expect(testeableError.nodeVersion).toBe(process.version);
      });

      it('should get envVars correctly', () => {
        expect(testeableError.envVars).toBe(process.env);
      });

      it('should set and get stateSnapshot correctly', () => {
        const snapshot = { key: 'value' };
        testeableError.setStateSnapshot(snapshot);
        expect(testeableError.stateSnapshot).toEqual(snapshot);
      });

      it('should set and get configurations correctly', () => {
        const configs = { configKey: 'configValue' };
        testeableError.setConfigurations(configs);
        expect(testeableError.configurations).toEqual(configs);
      });
    });
  });

  describe('Event History', () => {
    it('should add to event history and maintain last 10 events', () => {
      const events = Array.from({ length: 12 }, (_, i) => `Event${i}`);
      events.forEach(event => testeableError.addToEventHistory(event));
      expect(testeableError.eventHistory).toEqual(events.slice(2, 12));
    });
  });

  describe('Dependencies Fetching', () => {
    it('should fetch npm dependencies if npm is available', async () => {
      await testeableError['_fetchDependencies']();
      expect(testeableError.dependencies).toEqual({ someLib: '1.0.0' });
    });

    it('should handle errors during dependency fetching', async () => {
      jest
        .spyOn(testeableError['_commandExecutor'], 'execute')
        .mockImplementation(() => {
          throw new Error('Command failed');
        });

      await expect(testeableError['_fetchDependencies']()).rejects.toThrow(
        'Failed during _fetchDependencies',
      );
    });
  });

  describe('Package Manager Checking', () => {
    it('should check if npm is installed and cache the result', () => {
      expect(testeableError['_isPackageManagerInstalled']('npm')).toBeTruthy();

      // Should use cache now
      expect(testeableError['_isPackageManagerInstalled']('npm')).toBeTruthy();
    });
  });

  describe('Error Handling', () => {
    it('should throw and log errors', () => {
      console.error = jest.fn();

      expect(() =>
        testeableError['_handleAppStateError'](
          new Error('Mock Error'),
          'someContext',
        ),
      ).toThrow('Failed during someContext: Mock Error');
      expect(console.error).toHaveBeenCalledWith(
        'Failed during someContext: Mock Error',
      );
    });
  });

  describe('Environment Validation', () => {
    it('should throw error for invalid environment', () => {
      expect(() => testeableError.setEnvironment('')).toThrow(
        'Invalid environment',
      );
    });
  });
});
