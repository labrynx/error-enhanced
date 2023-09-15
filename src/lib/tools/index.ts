/**
 * @file index.ts
 *
 * Entry point for exporting modules related to error enhancement.
 *
 * The file is organized into three major parts:
 * 1. Enhancers: These modules add extra functionalities to errors.
 * 2. Helpers: These modules provide utility functions.
 * 3. Serializers: These modules are responsible for converting error objects to different formats.
 *
 * @author Alessandro Barbagallo
 * @version 1.0.0
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

// ============================================================================
// Helpers
// ============================================================================

/**
 * FilterHelper: Provides utility methods to filter out unused properties from error objects.
 */
export * from './helpers/filter.helper';

// ============================================================================
// Serializers
// ============================================================================

/**
 * JsonSerializer: Serializes the error object into a JSON string.
 */
export * from './serializers/json.serializer';

/**
 * XmlSerializer: Serializes the error object into an XML string.
 */
export * from './serializers/xml.serializer';

/**
 * YamlSerializer: Serializes the error object into a YAML string.
 */
export * from './serializers/yaml.serializer';

/**
 * CsvSerializer: Serializes the error object into a CSV string.
 */
export * from './serializers/csv.serializer';
