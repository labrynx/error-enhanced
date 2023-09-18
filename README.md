![npm](https://img.shields.io/npm/v/error-enhanced)
[![GitHub Workflow Status (with event)](https://img.shields.io/github/actions/workflow/status/labrynx/error-enhanced/nodejs.yml)](https://github.com/labrynx/error-enhanced/actions/workflows/nodejs.yml)

<a name="top"></a>

# `error-enhanced` - Enhanced Error Handling for Node.js

## Table of Contents 
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [Changelog](#changelog)

---

## Quick Start

`error-enhanced` is a TypeScript library focused on enriching error handling capabilities in Node.js. 

**Quick Example**:

```typescript
const error = new ErrorEnhanced([new IdentifiersEnhanced()]);
error.setErrorCode(400).setSeverity(ErrorEnhanced.SeverityLevel.HIGH);
```

For more examples and advanced usage, please refer to the [Wiki](https://github.com/labrynx/error-enhanced/wiki).

[Back to top](#top)

---

## Installation

To install the package, use the following npm command:

```bash
npm install error-enhanced
```

[Back to top](#top)

---

## Documentation

For in-depth documentation, including explanations on enhancers, utilities, enums, and more, please refer to the [Wiki](https://github.com/labrynx/error-enhanced/wiki).

[Back to top](#top)

---

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](https://github.com/labrynx/error-enhanced/wiki/Contributing) for more information.

[Back to top](#top)

---

## Changelog

For a detailed list of changes, check out the [CHANGELOG](docs/CHANGELOG.md).

[Back to top](#top)
