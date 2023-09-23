# SerializersUtility

## Overview

The `SerializersUtility` class serves as a flexible utility for serializing objects into different data formats—JSON, XML, CSV, and YAML. This tool is particularly beneficial for applications needing to interchange data, store serialized information, or log data for debugging and analysis.

## Features

- Supports multiple serialization formats: JSON, XML, CSV, YAML
- Allows custom replacers for JSON serialization
- Efficiently handles errors during serialization
- Caches serializable object for optimized performance

## Properties

None

## Enums and Interfaces

### `SerializersInterface`

Defines the contract that the `SerializersUtility` class should adhere to. Includes methods for serializing objects into JSON, XML, CSV, and YAML formats.

### `JsonReplacer`

A type that represents the replacer function signature used in JSON serialization.

## Methods

### Public Methods

#### `toJSON(replacer?: JsonReplacer): string`

Serializes the object into a JSON string. The method can exclude `null`, `undefined`, or empty string values. An optional replacer function can be provided for more specialized serialization.

##### Usage Example

```typescript
const serializer = new SerializersUtility();
const jsonString = serializer.toJSON();
```

#### `toXML(): string`

Utilizes the `xmlbuilder` library to serialize the object into an XML string.

##### Usage Example

```typescript
const xmlString = serializer.toXML();
```

#### `toCSV(delimiter?: string, quotes?: boolean): string`

Uses the `Papaparse` library to serialize the object into a CSV string. Optional parameters can specify the delimiter and whether to quote string fields.

##### Usage Example

```typescript
const csvString = serializer.toCSV(';', true);
```

#### `toYAML(): string`

Leverages the `js-yaml` library to serialize the object into a YAML string.

##### Usage Example

```typescript
const yamlString = serializer.toYAML();
```

### Private Methods

- `_handleSerializationError(e: Error, format: string)`: Handles and logs serialization errors.
- `_applyObjectFilter(): any`: Optionally applies object filtering if an `applyFilter` method is defined in the instance.
- `_serializableObject(): Record<string, any>`: Retrieves or generates the object that should be serialized.

## Getters

None

## Common Use Cases

- **Data Exchange**: Useful for converting data into various formats for API endpoints.
- **Storage**: Enables storing serialized data in files or databases.
- **Logging**: Ideal for logging serialized data for subsequent analysis and debugging.

## Error Handling

The class contains a private method `_handleSerializationError` that takes care of logging and throwing errors during serialization.
