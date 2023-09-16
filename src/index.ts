/**
 * @file index.ts
 *
 * @overview
 * Entry point for the `error-enhanced` library. This file serves as a centralized
 * hub that re-exports all the essential modules, classes, and functionalities related to
 * enriched error handling in Node.js applications.
 *
 * @description
 * The `error-enhanced` library aims to provide a robust, extensible, and comprehensive
 * error-handling mechanism. By re-exporting all the key features from this entry point,
 * it simplifies the import process and usage of the library, making it easier for developers
 * to integrate enriched error-handling capabilities in their applications.
 *
 * @module error-enhanced
 *
 * @author alessbarb
 * @version 1.0.0
 *
 * @see {@link https://github.com/labrynx/error-enhanced Here} for the GitHub repository,
 * project details, and complete documentation.
 *
 * @example
 * // Import required modules and classes
 * import { Mixin } from 'ts-mixer';
 * import {
 *   IdentifiersEnhancer,
 *   FilterUtility,
 *   ErrorAnalysisEnhanced,
 * } from 'error-enhanced';
 *
 * // Define the main ErrorEnhanced class by mixing in additional classes
 * // to enrich it with various functionalities.
 * class ErrorEnhanced extends Mixin(
 *   Error, // Base class must be Error
 *   IdentifiersEnhancer,
 *   FilterUtility,
 *   SerializersUtility,
 * ) {
 *   constructor() {
 *     super(); // Call the base constructor
 *     Object.setPrototypeOf(this, ErrorEnhanced.prototype);
 *   }
 * }
 *
 * // Create an instance of ErrorEnhanced
 * const error = new ErrorEnhanced();
 *
 * // Basic error information
 * error.name = 'UserNotAuthorizedError';
 * error.message = 'User is not authorized';
 *
 * // Setting Severity and Category
 * error
 *   .setSeverity(ErrorEnhanced.SeverityLevel.HIGH)
 *   .setCategory(ErrorEnhanced.Category.NETWORK);
 *
 * // Serialize the error object into various formats after filtering unused properties
 * const serializedErrorJSON = error.filterUnused().toJSON();
 *
 * // Log the serialized errors
 * console.log(serializedErrorJSON);
 *
 * @exports
 * All essential classes, utilities, and enums for enriched error handling.
 *
 * @requires
 * Node.js and TypeScript environment.
 *
 * @license
 * MIT
 */

// ============================================================================
// Re-export Essential Tools for Enriched Error Handling
// ============================================================================

/**
 * Re-exports all modules, classes, and functionalities related to enriched error handling
 * from the `./lib/tools` directory. This enables streamlined imports from the library's root,
 * making it easier for developers to leverage the library's extensive error-handling features.
 */
export * from './lib/tools';
