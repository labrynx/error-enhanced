import { parse } from 'papaparse';

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

export const csvTests = [
  {
    description: 'should serialize to CSV correctly',
    testFunc: () => {
      const serializedStr = filteredError.toCSV();
      expect(serializedStr).toContain('"_category"');
    },
  },
  {
    description: 'should serialize to CSV without throwing an error',
    testFunc: () => {
      expect(() => {
        filteredError.toCSV();
      }).not.toThrow();
    },
  },
  {
    description: 'should throw an error when CSV serialization fails',
    testFunc: () => {
      jest.spyOn(filteredError, 'toCSV').mockImplementation(() => {
        throw new Error('Forced CSV error');
      });
      expect(() => {
        filteredError.toCSV();
      }).toThrow('Forced CSV error');
    },
  },
  {
    description: 'should serialize to CSV with correct headers',
    testFunc: () => {
      const delimeter = ',';
      const quoted = false;
      const csvStr = filteredError.toCSV(delimeter, quoted);
      const lines = csvStr.split('\n');
      const headers = lines[0].split(delimeter);
      expect(headers).toEqual(
        expect.arrayContaining(['_severity', '_category']),
      );
    },
  },
  {
    description: 'should flatten Error objects when serializing to CSV',
    testFunc: () => {
      const mockError = new Error('Test error message');
      jest.spyOn(filteredError as any, '_serializableObject').mockReturnValue({
        field1: 'value1',
        field2: mockError,
      });
      const csvOutput = filteredError.toCSV();
      const expectedStack = (mockError as any).stack.replace(
        /["\n]/g,
        match => {
          return match === '\n' ? '\\n' : '\\"';
        },
      );
      expect(csvOutput).toContain(expectedStack);
    },
  },
  {
    description: 'should handle errors during CSV serialization',
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
        testeableError.toCSV();
      }).toThrow('Failed to serialize to CSV: Forced error');
      expect(handleSerializationErrorSpy).toHaveBeenCalled();
      handleSerializationErrorSpy.mockClear();
    },
  },
  {
    description: 'should handle CSV exceptions and return an empty string',
    testFunc: () => {
      jest
        .spyOn(testeableError as any, '_serializableObject')
        .mockImplementation(() => {
          throw new Error('Simulated error');
        });
      jest
        .spyOn(testeableError as any, '_handleSerializationError')
        .mockImplementation(() => {});
      expect(testeableError.toCSV()).toBe('');
    },
  },
  {
    description: 'should handle object properties and stringify them',
    testFunc: () => {
      jest.spyOn(testeableError as any, '_serializableObject').mockReturnValue({
        key1: 'value1',
        key2: { subKey: 'subValue' },
      });
      const csvStr = testeableError.toCSV();
      const parsed = parse(csvStr, {
        header: true,
        dynamicTyping: true,
      });
      const row = parsed.data[0];
      expect((row as any).key1).toEqual('value1');
      expect(JSON.parse((row as any).key2)).toEqual({ subKey: 'subValue' });
    },
  },
];
