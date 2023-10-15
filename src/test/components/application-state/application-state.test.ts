import {
  ApplicationStateEnhancer,
  ApplicationStateInterface,
  ErrorEnhanced,
} from '../../../lib';

type ErrorEnhancedType = Error & ApplicationStateInterface;

jest.mock(
  '../../../lib/components/application-state/helpers/command-executor',
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
            if (command === 'npm --version') {
              return '6.14.0';
            }
            if (!command || typeof command !== 'string') {
              throw new Error('Invalid command');
            }
            if (command === 'some-command') {
              throw new Error('Execution failed: some shell error');
            }
            throw new Error('Command failed');
          }),
        };
      }),
    };
  },
);

const setters = {
  setConfigurations: [
    { configKey: 'configValue' },
    'configurations',
    [
      ['Invalid configuration: Must be an object.', null],
      ['Invalid configuration: Must be an object.', 'notAnObject'],
    ],
  ],
  setStateSnapshot: [
    { key: 'value' },
    'stateSnapshot',
    [
      ['Invalid state snapshot: Must be an object.', null],
      ['Invalid state snapshot: Must be an object.', 'notAnObject'],
    ],
  ],
  setEnvironment: ['development', 'environment', [['Invalid environment', '']]],
};

describe('ApplicationState', () => {
  let testeableError: ErrorEnhancedType;
  let originalNodeEnv: string | undefined;
  let executeMock: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    testeableError = new ErrorEnhanced([
      new ApplicationStateEnhancer(),
    ]) as ErrorEnhancedType;

    originalNodeEnv = process.env.NODE_ENV;
    executeMock = (testeableError as any)._commandExecutor.execute;
  });

  afterEach(() => {
    jest.clearAllMocks();
    process.env.NODE_ENV = originalNodeEnv;
  });

  describe('Contructor', () => {
    it('should set _environment to "unknown" if process.env.NODE_ENV is not defined', () => {
      delete process.env.NODE_ENV;
      const enhancer = new ApplicationStateEnhancer();
      expect((enhancer as any)._environment).toBe('unknown');
    });
  });

  describe('Setters and Getters', () => {
    Object.keys(setters).forEach(setter => {
      const [validValue, getter, invalidTestCases] = setters[setter];
      describe(`${setter} Method & ${getter} getter`, () => {
        it(`should set value correctly using ${setter}`, () => {
          testeableError[setter](validValue);
          const expectedValue = validValue;
          expect(testeableError[getter]).toEqual(expectedValue);
        });

        it(`should throw error for invalid input using ${setter}`, () => {
          if (invalidTestCases) {
            invalidTestCases.forEach(([message, invalidValue]) => {
              expect(() => testeableError[setter](invalidValue)).toThrow(
                message,
              );
            });
          }
        });
      });

      it('should return environment variables correctly', () => {
        process.env.TEST_ENV_VAR = 'test_value';

        const result = testeableError.envVars;

        expect(result.TEST_ENV_VAR).toEqual('test_value');
      });

      it('should return correct Node.js version using nodeVersion getter', () => {
        const mockNodeVersion = 'v14.15.0';
        (testeableError as any)._nodeVersion = mockNodeVersion;

        const returnedNodeVersion = testeableError.nodeVersion;

        expect(returnedNodeVersion).toBe(mockNodeVersion);
      });
    });

    describe('addToEventHistory Method & eventHistory getter', () => {
      it('should set value correctly using addToEventHistory', () => {
        const action = 'Login';
        testeableError.addToEventHistory(action);
        expect(testeableError.eventHistory).toEqual([action]);
      });

      it('should throw error for invalid input using addActionToHistory', () => {
        expect(() => testeableError.addToEventHistory('')).toThrow(
          'Invalid event',
        );
      });

      it('should add to event history and maintain last 10 events', () => {
        const events = Array.from({ length: 12 }, (_, i) => `Event${i}`);
        events.forEach(event => testeableError.addToEventHistory(event));
        expect(testeableError.eventHistory).toEqual(events.slice(2, 12));
      });
    });
  });

  describe('Dependencies Fetching', () => {
    it('should fetch npm dependencies if npm is available', () => {
      testeableError['_fetchDependencies']();
      expect(testeableError.dependencies).toEqual({ someLib: '1.0.0' });
    });

    it('should return false if _dependenciesCache is undefined', () => {
      (testeableError as any)._dependenciesCache = undefined;
      expect((testeableError as any)._isCacheValid(Date.now())).toBe(false);
    });

    it('should return dependencies object if _isCacheValid returns true', () => {
      jest.spyOn(testeableError as any, '_isCacheValid').mockReturnValue(true);
      expect(typeof (testeableError as any)._fetchDependencies()).toBe(
        'object',
      );
    });

    it('should return dependencies object if _detectPackageManager returns null', () => {
      jest
        .spyOn(testeableError as any, '_detectPackageManager')
        .mockReturnValue(null);
      expect(typeof (testeableError as any)._fetchDependencies()).toBe(
        'object',
      );
    });

    it('should return dependencies object if _executeCommand throws an error', () => {
      jest
        .spyOn(testeableError['_commandExecutor'], 'execute')
        .mockImplementation(() => {
          throw new Error('Command failed');
        });
      expect(typeof (testeableError as any)._fetchDependencies()).toBe(
        'object',
      );
    });

    it('should return null if no package managers are installed', () => {
      jest
        .spyOn(testeableError as any, '_isPackageManagerInstalled')
        .mockReturnValue(false);
      expect((testeableError as any)._detectPackageManager()).toBeNull();
    });

    it('should handle errors during dependency fetching', () => {
      jest.spyOn(testeableError as any, '_isCacheValid').mockReturnValue(false);

      jest
        .spyOn(testeableError as any, '_detectPackageManager')
        .mockReturnValue(false);

      expect(() => testeableError['_fetchDependencies']()).toBeNull;

      jest
        .spyOn(testeableError as any, '_detectPackageManager')
        .mockReturnValue('npm');

      jest
        .spyOn(testeableError['_commandExecutor'], 'execute')
        .mockImplementation(() => {
          throw new Error('Command failed');
        });

      expect(() => testeableError['_fetchDependencies']()).toThrow(
        'Failed during _fetchDependencies',
      );
    });

    it('should handle unexpected errors', () => {
      executeMock.mockImplementationOnce(() => {
        throw new Error('Unexpected Error');
      });

      expect(
        testeableError['_isPackageManagerInstalled']('some-package'),
      ).toBeFalsy();
    });

    it('should handle missing dependencies in parsed JSON', () => {
      (testeableError as any)._parseAndCacheDependencies(
        '{"name": "my-app", "version": "1.0.0"}',
        Date.now(),
      );
      expect((testeableError as any)._dependencies).toEqual({});
    });
  });

  it('should return null if _isCacheValid is false and _detectPackageManager is null', () => {
    jest.spyOn(testeableError as any, '_isCacheValid').mockReturnValue(false);
    jest
      .spyOn(testeableError as any, '_detectPackageManager')
      .mockReturnValue(null);

    const result = (testeableError as any)._fetchDependencies();

    expect(result).toBeNull();
  });

  describe('Package Manager Checking', () => {
    it('should check if npm is installed and cache the result', () => {
      expect(testeableError['_isPackageManagerInstalled']('npm')).toBeTruthy();

      // Should use cache now
      expect(testeableError['_isPackageManagerInstalled']('npm')).toBeTruthy();
    });

    it('should return null if no package managers are installed', () => {
      jest
        .spyOn(testeableError as any, '_isPackageManagerInstalled')
        .mockReturnValue(false);
      expect((testeableError as any)._detectPackageManager()).toBeNull();
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

    it('should handle malformed JSON in _parseAndCacheDependencies', () => {
      const malformedJSON = "{ name: 'my-app', ";
      executeMock.mockReturnValueOnce(malformedJSON);

      expect(() => {
        (testeableError as any)._parseAndCacheDependencies(
          malformedJSON,
          Date.now(),
        );
      }).toThrow(
        'Failed during _parseAndCacheDependencies: Failed to parse JSON',
      );
    });

    it('should catch an "Unknown error" in _handleAppStateError', () => {
      try {
        (testeableError as any)._handleAppStateError(
          new Error(),
          '_yourContext',
        );
      } catch (e) {
        expect((e as any).message).toContain('Unknown error');
      }
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
