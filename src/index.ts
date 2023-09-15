/**
 * @file index.ts
 *
 * Entry point for the `error-enhanced` library. This file consolidates
 * and re-exports all the essential modules, classes, and functionalities
 * for enriched error handling in Node.js applications.
 *
 * Users can import various enhancers, utilities, and enums directly from
 * the library's root, simplifying the usage and implementation.
 *
 * @author Alessandro Barbagallo
 * @version 1.0.0
 * @see {@link https://github.com/labrynx/error-enhanced Here} for further project details and documentation.
 *
 * @example
 * // Importing ErrorEnhanced and HttpStatusCodes from the library
 * import { ErrorEnhanced, HttpStatusCodes } from 'error-enhanced';
 */

// ============================================================================
// Export Tools
// ============================================================================

/**
 * Re-exports all modules, classes, and functionalities from the `./lib/tools`
 * directory. This enables users to directly import them from the library's root,
 * making it easier to access essential error-handling features.
 */
export * from './lib/tools';
