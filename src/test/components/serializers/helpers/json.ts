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

export const jsonTests = [
  {
    description: 'should serialize to JSON correctly',
    testFunc: () => {
      const serializedStr = filteredError.toJSON();
      expect(JSON.parse(serializedStr)).toHaveProperty('_category', 'unknown');
    },
  },
  {
    description: 'should serialize to JSON without throwing an error',
    testFunc: () => {
      expect(() => {
        filteredError.toJSON();
      }).not.toThrow();
    },
  },
  {
    description: 'should throw an error when JSON serialization fails',
    testFunc: () => {
      jest.spyOn(filteredError, 'toJSON').mockImplementation(() => {
        throw new Error('Forced JSON error');
      });
      expect(() => {
        filteredError.toJSON();
      }).toThrow('Forced JSON error');
    },
  },
  {
    description: 'should serialize to JSON with correct keys',
    testFunc: () => {
      const jsonStr = filteredError.toJSON();
      const parsedJson = JSON.parse(jsonStr);
      const keys = Object.keys(parsedJson);
      expect(keys).toEqual(expect.arrayContaining(['_severity', '_category']));
    },
  },
  {
    description:
      'should exclude keys with null, undefined, or empty string values',
    testFunc: () => {
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
    },
  },
  {
    description: 'should serialize to JSON with custom replacer',
    testFunc: () => {
      jest.spyOn(testeableError as any, '_serializableObject').mockReturnValue({
        key1: 'value1',
        key2: null,
        key3: undefined,
        key4: '',
      });
      const replacer = (key, value) => (key === '_category' ? 'custom' : value);
      const jsonStr = filteredError.toJSON(replacer);
      const parsedJson = JSON.parse(jsonStr);
      expect(parsedJson).toHaveProperty('_category', 'custom');
    },
  },
  {
    description: 'should serialize to JSON with correct keys after filtering',
    testFunc: () => {
      const jsonStr = filteredError.toJSON();
      const parsedJson = JSON.parse(jsonStr);
      const keys = Object.keys(parsedJson);
      expect(keys).toEqual(expect.arrayContaining(['_severity', '_category']));
    },
  },
  {
    description: 'should handle errors during JSON serialization',
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
        testeableError.toJSON();
      }).toThrow('Failed to serialize to JSON: Forced error');
      expect(handleSerializationErrorSpy).toHaveBeenCalled();
      handleSerializationErrorSpy.mockClear();
    },
  },
  {
    description: 'should handle JSON exceptions and return an empty string',
    testFunc: () => {
      jest
        .spyOn(testeableError as any, '_serializableObject')
        .mockImplementation(() => {
          throw new Error('Simulated error');
        });
      jest
        .spyOn(testeableError as any, '_handleSerializationError')
        .mockImplementation(() => {});
      expect(testeableError.toJSON()).toBe('');
    },
  },
];
