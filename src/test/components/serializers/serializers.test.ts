/* eslint-disable no-useless-escape */

import { csvTests } from './helpers/csv';
import { jsonTests } from './helpers/json';
import { xmlTests } from './helpers/xml';
import { yamlTests } from './helpers/yaml';

import {
  IdentifiersInterface,
  SerializersInterface,
  FilterInterface,
  ErrorEnhanced,
  IdentifiersEnhancer,
  FilterUtility,
  SerializersUtility,
} from '../../../lib';

type ErrorEnhancedType = Error &
  IdentifiersInterface &
  SerializersInterface &
  FilterInterface;

describe('Serialization', () => {
  let testeableError: ErrorEnhancedType;

  beforeEach(() => {
    testeableError = new ErrorEnhanced([
      new IdentifiersEnhancer(),
      new FilterUtility(),
      new SerializersUtility(),
    ]) as ErrorEnhancedType;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('Serializers', () => {
    describe('JSON Serialization', () => {
      jsonTests.forEach(({ description, testFunc }) => {
        it(description, testFunc);
      });
    });

    describe('CSV Serialization', () => {
      csvTests.forEach(({ description, testFunc }) => {
        it(description, testFunc);
      });
    });

    describe('XML Serialization', () => {
      xmlTests.forEach(({ description, testFunc }) => {
        it(description, testFunc);
      });
    });

    describe('YAML Serialization', () => {
      yamlTests.forEach(({ description, testFunc }) => {
        it(description, testFunc);
      });
    });
  });

  describe('Shared methods', () => {
    describe('filterUnused Mixin Method', () => {
      it('should call applyFilter if it exists', () => {
        const mockInstance = {
          applyFilter: jest.fn(),
          _applyObjectFilter: (testeableError as any)._applyObjectFilter,
        };

        mockInstance._applyObjectFilter();

        expect(mockInstance.applyFilter).toHaveBeenCalled();
      });

      it('should not call applyFilter if it does not exist', () => {
        const mockInstance = {
          _applyObjectFilter: (testeableError as any)._applyObjectFilter,
        };

        mockInstance._applyObjectFilter();
      });
    });

    describe('serializableObject Method', () => {
      it('should return the cache if it exists', () => {
        (testeableError as any)._serializableCache = { some: 'object' };

        const result = (testeableError as any)._serializableObject();
        expect(result).toBe((testeableError as any)._serializableCache);
      });

      it('_applyObjectFilter should handle Error instances', () => {
        const mockError = new Error('test');
        jest
          .spyOn(testeableError as any, '_applyObjectFilter')
          .mockReturnValue({
            keyWithError: mockError,
          });

        const flattenErrorObjectSpy = jest
          .spyOn(testeableError as any, '_flattenErrorObject')
          .mockReturnValue({});

        (testeableError as any)._serializableObject();

        expect(flattenErrorObjectSpy).toHaveBeenCalledWith(mockError);

        jest.restoreAllMocks();
      });
    });
  });
});
