import { Mixin } from 'ts-mixer';

import {
  IdentifiersEnhancer,
  HttpStatusEnhancer,
  SystemContextEnhancer,
  JsonSerializer,
  XmlSerializer,
  FilterHelper,
  UserInfoEnhancer,
  YamlSerializer,
  CsvSerializer,
} from '../src/';

class ErrorEnhanced extends Mixin(
  Error, // <= Must!
  IdentifiersEnhancer,
  HttpStatusEnhancer,
  SystemContextEnhancer,
  UserInfoEnhancer,
  FilterHelper,
  JsonSerializer,
  XmlSerializer,
  YamlSerializer,
  CsvSerializer,
) {
  constructor() {
    super();
    Object.setPrototypeOf(this, ErrorEnhanced.prototype);
  }
}

const error = new ErrorEnhanced();

// Its a normal error, give it a name and error message
error.name = 'UserNotAuthorizedError';
error.message = 'User is not authorized';

// Setting error code and its prefix
error.setErrorCode(1234).setErrorCodePrefix('EE');

// Setting error severity and category
error
  .setSeverity(ErrorEnhanced.SeverityLevel.HIGH)
  .setCategory(ErrorEnhanced.Category.NETWORK);

// Add some context
error.setModule('AuthenticationModule').setMethod('validateUser');
error
  .setHttpStatusCode(404)
  .setUrl('https://api.example.com/user')
  .setHttpMethod(ErrorEnhanced.HttpMethods.GET);

const serializedErrorJSON = error.filterUnused().toJSON();
const serializedErrorXML = error.filterUnused().toXML();
const serializedErrorYAML = error.filterUnused().toYAML();
const serializedErrorCSV = error.filterUnused().toCSV(';', true);

console.log('Salida JSON: ');
console.log(serializedErrorJSON);
console.log('---');
console.log('Salida XML: ');
console.log(serializedErrorXML);
console.log('---');
console.log('Salida YAML: ');
console.log(serializedErrorYAML);
console.log('---');
console.log('Salida CSV: ');
console.log(serializedErrorCSV);
