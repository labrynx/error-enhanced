# Enhanced Error Enrichment for Node.js
> Supercharge your Node.js error handling with this TypeScript library. Leverage modular architecture to enrich error objects with identifiers, system context, user info, and HTTP statuses. Perfect for debugging, logging, and boosting application robustness.

[![npm](https://img.shields.io/npm/v/%40labrynx%2Ferror-enhanced?style=for-the-badge&logo=npm&logoColor=white&link=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Ferror-enhanced
)](https://www.npmjs.com/package/@labrynx/error-enhanced)

## Features

* Unification of Error Objects
* Use of Enhancers for Dynamic Error Enrichment
* Enum-based Error Categorization
* Strongly Typed Interfaces

## Quick Start

`error-enhanced` is a TypeScript library focused on enriching error handling capabilities in Node.js. 

**Quick Example**:

```typescript
const error = new ErrorEnhanced([new IdentifiersEnhanced()]);
error.setErrorCode(400).setSeverity(ErrorEnhanced.Severity.HIGH);
```

## Installation

To install the package, use the following npm command:

```bash
npm install @labrynx/error-enhanced
```

## Documentation

For in-depth documentation, including explanations on enhancers, utilities, enums, and more, please refer to the [Wiki](https://github.com/labrynx/error-enhanced/wiki).

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](https://github.com/labrynx/error-enhanced/blob/main/docs/CONTRIBUTING.md) for more information.

## Changelog

For a detailed list of changes, check out the [CHANGELOG](docs/CHANGELOG.md).
