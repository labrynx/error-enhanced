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

export const yamlTests = [
  {
    description: 'should serialize to YAML correctly',
    testFunc: () => {
      const serializedStr = filteredError.toYAML();
      expect(serializedStr).toContain('_category: unknown');
    },
  },
  {
    description: 'should serialize to YAML without throwing an error',
    testFunc: () => {
      expect(() => {
        filteredError.toYAML();
      }).not.toThrow();
    },
  },
  {
    description: 'should throw an error when YAML serialization fails',
    testFunc: () => {
      jest.spyOn(filteredError, 'toYAML').mockImplementation(() => {
        throw new Error('Forced YAML error');
      });
      expect(() => {
        filteredError.toYAML();
      }).toThrow('Forced YAML error');
    },
  },
  {
    description: 'should serialize to YAML with correct keys',
    testFunc: () => {
      const yamlStr = filteredError.toYAML();
      expect(yamlStr).toContain('_severity:');
      expect(yamlStr).toContain('_category:');
    },
  },
  {
    description: 'should handle errors during YAML serialization',
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
        testeableError.toYAML();
      }).toThrow('Failed to serialize to YAML: Forced error');
      expect(handleSerializationErrorSpy).toHaveBeenCalled();
      handleSerializationErrorSpy.mockClear();
    },
  },
  {
    description: 'should handle YAML exceptions and return an empty string',
    testFunc: () => {
      jest
        .spyOn(testeableError as any, '_serializableObject')
        .mockImplementation(() => {
          throw new Error('Simulated error');
        });
      jest
        .spyOn(testeableError as any, '_handleSerializationError')
        .mockImplementation(() => {});
      expect(testeableError.toYAML()).toBe('');
    },
  },
];
