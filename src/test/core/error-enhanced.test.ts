import {
  ApplicationStateEnhancer,
  ApplicationStateInterface,
  ErrorAnalysisEnhancer,
  ErrorAnalysisInterface,
  ErrorEnhanced,
  FilterInterface,
  FilterUtility,
  HttpStatusEnhancer,
  HttpStatusInterface,
  IdentifiersEnhancer,
  IdentifiersInterface,
  SerializersInterface,
  SerializersUtility,
  SystemContextEnhancer,
  SystemContextInterface,
  UserInfoEnhancer,
  UserInfoInterface,
} from '../../lib';

type ErrorEnhancedType = Error &
  ApplicationStateInterface &
  IdentifiersInterface &
  HttpStatusInterface &
  SystemContextInterface &
  UserInfoInterface &
  ErrorAnalysisInterface &
  FilterInterface &
  SerializersInterface;

describe('ErrorEnhanced', () => {
  let testeableError: ErrorEnhancedType;

  beforeEach(() => {
    testeableError = new ErrorEnhanced([
      new ApplicationStateEnhancer(),
      new IdentifiersEnhancer(),
      new HttpStatusEnhancer(),
      new SystemContextEnhancer(),
      new UserInfoEnhancer(),
      new FilterUtility(),
      new ErrorAnalysisEnhancer(),
      new SerializersUtility(),
    ]) as ErrorEnhancedType;
  });

  // Test cases for Constructor
  describe('Constructor', () => {
    it('should create an instance of ErrorEnhanced', () => {
      expect(testeableError).toBeInstanceOf(ErrorEnhanced);
      expect(testeableError).toBeInstanceOf(Error);
    });
  });
});
