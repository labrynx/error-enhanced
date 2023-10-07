import { testeableError } from '../testeable-error';

// Test cases related to Filtering
describe('Filtering', () => {
  it('should filter unused properties correctly', () => {
    testeableError.setErrorCodePrefix('');
    const filteredError = testeableError.filterUnused();
    const jsonStr = filteredError.toJSON();
    const parsedJson = JSON.parse(jsonStr);
    expect(parsedJson).not.toHaveProperty('_errorCodePrefix');
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
