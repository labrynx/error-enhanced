import {
  ErrorEnhanced,
  IdentifiersEnhancer,
  FilterUtility,
  SerializersUtility,
  IdentifiersInterface,
  FilterInterface,
  SerializersInterface,
  Severity,
  Category,
} from '../src';

type ErrorEnhancedType = Error &
  IdentifiersInterface &
  FilterInterface &
  SerializersInterface;

const error = new ErrorEnhanced([
  new IdentifiersEnhancer(),
  new FilterUtility(),
  new SerializersUtility(),
]) as ErrorEnhancedType;

// Basic error information
error.name = 'UserNotAuthorizedError';
error.message = 'User is not authorized';

// Additional Error Metadata
error.setErrorCode(5432).setErrorCodePrefix('EE');

// Setting Severity and Category
error.setSeverity(Severity.HIGH).setCategory(Category.NETWORK);

try {
  throw error; // Throw your error to be catched
} catch (e) {
  console.log(`${(e as ErrorEnhancedType).toXML()}`);
}
