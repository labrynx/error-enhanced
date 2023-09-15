/**
 * @file index.ts
 *
 * Entry point for exporting modules related to error enhancement.
 *
 * The file is organized into three major parts:
 * 1. Enhancers: These modules add extra functionalities to errors.
 * 2. Helpers: These modules provide utility functions.
 * 3. Serializers: These modules are responsible for converting error objects to different formats.
 */

// ============================================================================
// Enhancers
// ============================================================================

/**
 * HttpStatusEnhancer: Adds HTTP-related information to errors.
 */
export * from './enhancers/http-status.enhancer';

/**
 * IdentifiersEnhancer: Adds unique identifiers and other meta-information to errors.
 */
export * from './enhancers/identifiers.enhancer';

/**
 * SystemContextEnhancer: Adds system-level context information to errors.
 */
export * from './enhancers/system-context.enhancer';

/**
 * UserInfoEnhancer: Adds user-related context information to errors.
 */
export * from './enhancers/user-info.enhancer';

/**
 * ErrorAnalysisEnhanced: Adds error stack analysis and extraction.
 */
export * from './enhancers/error-analysis.enhancer';

// ============================================================================
// Utilities
// ============================================================================

/**
 * FilterUtility: Provides utility methods to filter out unused properties from error objects.
 */
export * from './utilities/filter.utility';

/**
 * SerializersUtility: Serializing class that transforms an object into JSON, CSV, XML and YAML strings.
 */
export * from './utilities/serializers.utility';
