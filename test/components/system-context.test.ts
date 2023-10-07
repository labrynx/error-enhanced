import os from 'os';
import {
  ErrorEnhanced,
  SystemContextEnhancer,
  SystemContextInterface,
} from '../../src';

type ErrorEnhancedType = Error & SystemContextInterface;

jest.mock('os', () => ({
  hostname: jest.fn(() => 'test-hostname'),
  arch: jest.fn(() => 'x64'),
  type: jest.fn(() => 'Linux'),
  release: jest.fn(() => '5.4.0'),
  uptime: jest.fn(() => 1000),
}));

describe('SystemContextEnhancer', () => {
  let testeableError: ErrorEnhancedType;

  beforeEach(() => {
    testeableError = new ErrorEnhanced([
      new Error(),
      new SystemContextEnhancer(),
    ]) as ErrorEnhancedType;
  });

  // Test constructor and getters
  describe('constructor', () => {
    it('should initialize with the correct system context', () => {
      expect(testeableError.hostname).toBe('test-hostname');
      expect(testeableError.cpuArch).toBe('x64');
      expect(testeableError.osType).toBe('Linux');
      expect(testeableError.osRelease).toBe('5.4.0');
      expect(testeableError.systemUptime).toBe(1000);
    });
  });

  // Test refreshSystemInfo method
  describe('refreshSystemInfo', () => {
    it('should update the system uptime', () => {
      (os.uptime as jest.Mock).mockReturnValueOnce(2000);
      testeableError.refreshSystemInfo();
      expect(testeableError.systemUptime).toBe(2000);
    });

    it('should return the instance of the class', () => {
      const returnedInstance = testeableError.refreshSystemInfo();
      expect(returnedInstance).toBe(testeableError);
    });
  });
});
