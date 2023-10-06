import { Mixin } from 'ts-mixer';
import {
  ErrorAnalysisEnhancer,
  HttpStatusEnhancer,
  IdentifiersEnhancer,
  SystemContextEnhancer,
  UserInfoEnhancer,
  FilterUtility,
  SerializersUtility,
} from '../src';

export class ErrorEnhanced extends Mixin(
  Error,
  ErrorAnalysisEnhancer,
  HttpStatusEnhancer,
  IdentifiersEnhancer,
  SystemContextEnhancer,
  UserInfoEnhancer,
  FilterUtility,
  SerializersUtility,
) {
  constructor() {
    super();
    Object.setPrototypeOf(this, ErrorEnhanced.prototype);
  }
}
