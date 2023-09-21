# Serializers

_File:_ [_`serializers.interface.ts`_](../../src/lib/interfaces/serializers.interface.ts)

### Introduction

The `Serializers` interface is a part of the `error-enhanced` library and is designed to handle serialization of the enhanced error objects. Serialization is a crucial aspect, especially when you need to log these errors or send them across network calls. The interface provides multiple serialization formats including JSON, XML, CSV, and YAML.

### Methods

| Method                                                | Return Type | Description                                                                                        |
| ----------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------- |
| `toJSON(replacer?: (key: string, value: any) => any)` | `string`    | Serializes the error object to a JSON string. Accepts an optional replacer function.               |
| `toXML()`                                             | `string`    | Serializes the error object to an XML string.                                                      |
| `toCSV(delimiter?: string, quotes?: boolean)`         | `string`    | Serializes the error object to a CSV string. Accepts optional delimiter and quote character flags. |
| `toYAML()`                                            | `string`    | Serializes the error object to a YAML string.                                                      |

### Example Usage

```typescript
const error = new ErrorEnhanced([
  new SerializersUtility()
]);

// Serialize to JSON
const jsonString = error.toJSON();
console.log(jsonString);

// Serialize to XML
const xmlString = error.toXML();
console.log(xmlString);

// Serialize to CSV
const csvString = error.toCSV();
console.log(csvString);

// Serialize to YAML
const yamlString = error.toYAML();
console.log(yamlString);
```

### Best Practices

* Choose the appropriate serialization format based on the context in which the serialized error will be used. For example, use JSON for API responses and XML for SOAP-based web services.
* For custom serialization, you can extend the provided methods or introduce new serialization formats.

### Conclusion

The `Serializers` interface offers a robust and extensible way to serialize enhanced error objects into various formats. Understanding how to use these serialization methods effectively can be vital for error logging and transmission.

***
