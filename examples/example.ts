import { Mixin } from 'ts-mixer';

import {
  IdentifiersEnhancer,
  HttpStatusEnhancer,
  SystemContextEnhancer,
  JsonSerializer,
  FilterHelper,
  UserInfoEnhancer,
  ErrorAnalysisEnhanced,
} from '../src/';

class ErrorEnhanced extends Mixin(
  Error, // <= Must!
  IdentifiersEnhancer,
  HttpStatusEnhancer,
  SystemContextEnhancer,
  UserInfoEnhancer,
  FilterHelper,
  ErrorAnalysisEnhanced,
  JsonSerializer,
) {
  constructor() {
    super();
    Object.setPrototypeOf(this, ErrorEnhanced.prototype);
  }
}

try {
  throw new Error('Ha ocurrido un error');
} catch (e) {
  const error = new ErrorEnhanced();

  // Its a normal error, give it a name and error message
  error.name = 'UserNotAuthorizedError';
  //error.message = 'User is not authorized';

  if (e instanceof Error) {
    error.setOriginalError(e);
  }

  // Setting error code and its prefix
  error.setErrorCode(1234).setErrorCodePrefix('EE');

  // Setting error severity and category
  error
    .setSeverity(ErrorEnhanced.SeverityLevel.HIGH)
    .setCategory(ErrorEnhanced.Category.NETWORK);

  // Add some context
  error
    .setHttpStatusCode(404)
    .setUrl('https://api.example.com/user')
    .setHttpMethod(ErrorEnhanced.HttpMethods.GET);

  error.originalError;
  const serializedErrorJSON = error.filterUnused().toJSON();

  console.log('Salida JSON: ');
  console.log(serializedErrorJSON);
}
