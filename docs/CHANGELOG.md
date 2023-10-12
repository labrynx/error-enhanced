# [2.5.0](https://github.com/labrynx/error-enhanced/compare/v2.4.0...v2.5.0) (2023-10-08)

### Bug Fixes

    * enhancers: error-analysis caching bug fix (102aa4e)
    * enhancers: fixed application-state enhancer (004a58a)
    * shared: fixed keyed-objects.validator (0a9111d)
# [2.4.0](https://github.com/labrynx/error-enhanced/compare/v2.3.0...v2.4.0) (2023-09-23)

### Bug Fixes

* **Components:** Corrections in index.ts exports ([9abb001](https://github.com/labrynx/error-enhanced/commit/9abb0018716668da19124ec4df3a24f37c4e42b2))

# Changelog

## [Unreleased](https://github.com/labrynx/error-enhanced/compare/v2.3.0...main)

## [2.3.0](https://github.com/labrynx/error-enhanced/compare/v2.0.1...v2.3.0) (2023-09-21)

### Features

* **ApplicationStateEnhancer:** Introduce new feature ([4f5f6b3](https://github.com/labrynx/error-enhanced/commit/4f5f6b3452355a9f26609910e3fe3bd2b5e57d01))
* **IdentifiersEnhancer:** Add High Precision Timestamp ([0f5cf0c](https://github.com/labrynx/error-enhanced/commit/0f5cf0ca823a3e952d4141291828eb0035cff86c))

### Performance

* **General:** Increase performance by 20% ([7b4e0b6](https://github.com/labrynx/error-enhanced/commit/7b4e0b6da329edf091b3f6b56da3188e0bd77344))

### Fixes

* **Validators:** Fix imports in Enhancers ([808289c](https://github.com/labrynx/error-enhanced/commit/808289cb3bfc944ed29bb97404710afda3e7dc51))
* **serializers:** Fix bug in error object serialization ([07a69ca](https://github.com/labrynx/error-enhanced/commit/07a69ca831e8770a8aca96aa946ff2c1073109ec))
* **security:** Fix security issue with uncontrolled data ([862c830](https://github.com/labrynx/error-enhanced/commit/862c8309a79b1be902fad0073d692503cd3afe4a), [0272e4c](https://github.com/labrynx/error-enhanced/commit/0272e4cbe7c01c90b2ba8fc06b3a6d70e3300a1d)), closes [#6](https://github.com/labrynx/error-enhanced/issues/6)
* **package:** Fix bug in package.json config ([dbeb25e](https://github.com/labrynx/error-enhanced/commit/dbeb25ec9ed892b3282927a23627ca4e694c476e))

## [2.0.1](https://github.com/labrynx/error-enhanced/compare/v1.1.0...v2.0.1) (2023-09-18)

### Features

* Add new `ErrorEnhanced` core class and various Enhancer interfaces
* Add Enum mappings for multiple functionalities

### Improvements

* Refactor Enums and core class exports
* Update Enhancers and Utilities to implement new interfaces

### Fixes

* Fix bugs in `ErrorAnalysisEnhancer` and `FilterUtility`

### Breaking Changes

* Remove duplicate enum exports (#890)

## [1.1.0](https://github.com/labrynx/error-enhanced/compare/v1.0.0...v1.1.0) (2023-09-16)

### Features

* Introduce `ErrorAnalysisEnhancer` and `SerializersUtility` classes
* Add pattern capturing for module and method context

### Improvements

* Refactor validators and update class implementations

### Fixes

* Fix system context capturing in `SystemContextEnhancer`

### Breaking Changes

* Remove individual serializer classes and unused validators

## [1.0.0](https://github.com/labrynx/error-enhanced/releases/tag/v1.0.0) (2023-09-15)

### Features

* Implement `IdentifiersEnhancer` and other Enhancer classes
* Add utility classes for error serialization

### Fixes

* Fix critical bug in `FilterHelper` and issue in `XmlSerializer`

### Improvements

* Optimize code efficiency and readability

---

## Collaborators

* [alessbarb](https://www.github.com/alessbarb)
