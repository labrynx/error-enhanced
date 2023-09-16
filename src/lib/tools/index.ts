/**
 * @file index.ts
 *
 * Entry point for exporting modules related to error enhancement.
 *
 * The file is organized into three major parts:
 * 1. Enhancers: These modules add extra functionalities to errors.
 * 2. Utilities: These modules provides utilities and serializers.
 * 3. Interfaces: These modules provide properties and method for Enhancers and Utilities.
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

// ============================================================================
// Interfaces
// ============================================================================

/**
 * HttpStatus: Adds properties and methods for HttpStatusEnhancer.
 */
export * from './interfaces/http-status.interface';

/**
 * Identifiers: Adds properties and methods for IdentifiersEnhancer.
 */
export * from './interfaces/identifiers.interface';

/**
 * SystemContext: Adds properties and methods for SystemContextEnhancer.
 */
export * from './interfaces/system-context.interface';

/**
 * UserInfo: Adds properties and methods for UserInfoEnhancer.
 */
export * from './interfaces/user-info.interface';

/**
 * ErrorAnalysis: Adds properties and methods for ErrorAnalysisEnhancer.
 */
export * from './interfaces/error-analysis.interface';

/**
 * Filter: Adds properties and methods for FilterUtility.
 */
export * from './interfaces/filter.interface';

/**
 * Serializers: Adds properties and methods for SerializersUtility.
 */
export * from './interfaces/serializers.interface';
