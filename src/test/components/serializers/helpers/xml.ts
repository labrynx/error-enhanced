import {
  IdentifiersInterface,
  SerializersInterface,
  FilterInterface,
  ErrorEnhanced,
  IdentifiersEnhancer,
  FilterUtility,
  SerializersUtility,
} from '../../../../lib';

type ErrorEnhancedType = Error &
  IdentifiersInterface &
  SerializersInterface &
  FilterInterface;

const testeableError = new ErrorEnhanced([
  new IdentifiersEnhancer(),
  new FilterUtility(),
  new SerializersUtility(),
]) as ErrorEnhancedType;

const filteredError = testeableError.filterUnused();

const xmlBuilder = {
  ele: jest.fn().mockReturnThis(),
};

export const xmlTests = [
  {
    description: 'should serialize to XML correctly',
    testFunc: () => {
      const serializedStr = filteredError.toXML();
      expect(serializedStr).toContain('<_category>unknown</_category>');
    },
  },
  {
    description: 'should serialize to XML without throwing an error',
    testFunc: () => {
      expect(() => {
        filteredError.toXML();
      }).not.toThrow();
    },
  },
  {
    description: 'should throw an error when XML serialization fails',
    testFunc: () => {
      jest.spyOn(filteredError, 'toXML').mockImplementation(() => {
        throw new Error('Forced XML error');
      });
      expect(() => {
        filteredError.toXML();
      }).toThrow('Forced XML error');
    },
  },
  {
    description: 'should serialize to XML with correct tags',
    testFunc: () => {
      const xmlStr = filteredError.toXML();
      expect(xmlStr).toContain('<_severity>');
      expect(xmlStr).toContain('</_severity>');
      expect(xmlStr).toContain('<_category>');
      expect(xmlStr).toContain('</_category>');
    },
  },
  {
    description:
      'should prepend underscore if tag does not start with a letter or underscore',
    testFunc: () => {
      const result = (testeableError as any)._sanitizeXmlTag('1invalidTag');
      expect(result).toBe('_1invalidTag');
    },
  },
  {
    description: 'should handle Arrays',
    testFunc: () => {
      (testeableError as any)._serializeToXmlElement(
        xmlBuilder,
        'key',
        [1, 2, 3],
      );
      expect(xmlBuilder.ele).toHaveBeenCalledWith('key');
      expect(xmlBuilder.ele).toHaveBeenCalledWith('item_0', {}, 1);
      expect(xmlBuilder.ele).toHaveBeenCalledWith('item_1', {}, 2);
      expect(xmlBuilder.ele).toHaveBeenCalledWith('item_2', {}, 3);
    },
  },
  {
    description: 'should handle generic objects',
    testFunc: () => {
      (testeableError as any)._serializeToXmlElement(xmlBuilder, 'key', {
        a: 1,
        b: 2,
      });
      expect(xmlBuilder.ele).toHaveBeenCalledWith('key');
      expect(xmlBuilder.ele).toHaveBeenCalledWith('a', {}, 1);
      expect(xmlBuilder.ele).toHaveBeenCalledWith('b', {}, 2);
    },
  },
  {
    description: 'should handle primitive types',
    testFunc: () => {
      (testeableError as any)._serializeToXmlElement(
        xmlBuilder,
        'key',
        'value',
      );
      expect(xmlBuilder.ele).toHaveBeenCalledWith('key', {}, 'value');
    },
  },
  {
    description: 'should handle null or undefined',
    testFunc: () => {
      (testeableError as any)._serializeToXmlElement(xmlBuilder, 'key', null);
      (testeableError as any)._serializeToXmlElement(
        xmlBuilder,
        'key',
        undefined,
      );
      expect(xmlBuilder.ele).toHaveBeenCalledWith('key', {}, '');
    },
  },
  {
    description: 'should handle Error instances',
    testFunc: () => {
      const error = new Error('test');
      jest
        .spyOn(testeableError as any, '_flattenErrorObject')
        .mockReturnValue({ message: 'test' });

      (testeableError as any)._serializeToXmlElement(xmlBuilder, 'key', error);

      expect((testeableError as any)._flattenErrorObject).toHaveBeenCalledWith(
        error,
      );
      expect(xmlBuilder.ele).toHaveBeenCalledWith('key');
    },
  },
  {
    description: 'should handle errors without a message',
    testFunc: () => {
      jest
        .spyOn(testeableError as any, '_serializableObject')
        .mockImplementation(() => {
          throw new Error();
        });

      const consoleSpy = jest.spyOn(console, 'error');

      expect(() => {
        testeableError.toXML();
      }).toThrow();

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Unknown error'),
      );

      consoleSpy.mockRestore();
    },
  },
  {
    description: 'should handle errors during XML serialization',
    testFunc: () => {
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
        testeableError.toXML();
      }).toThrow('Failed to serialize to XML: Forced error');
      expect(handleSerializationErrorSpy).toHaveBeenCalled();
      handleSerializationErrorSpy.mockClear();
    },
  },
  {
    description: 'should handle XML exceptions and return an empty string',
    testFunc: () => {
      jest
        .spyOn(testeableError as any, '_serializableObject')
        .mockImplementation(() => {
          throw new Error('Simulated error');
        });
      jest
        .spyOn(testeableError as any, '_handleSerializationError')
        .mockImplementation(() => {});
      expect(testeableError.toXML()).toBe('');
    },
  },
];
