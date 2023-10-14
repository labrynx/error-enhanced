import {
  ErrorEnhanced,
  UserInfoEnhancer,
  UserInfoInterface,
} from '../../../lib';

type ErrorEnhancedType = Error & UserInfoInterface;

describe('UserInfoEnhancer', () => {
  let testeableError: ErrorEnhancedType;

  const setters = {
    setUser: ['JohnDoe', 'user', [['Invalid user', '']]],
    setAuthToken: [
      'ValidToken',
      'authToken',
      [['Invalid authentication token', '']],
    ],
    setIpAddress: ['192.168.1.1', 'ipAddress', [['Invalid IP address', '']]],
    setUserAgent: ['Mozilla/5.0', 'userAgent', [['Invalid user agent', '']]],
    setSessionId: ['12345', 'sessionId', [['Invalid sessionId', '']]],
    setRoles: [
      ['admin', 'user'],
      'roles',
      [
        ['Invalid roles: Must be a non-empty array', []],
        [
          'Invalid role: All roles must be non-empty strings',
          ['', 'validRole'],
        ],
      ],
    ],
  };

  beforeEach(() => {
    testeableError = new ErrorEnhanced([
      new UserInfoEnhancer(),
    ]) as ErrorEnhancedType;
  });

  describe('Constructor', () => {
    it('should initialize all properties correctly', () => {
      expect(testeableError.user).toBe('');
      expect(testeableError.sessionId).toBe('');
      expect(testeableError.roles).toEqual([]);
      expect(testeableError.authToken).toBe('');
      expect(testeableError.ipAddress).toBe('');
      expect(testeableError.userAgent).toBe('');
      expect(testeableError.actionHistory).toEqual([]);
    });
  });

  describe('Getters & Setters', () => {
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
    });

    describe('addActionToHistory Method & actionHistory getter', () => {
      it('should set value correctly using addActionToHistory', () => {
        const action = 'Login';
        testeableError.addActionToHistory(action);
        expect(testeableError.actionHistory).toEqual([action]);
      });

      it('should throw error for invalid input using addActionToHistory', () => {
        expect(() => testeableError.addActionToHistory('')).toThrow(
          'Invalid action',
        );
      });
    });
  });
});
