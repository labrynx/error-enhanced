import {
  ErrorEnhanced,
  FilterInterface,
  FilterUtility,
  SerializersInterface,
  SerializersUtility,
} from '../../../lib';

type ErrorEnhancedType = Error & SerializersInterface & FilterInterface;

describe('Filter', () => {
  let testeableError: ErrorEnhancedType;

  beforeEach(() => {
    testeableError = new ErrorEnhanced([
      new SerializersUtility(),
      new FilterUtility(),
    ]) as ErrorEnhancedType;
  });

  afterEach(() => {
    testeableError = undefined!;
  });
  describe('Property Preservation', () => {
    it('should preserve name and message properties', () => {
      testeableError.name = 'TestName';
      testeableError.message = 'TestMessage';

      const filteredError = testeableError.filterUnused();
      const jsonStr = filteredError.toJSON();
      const parsedJson = JSON.parse(jsonStr);

      expect(parsedJson).toHaveProperty('name', 'TestName');
      expect(parsedJson).toHaveProperty('message', 'TestMessage');
    });

    it('should have no extra properties on initialization', () => {
      testeableError.name = 'TestName';
      testeableError.message = 'TestMessage';
      const jsonStr = testeableError.toJSON();
      const parsedJson = JSON.parse(jsonStr);
      expect(Object.keys(parsedJson)).toEqual(['name', 'message']);
    });

    it('should preserve custom properties', () => {
      (testeableError as any).customProp = 'customValue';
      const filteredError = testeableError.filterUnused();
      const jsonStr = filteredError.toJSON();
      const parsedJson = JSON.parse(jsonStr);
      expect(parsedJson).toHaveProperty('customProp', 'customValue');
    });
  });

  describe('Property Filtering', () => {
    it('should filter unused properties correctly', () => {
      const filteredError = testeableError.filterUnused();
      const jsonStr = filteredError.toJSON();
      const parsedJson = JSON.parse(jsonStr);
      expect(parsedJson).not.toHaveProperty('name');
    });

    it('should handle null or undefined properties correctly', () => {
      (testeableError as any).someNull = null;
      (testeableError as any).someUndefined = undefined;
      const filteredError = testeableError.filterUnused();
      const jsonStr = filteredError.toJSON();
      const parsedJson = JSON.parse(jsonStr);
      expect(parsedJson).not.toHaveProperty('someNull');
      expect(parsedJson).not.toHaveProperty('someUndefined');
    });

    it('should filter empty arrays', () => {
      (testeableError as any).emptyArray = [];
      const filteredError = testeableError.filterUnused();
      const jsonStr = filteredError.toJSON();
      const parsedJson = JSON.parse(jsonStr);
      expect(parsedJson).not.toHaveProperty('emptyArray');
    });

    it('should filter empty objects', () => {
      (testeableError as any).emptyObject = {};
      const filteredError = testeableError.filterUnused();
      const jsonStr = filteredError.toJSON();
      const parsedJson = JSON.parse(jsonStr);
      expect(parsedJson).not.toHaveProperty('emptyObject');
    });
  });

  describe('Object Immutability', () => {
    it('should not modify the original object', () => {
      const originalJsonStr = testeableError.toJSON();
      testeableError.filterUnused();
      const afterJsonStr = testeableError.toJSON();
      expect(originalJsonStr).toBe(afterJsonStr);
    });
  });
});
