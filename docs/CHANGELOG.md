# Changelog

## [2.3.0](https://github.com/labrynx/error-enhanced/compare/v2.2.7...v2.3.0) (2023-09-21)

### Features

* **ApplicationStateEnhancer:** New feature introducing ApplicationStateEnhancer ([4f5f6b3](https://github.com/labrynx/error-enhanced/commit/4f5f6b3452355a9f26609910e3fe3bd2b5e57d01))
* **IdentifiersEnhancer:** Added High Precision Timestamp ([0f5cf0c](https://github.com/labrynx/error-enhanced/commit/0f5cf0ca823a3e952d4141291828eb0035cff86c))

### Performance Improvements

* **General:** Increased 20% performance ([7b4e0b6](https://github.com/labrynx/error-enhanced/commit/7b4e0b6da329edf091b3f6b56da3188e0bd77344))

### Bug Fixes

* **Validators:** Corrected imports in Enhancers ([808289c](https://github.com/labrynx/error-enhanced/commit/808289cb3bfc944ed29bb97404710afda3e7dc51))
* **serializers:** bug serializing error object ([07a69ca](https://github.com/labrynx/error-enhanced/commit/07a69ca831e8770a8aca96aa946ff2c1073109ec))
* **security:** fix security issue on uncontrolled data:
  * ([862c830](https://github.com/labrynx/error-enhanced/commit/862c8309a79b1be902fad0073d692503cd3afe4a)), closes [#6](https://github.com/labrynx/error-enhanced/issues/6)
  * ([0272e4c](https://github.com/labrynx/error-enhanced/commit/0272e4cbe7c01c90b2ba8fc06b3a6d70e3300a1d)), closes [#6](https://github.com/labrynx/error-enhanced/issues/6)
* **package:** bug in package.json config ([dbeb25e](https://github.com/labrynx/error-enhanced/commit/dbeb25ec9ed892b3282927a23627ca4e694c476e))

## [Version 2.0.1](https://github.com/labrynx/error-enhanced/releases/tag/v2.0.0) - 2023-09-18

### Added

* New `ErrorEnhanced` core class to dynamically enrich error objects
* Interfaces for all Enhancers and Utilities
* Enum mappings for `SeverityLevel`, `Category`, `HttpMethods`, `HttpStatusCodes`

### Changed

* Moved enums to their own files
* Exported core `ErrorEnhanced` separately from tools
* Enhancers now implement interfaces
* Utilities now implement interfaces

### Fixed

* Extract error info bug in `ErrorAnalysisEnhancer`
* Filtering bugs in `FilterUtility`

### Removed

* Duplicate enum exports (#890)

## [Version 1.1.0](https://github.com/labrynx/error-enhanced/releases/tag/v1.1.0) - 2023-09-16

### New Features

* New `ErrorAnalysisEnhancer` class for error stack analysis and extraction of file, line, column info etc.
* New `SerializersUtility` class to serialize errors to JSON, CSV, XML and YAML
* Added pattern to capture originating module and method context

### Enhancements

* Refactored validators into standalone files.
* `HttpStatusEnhancer` now takes number instead of enum for status code
* `IdentifiersEnhancer` now takes strings instead of enums for severity and category
* Updated examples

### Bug Fixes

* Fixed issue capturing system context in `SystemContextEnhancer`.

### Other changes

* Removed individual serializer classes in favor of `SerializersUtility`.
* Removed FilterHelper in favor of `FilterUtility`.
* Removed unused validators
* Improved `package.json` metadata
* Switched to ESM, added exports field
* Added JSDoc comments

## [v1.0.0](https://github.com/labrynx/error-enhanced/releases/tag/v1.0.0) - 2023-09-15

### New Features

* Implemented `IdentifiersEnhancer` class for enriching errors with unique identifiers, error codes, and more.
* Added `SystemContextEnhancer` class to include system-level context information in errors, such as module, method, and system details.
* Introduced `UserInfoEnhancer` class for adding user-related context information to errors.
* Created `HttpStatusEnhancer` class to include HTTP-specific context information in errors.
* Added `FilterHelper` utility for filtering out unused properties in error objects.
* Implemented `JsonSerializer` utility for serializing error objects to JSON format.
* Created `XmlSerializer` utility for serializing error objects to XML format.
* Added `YamlSerializer` utility for serializing error objects to YAML format.
* Added comprehensive examples and documentation for each feature.

### Bug Fixes

* Fixed a critical bug related to error filtering in `FilterHelper`.
* Resolved an issue with property serialization in `XmlSerializer`.

### Enhancements

* Improved code efficiency in several classes.
* Enhanced code readability with better variable naming and comments.
* Optimized the user interface for error serialization.
* Made the project more accessible to new contributors.

---

## Collaborators

* [alessbarb](https://www.github.com/alessbarb)
