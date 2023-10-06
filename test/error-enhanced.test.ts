import {
  ErrorEnhanced,
  IdentifiersEnhancer,
  HttpStatusEnhancer,
  SystemContextEnhancer,
  UserInfoEnhancer,
  FilterUtility,
  ErrorAnalysisEnhancer,
  SerializersUtility,
  Category,
  HttpMethods,
  HttpStatusCodes,
  Severity,
} from '../src';

describe('ErrorEnhanced', () => {
  let error;

  beforeEach(() => {
    error = new ErrorEnhanced([
      Error,
      HttpStatusEnhancer,
      SystemContextEnhancer,
      UserInfoEnhancer,
      FilterUtility,
      ErrorAnalysisEnhancer,
      SerializersUtility,
    ]);
  });

  describe('Constructor', () => {
    it('should create an instance of ErrorEnhanced', () => {
      expect(error).toBeInstanceOf(ErrorEnhanced);
      expect(error).toBeInstanceOf(Error); // Should also be an instance of Error
    });
  });

  describe('Setters and Getters', () => {
    it('should set and get properties correctly', () => {
      error.setErrorCode(5432);
      error.setErrorCodePrefix('EE');
      expect(error.errorCodePrefix).toBe('EE');
      expect(error.errorCode).toBe('EE5432');

      error.setSeverity(Severity.HIGH);
      expect(error.severity).toBe(Severity.HIGH);

      error.setCategory(Category.NETWORK);
      expect(error.category).toBe(Category.NETWORK);

      error.setHttpStatusCode(HttpStatusCodes.NOT_FOUND);
      expect(error.httpStatusCode).toBe(HttpStatusCodes.NOT_FOUND);

      error.setUrl('https://api.example.com/user');
      expect(error.url).toBe('https://api.example.com/user');

      error.setHttpMethod(HttpMethods.GET);
      expect(error.httpMethod).toBe(HttpMethods.GET);

      error.setUser('john_doe_123');
      expect(error.user).toBe('john_doe_123');

      error.setRoles(['admin', 'user']);
      expect(error.roles).toEqual(['admin', 'user']);
    });

    it('should set and get originalError correctly', () => {
      const originalError = new Error('Some original error');
      error.setOriginalError(originalError);
      expect(error.originalError).toBe(originalError);
    });
  });

  describe('ErrorEnhanced - Setters and Getters Validation', () => {
    it('should throw an error when setting an invalid errorCode', () => {
      expect(() => {
        error.setErrorCode('invalid'); // Esto debería ser un número
      }).toThrow();
    });

    it('should throw an error when setting an invalid user', () => {
      expect(() => {
        error.setUser(null); // Esto debería ser una cadena no nula
      }).toThrow();
    });
  });

  describe('Serialization', () => {
    it('should serialize to JSON without throwing an error', () => {
      expect(() => {
        error.filterUnused().toJSON();
      }).not.toThrow();
    });

    it('should serialize to CSV without throwing an error', () => {
      expect(() => {
        error.filterUnused().toCSV();
      }).not.toThrow();
    });

    it('should serialize to XML without throwing an error', () => {
      expect(() => {
        error.filterUnused().toXML();
      }).not.toThrow();
    });

    it('should serialize to YAML without throwing an error', () => {
      expect(() => {
        error.filterUnused().toYAML();
      }).not.toThrow();
    });

    it('should serialize to JSON correctly', () => {
      const jsonStr = error.filterUnused().toJSON();
      const parsedJson = JSON.parse(jsonStr);
      expect(parsedJson).toHaveProperty('_errorCode', 'EE5432');
      // Agregar más expectativas aquí
    });

    it('should serialize to CSV correctly', () => {
      const csvStr = error.filterUnused().toCSV();
      expect(csvStr).toContain('EE5432');
      // Agregar más expectativas aquí
    });

    it('should serialize to XML correctly', () => {
      const xmlStr = error.filterUnused().toXML();
      expect(xmlStr).toContain('<_errorCode>EE5432</_errorCode>');
      // Agregar más expectativas aquí
    });

    it('should serialize to YAML correctly', () => {
      const yamlStr = error.filterUnused().toYAML();
      expect(yamlStr).toContain('_errorCode: EE5432');
      // Agregar más expectativas aquí
    });
  });

  describe('ErrorEnhanced - Serialization Content Validation', () => {
    it('should serialize to JSON with correct keys', () => {
      const jsonStr = error.filterUnused().toJSON();
      const parsedJson = JSON.parse(jsonStr);
      expect(Object.keys(parsedJson)).toEqual(
        expect.arrayContaining(['errorCode', 'severity', 'category']),
      );
    });
    it('should serialize to CSV with correct headers', () => {
      const csvStr = error.filterUnused().toCSV();
      expect(csvStr).toContain('errorCode,severity,category'); // Asegurar que los encabezados están presentes
    });

    it('should serialize to XML with correct tags', () => {
      const xmlStr = error.filterUnused().toXML();
      expect(xmlStr).toContain('<errorCode>'); // Asegurar que las etiquetas están presentes
      expect(xmlStr).toContain('</errorCode>');
    });

    it('should serialize to YAML with correct keys', () => {
      const yamlStr = error.filterUnused().toYAML();
      expect(yamlStr).toContain('errorCode:'); // Asegurar que las claves están presentes
    });
  });

  describe('ErrorEnhanced - Custom Serialization', () => {
    it('should serialize to JSON with custom replacer', () => {
      const replacer = (key, value) => (key === 'errorCode' ? 'custom' : value);
      const jsonStr = error.filterUnused().toJSON(replacer);
      const parsedJson = JSON.parse(jsonStr);
      expect(parsedJson).toHaveProperty('errorCode', 'custom');
    });
  });

  describe('Filtering', () => {
    it('should filter unused properties correctly', () => {
      error.someUnusedProperty = null;
      const filteredError = error.filterUnused();
      const jsonStr = filteredError.toJSON();
      const parsedJson = JSON.parse(jsonStr);
      expect(parsedJson).not.toHaveProperty('someUnusedProperty');
    });

    it('should preserve name and message properties', () => {
      error.name = 'TestName';
      error.message = 'TestMessage';
      const filteredError = error.filterUnused();
      const jsonStr = filteredError.toJSON();
      const parsedJson = JSON.parse(jsonStr);
      expect(parsedJson).toHaveProperty('name', 'TestName');
      expect(parsedJson).toHaveProperty('message', 'TestMessage');
    });
  });
});

describe('IdentifiersEnhancer', () => {
  let error;

  beforeEach(() => {
    error = new IdentifiersEnhancer();
  });

  describe('IdentifiersEnhancer - Constructor', () => {
    it('should initialize errorCode to 0', () => {
      expect(error.errorCode).toBe(0);
    });
  });

  it('should set and get errorCode correctly', () => {
    error.setErrorCode(1001);
    expect(error.errorCode).toBe(1001);
  });

  it('should throw an error when setting an invalid errorCode', () => {
    expect(() => {
      error.setErrorCode('invalid'); // Esto debería ser un número
    }).toThrow('Invalid errorCode');
  });

  // Agregar más pruebas aquí
});

// Aquí puedes agregar más pruebas para las otras clases como IdentifiersEnhancer, HttpStatusEnhancer, etc.
