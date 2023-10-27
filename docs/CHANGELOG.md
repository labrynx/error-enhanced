# [Unreleased](https://github.com/labrynx/error-enhanced/compare/v2.7.1...main)

- Check the link for future changes

# [2.7.1](https://github.com/labrynx/error-enhanced/compare/v2.7.0...v2.7.1) (2023-10-27)

### Changed
- Update README.md (@alessbarb)

### Dependency Updates
- Bump @commitlint/cli from 17.7.2 to 18.2.0 (@dependabot[bot])
- Bump @commitlint/config-conventional from 17.7.0 to 18.1.0 (@dependabot[bot])
- Bump @types/jest from 29.5.5 to 29.5.6 (@dependabot[bot])
- Bump @types/js-yaml from 4.0.7 to 4.0.8 (@dependabot[bot])
- Bump @types/json-stringify-safe from 5.0.1 to 5.0.2 (@dependabot[bot])
- Bump @types/node from 20.8.5 to 20.8.9 (@dependabot[bot])
- Bump @types/papaparse from 5.3.9 to 5.3.10 (@dependabot[bot])
- Bump @types/shelljs from 0.8.13 to 0.8.14 (@dependabot[bot])
- Bump @types/uuid from 9.0.5 to 9.0.6 (@dependabot[bot])
- Bump @typescript-eslint/eslint-plugin from 6.7.5 to 6.9.0 (@dependabot[bot])
- Bump @typescript-eslint/parser from 6.7.5 to 6.9.0 (@dependabot[bot])
- Bump eslint from 8.51.0 to 8.52.0 (@dependabot[bot])
- Bump lint-staged from 14.0.1 to 15.0.2 (@dependabot[bot])

# [2.7.0](https://github.com/labrynx/error-enhanced/compare/v2.6.0...v2.7.0) (2023-10-14)

### Enhancements

- Feat: Added default values and input validation to UserInfoEnhancer (@alessbarb)
- Refactored error handling and added input validation for application config (@alessbarb)
- Refactored error handling in CommandExecutor class (@alessbarb)

### Bug Fixes

- Fixed null check in parsedStack method in ErrorAnalysisEnhancer (@alessbarb)  
- Fixed error message in IdentifiersEnhancer for invalid category level (@alessbarb)
- Fixed JSON formatting issue in application-state.test.ts (@alessbarb)

### Maintenance

- Updated editor and linting configurations (@alessbarb)
- Updated scripts in package.json (@alessbarb)
- Reorganized test files (@alessbarb)
- Bumped @types/node from 20.8.4 to 20.8.5 (@dependabot)
- Updated configurations for format, lint, etc (@alessbarb)
- Updated coverage config (@alessbarb)  
- Added global config to silence console.error (@alessbarb)
- Updated tests to 100% coverage (@alessbarb)

# [2.6.0](https://github.com/labrynx/error-enhanced/compare/v2.5.0...v2.6.0) (2023-10-12)

### Build System and Project Structure

- **Output Directory**: Moved from `dist/` to `lib/`, aligning with common npm package practices.
- **Declaration Files**: Now output to a separate `lib/types/` directory.
- **Source Maps**: Enabled for build.
  
  *The restructuring of the output directory and addition of source maps aim to improve the build process.*

### Source Code

- **File Organization**: Source code relocated to `src/lib/` with new entry points at `src/main` and `src/types`.
- **Imports**: All updated to reflect the new structure.

  *This restructuring isolates the source code and clearly separates it from test code, improving maintainability.*

### Documentation

- **JSDoc**: Detailed comments added throughout the source code.
- **TypeDoc**: Added for auto-generated API documentation with a `typedoc.json` config.
- **Embedded Snippets**: Documentation snippets are now part of the source files.

  *These changes make the documentation more robust and easier to maintain.*

### Testing

- **Test Location**: Moved to `src/test/`.
- **Additional Cases**: More test cases added, particularly for validation and error handling.

  *Improves overall test coverage and robustness.*

### Dev Dependencies and Tooling

- **New Additions**: Added `typedoc` and related plugins.
- **Updates**: The `@types/*` packages have been updated to their latest versions.
- **Code Style**: Configuration files for Prettier and ESLint added.
  
  *These additions and updates facilitate a smoother development workflow.*

### Miscellaneous

- **Scripts**: Added `prepare` script to run documentation generation and `npm-run-all` for running multiple npm scripts.
- **Ignore Files**: Enhanced `.gitignore` and added `.prettierignore`.

  *Housekeeping improvements for a cleaner repo.*

## Contributors

- @alessbarb
- @labrynx

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
