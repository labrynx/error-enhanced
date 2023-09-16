/**
 * @file index.ts
 *
 * @overview
 * This file acts as the primary entry point for the `error-enhanced` library. It serves as a hub
 * that re-exports all the core modules, classes, and utilities to provide enriched error-handling
 * functionalities for Node.js applications.
 *
 * @description
 * The `error-enhanced` library aims to offer a comprehensive error-handling mechanism that is
 * robust, extensible, and developer-friendly. By consolidating all key features and re-exporting
 * them from this entry point, the library simplifies the import process and facilitates easy
 * integration into various types of applications.
 *
 * @module error-enhanced
 *
 * @author alessbarb
 * @version 1.0.0
 * @see {@link https://github.com/labrynx/error-enhanced GitHub Repository} for complete project details and documentation.
 *
 * @example
 * // Import necessary modules and classes
 * import { Mixin } from 'ts-mixer';
 * import {
 *   IdentifiersEnhancer,
 *   FilterUtility,
 *   ErrorAnalysisEnhanced,
 * } from 'error-enhanced';
 *
 * // Create the main ErrorEnhanced class by mixing additional functionalities into it.
 * class ErrorEnhanced extends Mixin(
 *   Error, // Base class must be Error
 *   IdentifiersEnhancer,
 *   FilterUtility,
 *   SerializersUtility,
 * ) {
 *   constructor() {
 *     super();
 *     Object.setPrototypeOf(this, ErrorEnhanced.prototype);
 *   }
 * }
 *
 * // Instantiate ErrorEnhanced and populate it with data
 * const error = new ErrorEnhanced();
 * error.name = 'UserNotAuthorizedError';
 * error.message = 'User is not authorized';
 *
 * // Apply severity and category
 * error.setSeverity(ErrorEnhanced.SeverityLevel.HIGH)
 *      .setCategory(ErrorEnhanced.Category.NETWORK);
 *
 * // Serialize the error object after filtering out unused properties
 * const serializedErrorJSON = error.filterUnused().toJSON();
 *
 * // Log the serialized error
 * console.log(serializedErrorJSON);
 *
 * @exports
 * The library exports all crucial classes, utilities, and enums required for enriched error handling.
 *
 * @requires
 * Node.js >= 14.x and TypeScript >= 4.x are required to use this library.
 *
 * @license
 * Licensed under the MIT License.
 */

// Core Export for Enriched Error Handling
// ============================================================================
/**
 * Exports the primary core functionalities.
 */
export * from './lib/error-enhanced';

// Essential Tools Re-export for Enriched Error Handling
// ============================================================================
/**
 * Re-exports all modules, classes, and utilities associated with enriched error handling from
 * the `./lib/tools` directory. This makes it convenient for developers to import all the error-handling
 * features directly from the library root.
 */
export * from './lib/tools';

// Helpers for Enriched Error Handling
// ============================================================================
import { SeverityLevel } from './lib/enums/severity.enum';
export { SeverityLevel };

import { Category } from './lib/enums/category.enum';
export { Category };

import { HttpMethods } from './lib/enums/http-methods.enum';
export { HttpMethods };

import { HttpStatusCodes } from './lib/enums/http-status-codes.enum';
export { HttpStatusCodes };
