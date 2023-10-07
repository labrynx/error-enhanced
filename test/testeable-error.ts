import {
  ErrorEnhanced,
  ApplicationStateEnhancer,
  ApplicationStateInterface,
  ErrorAnalysisEnhancer,
  ErrorAnalysisInterface,
  HttpStatusEnhancer,
  HttpStatusInterface,
  IdentifiersEnhancer,
  IdentifiersInterface,
  SystemContextEnhancer,
  SystemContextInterface,
  UserInfoEnhancer,
  UserInfoInterface,
  FilterUtility,
  FilterInterface,
  SerializersUtility,
  SerializersInterface,
} from '../src';

type ErrorEnhancedType = Error &
  ApplicationStateInterface &
  IdentifiersInterface &
  HttpStatusInterface &
  SystemContextInterface &
  UserInfoInterface &
  ErrorAnalysisInterface &
  FilterInterface &
  SerializersInterface;

export const testeableError = new ErrorEnhanced([
  new ApplicationStateEnhancer(),
  new IdentifiersEnhancer(),
  new HttpStatusEnhancer(),
  new SystemContextEnhancer(),
  new UserInfoEnhancer(),
  new FilterUtility(),
  new ErrorAnalysisEnhancer(),
  new SerializersUtility(),
]) as ErrorEnhancedType;
