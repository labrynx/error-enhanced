# Change Log

All notable updates to the project will be documented in this file.

## [Unreleased]

## [Version 1.1.0] - 2023-09-16

### New Features

New ErrorAnalysisEnhancer class for error stack analysis and extraction of file, line, column info etc.
New SerializersUtility class to serialize errors to JSON, CSV, XML and YAML
Added pattern to capture originating module and method context

### Enhancements

Refactored validators into standalone files
HttpStatusEnhancer now takes number instead of enum for status code
IdentifiersEnhancer now takes strings instead of enums for severity and category
Updated examples

### Bug Fixes

Fixed issue capturing system context in SystemContextEnhancer

### Other changes

Removed individual serializer classes in favor of SerializersUtility
Removed FilterHelper in favor of FilterUtility
Removed unused validators
Improved package.json metadata
Switched to ESM, added exports field
Added JSDoc comments

## [Version 1.0.0] - 2023-09-15

### New Features

- Implemented `IdentifiersEnhancer` class for enriching errors with unique identifiers, error codes, and more.
- Added `SystemContextEnhancer` class to include system-level context information in errors, such as module, method, and system details.
- Introduced `UserInfoEnhancer` class for adding user-related context information to errors.
- Created `HttpStatusEnhancer` class to include HTTP-specific context information in errors.
- Added `FilterHelper` utility for filtering out unused properties in error objects.
- Implemented `JsonSerializer` utility for serializing error objects to JSON format.
- Created `XmlSerializer` utility for serializing error objects to XML format.
- Added `YamlSerializer` utility for serializing error objects to YAML format.
- Added comprehensive examples and documentation for each feature.

### Bug Fixes

- Fixed a critical bug related to error filtering in `FilterHelper`.
- Resolved an issue with property serialization in `XmlSerializer`.

### Enhancements

- Improved code efficiency in several classes.
- Enhanced code readability with better variable naming and comments.
- Optimized the user interface for error serialization.
- Made the project more accessible to new contributors.

### Authors

- alessbarb

[Unreleased]: https://github.com/labrynx/error-enhanced/compare/previous-version...HEAD
[Version 1.0.0]: https://github.com/labrynx/error-enhanced/releases/tag/version-1.0.0
