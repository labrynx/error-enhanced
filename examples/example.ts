// Import required modules and classes
import { Mixin } from 'ts-mixer';
import {
  IdentifiersEnhancer,
  HttpStatusEnhancer,
  SystemContextEnhancer,
  SerializersUtility,
  FilterUtility,
  UserInfoEnhancer,
  ErrorAnalysisEnhancer,
} from '../src/';

// Define the main ErrorEnhanced class by mixing in additional classes
// to enrich it with various functionalities.
class ErrorEnhanced extends Mixin(
  Error, // Base class must be Error
  IdentifiersEnhancer,
  HttpStatusEnhancer,
  SystemContextEnhancer,
  UserInfoEnhancer,
  FilterUtility,
  ErrorAnalysisEnhancer,
  SerializersUtility,
) {
  constructor() {
    super(); // Call the base constructor
    Object.setPrototypeOf(this, ErrorEnhanced.prototype);
  }
}

// Create an instance of ErrorEnhanced
const error = new ErrorEnhanced();

// Basic error information
error.name = 'UserNotAuthorizedError';
error.message = 'User is not authorized';

// Associate the error with an original standard Error object
const e: Error = new Error('This is an error');
error.setOriginalError(e);

// Additional Error Metadata
error.setErrorCode(5432).setErrorCodePrefix('EE');

// Setting Severity and Category
error
  .setSeverity(ErrorEnhanced.SeverityLevel.HIGH)
  .setCategory(ErrorEnhanced.Category.NETWORK);

// HTTP Context
error
  .setHttpStatusCode(ErrorEnhanced.HttpStatusCodes.NOT_FOUND)
  .setUrl('https://api.example.com/user')
  .setHttpMethod(ErrorEnhanced.HttpMethods.GET);

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
