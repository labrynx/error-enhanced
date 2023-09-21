# SerializersUtility

_File:_ [_`serializers.utility.ts`_](../../src/lib/utilities/serializers.utility.ts)

### Overview

The `SerializersUtility` class is a versatile utility designed for serializing objects into various data formats such as JSON, XML, CSV, and YAML. This class is especially useful for data interchange, storage, or logging purposes in applications.

### Properties

None

### Methods

#### `toJSON(replacer?: Function): string`

Serializes the object to a JSON string, excluding `null`, `undefined`, and empty string values. A custom replacer function can be optionally provided for additional serialization customization.

**Usage Example**:

```typescript
const serializer = new SerializersUtility();
const jsonString = serializer.toJSON();
```

#### `toXML(): string`

Serializes the object to an XML string using the `xmlbuilder` library.

**Usage Example**:

```typescript
const xmlString = serializer.toXML();
```

#### `toCSV(delimiter?: string, quotes?: boolean): string`

Serializes the object to a CSV string using the `Papaparse` library. The method takes optional parameters for the field delimiter and whether to quote string fields.

**Usage Example**:

```typescript
const csvString = serializer.toCSV(';', true);
```

#### `toYAML(): string`

Serializes the object to a YAML string using the `js-yaml` library.

**Usage Example**:

```typescript
const yamlString = serializer.toYAML();
```

### Common Use Cases

* **Data Exchange**: Converting data into various formats for API endpoints.
* **Storage**: Storing serialized data into files or databases.
* **Logging**: Logging serialized data for analysis and debugging.

***
