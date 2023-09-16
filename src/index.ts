/**
 * @file index.ts
 *
 * @overview
 * This file serves as the primary entry point for the `error-enhanced` library. It consolidates and re-exports
 * all core modules, classes, and utilities to offer a comprehensive error-handling experience in Node.js applications.
 *
 * @description
 * The `error-enhanced` library provides robust, extensible, and developer-friendly error-handling functionalities.
 * By re-exporting all essential components from this central hub, the library streamlines the import process and
 * ensures easy integration with various types of Node.js projects.
 *
 * @module error-enhanced
 *
 * @author alessbarb
 * @version 1.0.0
 * @see {@link https://github.com/labrynx/error-enhanced GitHub Repository} for complete project details and documentation.
 *
 * @example
 * // Importing required modules and classes
 * import { Mixin } from 'ts-mixer';
 * import {
 *   IdentifiersEnhancer,
 *   FilterUtility,
 *   ErrorAnalysisEnhanced
 * } from 'error-enhanced';
 *
 * // Defining the ErrorEnhanced class with additional functionalities
 * class ErrorEnhanced extends Mixin(
 *   Error, // Base class must be Error
 *   IdentifiersEnhancer,
 *   FilterUtility,
 *   SerializersUtility
 * ) {
 *   constructor() {
 *     super();
 *     Object.setPrototypeOf(this, ErrorEnhanced.prototype);
 *   }
 * }
 *
 * // Instantiate ErrorEnhanced and populate with necessary data
 * const error = new ErrorEnhanced();
 * error.name = 'UserNotAuthorizedError';
 * error.message = 'User is not authorized';
 *
 * // Setting the severity and category
 * error.setSeverity(ErrorEnhanced.SeverityLevel.HIGH)
 *      .setCategory(ErrorEnhanced.Category.NETWORK);
 *
 * // Serialize the enriched error object after filtering unused properties
 * const serializedErrorJSON = error.filterUnused().toJSON();
 *
 * // Log the serialized error object
 * console.log(serializedErrorJSON);
 *
 * @exports
 * The library exports all essential classes, utilities, and enums for enriched error handling.
 *
 * @requires
 * Node.js version >= 14.x and TypeScript version >= 4.x are mandatory for using this library.
 *
 * @license
 * Licensed under the MIT License.
 */

// Core Exports for Enriched Error Handling
// ============================================================================
/**
 * Exports the primary core functionalities required for enriched error handling.
 */
export * from './lib/error-enhanced';

// Essential Tool Re-exports for Enriched Error Handling
// ============================================================================
/**
 * Re-exports all modules, classes, and utilities for enriched error handling from the `./lib/tools` directory.
 * This allows developers to conveniently import all error-handling functionalities directly from the root of the library.
 */
export * from './lib/tools';

// Enumerators Export for Enriched Error Handling
// ============================================================================
/**
 * Re-exports all constant enumerators related to enriched error handling.
 */
export * from './lib/constants/category.const';
export * from './lib/constants/http-methods.const';
export * from './lib/constants/http-status-codes.const';
export * from './lib/constants/severity.const';
