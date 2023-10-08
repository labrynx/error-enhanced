import {
  ErrorEnhanced,
  FilterInterface,
  FilterUtility,
  IdentifiersEnhancer,
  IdentifiersInterface,
  SerializersInterface,
  SerializersUtility,
} from '../../src';

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
});
