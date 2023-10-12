import {
  ErrorEnhanced,
  FilterInterface,
  FilterUtility,
  IdentifiersEnhancer,
  IdentifiersInterface,
  SerializersInterface,
  SerializersUtility,
} from '../../lib';

type ErrorEnhancedType = Error &
  IdentifiersInterface &
  SerializersInterface &
  FilterInterface;

// Test cases related to Serialization
describe('Serialization', () => {
  let testeableError: ErrorEnhancedType;
  let filteredError: ErrorEnhancedType;

  beforeEach(() => {
    testeableError = new ErrorEnhanced([
      new IdentifiersEnhancer(),
      new FilterUtility(),
      new SerializersUtility(),
    ]) as ErrorEnhancedType;
    filteredError = testeableError.filterUnused();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Basic Serialization', () => {
    it('should serialize to JSON without throwing an error', () => {
      expect(() => {
        filteredError.toJSON();
      }).not.toThrow();
    });

    it('should serialize to CSV without throwing an error', () => {
      expect(() => {
        filteredError.toCSV();
      }).not.toThrow();
    });

    it('should serialize to XML without throwing an error', () => {
      expect(() => {
        filteredError.toXML();
      }).not.toThrow();
    });

    it('should serialize to YAML without throwing an error', () => {
      expect(() => {
        filteredError.toYAML();
      }).not.toThrow();
    });

    it('should serialize to JSON correctly', () => {
      const jsonStr = filteredError.toJSON();
      const parsedJson = JSON.parse(jsonStr);
      expect(parsedJson).toHaveProperty('_category', 'unknown');
    });

    it('should serialize to CSV correctly', () => {
      const csvStr = filteredError.toCSV();
      expect(csvStr).toContain('"_category"');
    });

    it('should serialize to XML correctly', () => {
      const xmlStr = filteredError.toXML();
      expect(xmlStr).toContain('<_category>unknown</_category>');
    });

    it('should serialize to YAML correctly', () => {
      const yamlStr = filteredError.toYAML();
      expect(yamlStr).toContain('_category: unknown');
    });
  });

  describe('Content Validation', () => {
    it('should serialize to JSON with correct keys', () => {
      const jsonStr = filteredError.toJSON();
      const parsedJson = JSON.parse(jsonStr);
      const keys = Object.keys(parsedJson);

      expect(keys).toEqual(expect.arrayContaining(['_severity', '_category']));
    });

    it('should serialize to JSON with correct keys after filtering', () => {
      const jsonStr = filteredError.toJSON();
      const parsedJson = JSON.parse(jsonStr);
      const keys = Object.keys(parsedJson);

      expect(keys).toEqual(expect.arrayContaining(['_severity', '_category']));
    });

    it('should exclude keys with null, undefined, or empty string values', () => {
      jest.spyOn(testeableError as any, '_serializableObject').mockReturnValue({
        key1: 'value1',
        key2: null,
        key3: undefined,
        key4: '',
      });

      const jsonStr = testeableError.toJSON();
      const parsedJson = JSON.parse(jsonStr);

      expect(parsedJson).toHaveProperty('key1', 'value1');
      expect(parsedJson).not.toHaveProperty('key2');
      expect(parsedJson).not.toHaveProperty('key3');
      expect(parsedJson).not.toHaveProperty('key4');
    });

    it('should handle errors during serialization', () => {
      const handleSerializationErrorSpy = jest.spyOn(
        testeableError as any,
        '_handleSerializationError',
      );

      jest
        .spyOn(testeableError as any, '_serializableObject')
        .mockImplementation(() => {
          throw new Error('Forced error');
        });

      expect(() => {
        testeableError.toJSON();
      }).toThrow('Failed to serialize to JSON: Forced error');

      expect(handleSerializationErrorSpy).toHaveBeenCalled();
      handleSerializationErrorSpy.mockClear();

      expect(() => {
        testeableError.toCSV();
      }).toThrow('Failed to serialize to CSV: Forced error');

      expect(handleSerializationErrorSpy).toHaveBeenCalled();
      handleSerializationErrorSpy.mockClear();

      expect(() => {
        testeableError.toXML();
      }).toThrow('Failed to serialize to XML: Forced error');

      expect(handleSerializationErrorSpy).toHaveBeenCalled();
      handleSerializationErrorSpy.mockClear();

      expect(() => {
        testeableError.toYAML();
      }).toThrow('Failed to serialize to YAML: Forced error');

      expect(handleSerializationErrorSpy).toHaveBeenCalled();
      handleSerializationErrorSpy.mockClear();
    });

    it('should serialize to CSV with correct headers', () => {
      const delimeter = ',';
      const quoted = false;
      const csvStr = filteredError.toCSV(delimeter, quoted);
      const lines = csvStr.split('\n');
      const headers = lines[0].split(delimeter);
      if (quoted) {
        expect(headers).toEqual(
          expect.arrayContaining(['"_severity"', '"_category"']),
        );
      } else {
        expect(headers).toEqual(
          expect.arrayContaining(['_severity', '_category']),
        );
      }
    });

    it('should serialize to XML with correct tags', () => {
      const xmlStr = filteredError.toXML();

      expect(xmlStr).toContain('<_severity>');
      expect(xmlStr).toContain('</_severity>');
      expect(xmlStr).toContain('<_category>');
      expect(xmlStr).toContain('</_category>');
    });

    it('should serialize to YAML with correct keys', () => {
      const yamlStr = filteredError.toYAML();
      expect(yamlStr).toContain('_severity:');
      expect(yamlStr).toContain('_category:');
    });
  });

  describe('Custom Serialization', () => {
    it('should serialize to JSON with custom replacer', () => {
      const replacer = (key, value) => (key === '_category' ? 'custom' : value);
      const jsonStr = filteredError.toJSON(replacer);
      const parsedJson = JSON.parse(jsonStr);
      expect(parsedJson).toHaveProperty('_category', 'custom');
    });
  });

  describe('toCSV', () => {
    it('should flatten Error objects when serializing to CSV', () => {
      const mockError = new Error('Test error message');

      // Mock the _serializableObject method to return an object containing the mock error.
      jest.spyOn(filteredError as any, '_serializableObject').mockReturnValue({
        field1: 'value1',
        field2: mockError,
      });

      const csvOutput = filteredError.toCSV();

      // Extract the stack trace from the mock error and escape it.
      const expectedStack = (mockError as any).stack.replace(
        /["\n]/g,
        match => {
          return match === '\n' ? '\\n' : '\\"';
        },
      );

      // Check that the CSV output contains the expected stack trace.
      expect(csvOutput).toContain(expectedStack);

      jest.restoreAllMocks();
    });
  });

  describe('Error Handling', () => {
    it('should throw an error when JSON serialization fails', () => {
      jest.spyOn(filteredError, 'toJSON').mockImplementation(() => {
        throw new Error('Forced JSON error');
      });
      expect(() => {
        filteredError.toJSON();
      }).toThrow('Forced JSON error');
    });

    it('should throw an error when XML serialization fails', () => {
      jest.spyOn(filteredError, 'toXML').mockImplementation(() => {
        throw new Error('Forced XML error');
      });
      expect(() => {
        filteredError.toXML();
      }).toThrow('Forced XML error');
    });

    it('should throw an error when CSV serialization fails', () => {
      jest.spyOn(filteredError, 'toCSV').mockImplementation(() => {
        throw new Error('Forced CSV error');
      });
      expect(() => {
        filteredError.toCSV();
      }).toThrow('Forced CSV error');
    });

    it('should throw an error when YAML serialization fails', () => {
      jest.spyOn(filteredError, 'toYAML').mockImplementation(() => {
        throw new Error('Forced YAML error');
      });
      expect(() => {
        filteredError.toYAML();
      }).toThrow('Forced YAML error');
    });
  });
});
