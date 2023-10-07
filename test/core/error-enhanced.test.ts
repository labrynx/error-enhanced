import {
  ErrorEnhanced,
} from '../../src';

import { testeableError } from '../testeable-error';

describe('ErrorEnhanced', () => {
  // Test cases for Constructor
  describe('Constructor', () => {
    it('should create an instance of ErrorEnhanced', () => {
      expect(testeableError).toBeInstanceOf(ErrorEnhanced);
      expect(testeableError).toBeInstanceOf(Error);
    });
  });
});
