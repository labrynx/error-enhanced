## [2.2.2](https://github.com/labrynx/error-enhanced/compare/v2.2.1...v2.2.2) (2023-09-18)


### Bug Fixes

* **Polynomial regular expression:** Fix code scanning alert ([0272e4c](https://github.com/labrynx/error-enhanced/commit/0272e4cbe7c01c90b2ba8fc06b3a6d70e3300a1d)), closes [#6](https://github.com/labrynx/error-enhanced/issues/6)

## [2.2.1](https://github.com/labrynx/error-enhanced/compare/v2.2.0...v2.2.1) (2023-09-18)

# [2.2.0](https://github.com/labrynx/error-enhanced/compare/v2.1.0...v2.2.0) (2023-09-18)


### Features

* **Constant Enumerators:** Updated constant enumerators ([9bc81e1](https://github.com/labrynx/error-enhanced/commit/9bc81e1c405b9216b240696b46b66cb14e861351))

# [2.1.0](https://github.com/labrynx/error-enhanced/compare/v2.0.2...v2.1.0) (2023-09-18)


### Features

* **IdentifiersEnhancer:** Added High Precision Timestamp ([0f5cf0c](https://github.com/labrynx/error-enhanced/commit/0f5cf0ca823a3e952d4141291828eb0035cff86c))

## [2.0.2](https://github.com/labrynx/error-enhanced/compare/v2.0.1...v2.0.2) (2023-09-18)


### Bug Fixes

* **package:** bug in package.json config ([dbeb25e](https://github.com/labrynx/error-enhanced/commit/dbeb25ec9ed892b3282927a23627ca4e694c476e))

## [Version 2.0.1] - 2023-09-18

### Added

- New `ErrorEnhanced` core class to dynamically enrich error objects
- Interfaces for all Enhancers and Utilities
- Enum mappings for `SeverityLevel`, `Category`, `HttpMethods`, `HttpStatusCodes`

### Changed

- Moved enums to their own files
- Exported core `ErrorEnhanced` separately from tools
- Enhancers now implement interfaces
- Utilities now implement interfaces

### Fixed

- Extract error info bug in `ErrorAnalysisEnhancer`
- Filtering bugs in `FilterUtility`

### Removed

- Duplicate enum exports (#890)

## [Version 1.1.0] - 2023-09-16

### New Features

- New `ErrorAnalysisEnhancer` class for error stack analysis and extraction of file, line, column info etc.
- New `SerializersUtility` class to serialize errors to JSON, CSV, XML and YAML
- Added pattern to capture originating module and method context

### Enhancements

- Refactored validators into standalone files.
- `HttpStatusEnhancer` now takes number instead of enum for status code
- `IdentifiersEnhancer` now takes strings instead of enums for severity and category
- Updated examples

### Bug Fixes

- Fixed issue capturing system context in `SystemContextEnhancer`.

### Other changes

- Removed individual serializer classes in favor of `SerializersUtility`.
- Removed FilterHelper in favor of `FilterUtility`.
- Removed unused validators
- Improved `package.json` metadata
- Switched to ESM, added exports field
- Added JSDoc comments

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

---

## Collaborators

- alessbarb

[Version 1.0.0]: https://github.com/labrynx/error-enhanced/releases/tag/v1.0.0
[Version 1.1.0]: https://github.com/labrynx/error-enhanced/releases/tag/v1.1.0
[Version 2.0.0]: https://github.com/labrynx/error-enhanced/releases/tag/v2.0.0
