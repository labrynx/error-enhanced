import {
  ErrorEnhanced,
  ErrorAnalysisEnhancer,
  HttpStatusEnhancer,
  IdentifiersEnhancer,
  SystemContextEnhancer,
  UserInfoEnhancer,
  FilterUtility,
  SerializersUtility,
  ErrorAnalysis,
  HttpStatus,
  Identifiers,
  SystemContext,
  UserInfo,
  Filter,
  Serializers,
  SeverityLevel,
  Category,
  HttpStatusCodes,
  HttpMethods,
} from '../src';

type ErrorEnhancedType = Error &
  Identifiers &
  HttpStatus &
  SystemContext &
  UserInfo &
  ErrorAnalysis &
  Filter &
  Serializers;

const error = new ErrorEnhanced([
  new IdentifiersEnhancer(),
  new HttpStatusEnhancer(),
  new SystemContextEnhancer(),
  new UserInfoEnhancer(),
  new FilterUtility(),
  new ErrorAnalysisEnhancer(),
  new SerializersUtility(),
]) as ErrorEnhancedType;

// Basic error information
error.name = 'UserNotAuthorizedError';
error.message = 'User is not authorized';

// Associate the error with an original standard Error object
error.setOriginalError(new Error('This is an error'));

// Additional Error Metadata
error.setErrorCode(5432).setErrorCodePrefix('EE');

// Setting Severity and Category
error.setSeverity(SeverityLevel.HIGH).setCategory(Category.NETWORK);

// HTTP Context
error
  .setHttpStatusCode(HttpStatusCodes.NOT_FOUND)
  .setUrl('https://api.example.com/user')
  .setHttpMethod(HttpMethods.GET);

// User Information
error.setUser('john_doe_123').setRoles(['admin', 'user']);

// Serialize the error object into various formats after filtering unused properties
const serializedErrorJSON = error.filterUnused().toJSON();
const serializedErrorCSV = error.filterUnused().toCSV();
const serializedErrorXML = error.filterUnused().toXML();
const serializedErrorYAML = error.filterUnused().toYAML();

// Log the serialized errors
console.log('\n---\nJSON export: ');
console.log(serializedErrorJSON);
console.log('\n---\nCSV export: ');
console.log(serializedErrorCSV);
console.log('\n---\nXML export: ');
console.log(serializedErrorXML);
console.log('\n---\nYAML export: ');
console.log(serializedErrorYAML);
