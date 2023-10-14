import os from 'os';
import {
  ErrorEnhanced,
  SystemContextEnhancer,
  SystemContextInterface,
} from '../../../lib';

type ErrorEnhancedType = Error & SystemContextInterface;

jest.mock('os', () => ({
  hostname: jest.fn(() => 'test-hostname'),
  arch: jest.fn(() => 'x64'),
  type: jest.fn(() => 'Linux'),
  release: jest.fn(() => '5.4.0'),
  uptime: jest.fn(() => 1000),
}));

const setters = {
  hostname: ['test-hostname'],
  cpuArch: ['x64'],
  osType: ['Linux'],
  osRelease: ['5.4.0'],
  systemUptime: [1000],
};

describe('SystemContextEnhancer', () => {
  let testeableError: ErrorEnhancedType;

  beforeEach(() => {
    testeableError = new ErrorEnhanced([
      new SystemContextEnhancer(),
    ]) as ErrorEnhancedType;
  });

  // Test constructor and getters
  describe('Constructor', () => {
    Object.keys(setters).forEach(setter => {
      it(`should initialize ${setter} correctly`, () => {
        const [validValue] = setters[setter];
        expect(testeableError[setter]).toBe(validValue);
      });
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
