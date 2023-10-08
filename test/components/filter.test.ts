import {
  ErrorEnhanced,
  FilterInterface,
  FilterUtility,
  SerializersInterface,
  SerializersUtility,
} from '../../src';

type ErrorEnhancedType = Error & SerializersInterface & FilterInterface;

// Test cases related to Filtering
describe('Filtering', () => {
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

  it('should filter unused properties correctly', () => {
    const filteredError = testeableError.filterUnused();
    const jsonStr = filteredError.toJSON();
    const parsedJson = JSON.parse(jsonStr);
    expect(parsedJson).not.toHaveProperty('name');
  });

  it('should preserve name and message properties', () => {
    testeableError.name = 'TestName';
    testeableError.message = 'TestMessage';

    const filteredError = testeableError.filterUnused();
    const jsonStr = filteredError.toJSON();
    const parsedJson = JSON.parse(jsonStr);

    expect(parsedJson).toHaveProperty('name', 'TestName');
    expect(parsedJson).toHaveProperty('message', 'TestMessage');
  });
});
