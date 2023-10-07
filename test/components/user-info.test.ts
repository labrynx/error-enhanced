import { ErrorEnhanced, UserInfoEnhancer, UserInfoInterface } from '../../src';

type ErrorEnhancedType = Error & UserInfoInterface;

describe('UserInfoEnhancer', () => {
  let testeableError: ErrorEnhancedType;

  beforeEach(() => {
    testeableError = new ErrorEnhanced([
      new Error(),
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

  // Test setUser
  describe('setUser Method', () => {
    it('should handle empty string correctly for setUser', () => {
      expect(() => testeableError.setUser('')).toThrow('Invalid user');
    });

    it('should throw error for specific invalid input for setUser', () => {
      expect(() => testeableError.setUser(12345 as any)).toThrow(
        'Invalid user',
      );
    });

    it('should set user if valid string is provided', () => {
      testeableError.setUser('JohnDoe');
      expect(testeableError.user).toBe('JohnDoe');
    });

    it('should throw error if invalid user string is provided', () => {
      expect(() => testeableError.setUser('')).toThrow('Invalid user');
    });
  });

  // Test setRoles Method
  describe('setRoles Method', () => {
    it('should set roles correctly', () => {
      testeableError.setRoles(['admin', 'user']);
      expect(testeableError.roles).toEqual(['admin', 'user']);
    });
  });

  // Test setAuthToken Method
  describe('setAuthToken Method', () => {
    it('should set authToken if valid string is provided', () => {
      testeableError.setAuthToken(
        'YiFqUMV7CFHgHZ0pGsO2lJ4skOYCgz9FLuw1AX26aIUhO5j5SC3vg60MC6pH3oEy',
      );
      expect(testeableError.authToken).toBe(
        'YiFqUMV7CFHgHZ0pGsO2lJ4skOYCgz9FLuw1AX26aIUhO5j5SC3vg60MC6pH3oEy',
      );
    });

    it('should throw error if invalid authToken string is provided', () => {
      expect(() => testeableError.setAuthToken('')).toThrow(
        'Invalid authentication token',
      );
    });
  });

  // Test setIpAddress Method
  describe('setIpAddress Method', () => {
    it('should set setIpAddress if valid string is provided', () => {
      testeableError.setIpAddress('192.168.1.1');
      expect(testeableError.ipAddress).toBe('192.168.1.1');
    });

    it('should throw error if invalid ipAddress string is provided', () => {
      expect(() => testeableError.setIpAddress('')).toThrow(
        'Invalid IP address',
      );
    });
  });

  // Test setUserAgent Method
  describe('setUserAgent Method', () => {
    it('should set setUserAgent if valid string is provided', () => {
      testeableError.setUserAgent(
        'Mozilla/5.0 (U; Linux i543 ) Gecko/20100101 Firefox/60.9',
      );
      expect(testeableError.userAgent).toBe(
        'Mozilla/5.0 (U; Linux i543 ) Gecko/20100101 Firefox/60.9',
      );
    });

    it('should throw error if invalid userAgent string is provided', () => {
      expect(() => testeableError.setUserAgent('')).toThrow(
        'Invalid user agent',
      );
    });
  });

  // Test setIpAddress Method
  describe('setIpAddress Method', () => {
    it('should set ipAddress if valid string is provided', () => {
      testeableError.setIpAddress('192.168.1.1');
      expect(testeableError.ipAddress).toBe('192.168.1.1');
    });

    it('should throw error if invalid ipAddress string is provided', () => {
      expect(() => testeableError.setIpAddress('')).toThrow(
        'Invalid IP address',
      );
    });
  });

  // Test setUserAgent Method
  describe('setUserAgent Method', () => {
    it('should set userAgent if valid string is provided', () => {
      testeableError.setUserAgent('Mozilla/5.0');
      expect(testeableError.userAgent).toBe('Mozilla/5.0');
    });

    it('should throw error if invalid userAgent string is provided', () => {
      expect(() => testeableError.setUserAgent('')).toThrow(
        'Invalid user agent',
      );
    });
  });

  // Test addActionToHistory Method
  describe('addActionToHistory Method', () => {
    it('should add multiple actions in order', () => {
      testeableError.addActionToHistory('Login');
      testeableError.addActionToHistory('Logout');
      expect(testeableError.actionHistory).toEqual(['Login', 'Logout']);
    });

    it('should add action to actionHistory if valid string is provided', () => {
      testeableError.addActionToHistory('Login');
      expect(testeableError.actionHistory).toEqual(['Login']);
    });

    it('should throw error if invalid action string is provided', () => {
      expect(() => testeableError.addActionToHistory('')).toThrow(
        'Invalid action',
      );
    });
  });

  describe('setSessionId Method', () => {
    it('should set sessionId if valid string is provided', () => {
      testeableError.setSessionId('12345');
      expect(testeableError.sessionId).toBe('12345');
    });

    it('should throw error if invalid sessionId string is provided', () => {
      expect(() => testeableError.setSessionId('')).toThrow(
        'Invalid sessionId',
      );
    });
  });

  // ... (similar tests for other getters to ensure they return the correct values)

  describe('Getters', () => {
    it('should return the correct user', () => {
      testeableError.setUser('JohnDoe');
      expect(testeableError.user).toBe('JohnDoe');
    });

    it('should return the correct sessionId', () => {
      testeableError.setSessionId('12345');
      expect(testeableError.sessionId).toBe('12345');
    });

    // ...similar tests for other getters...
  });
});
