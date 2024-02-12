// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const testParams = { a: 2, b: 2, action: Action.Add}
    expect(simpleCalculator(testParams)).toEqual(testParams.a + testParams.b);
  });

  test('should subtract two numbers', () => {
    const testParams = { a: 5, b: 2, action: Action.Subtract}
    expect(simpleCalculator(testParams)).toEqual(testParams.a - testParams.b);
  });

  test('should multiply two numbers', () => {
    const testParams = { a: 5, b: 2, action: Action.Multiply}
    expect(simpleCalculator(testParams)).toEqual(testParams.a * testParams.b);
  });

  test('should divide two numbers', () => {
    const testParams = { a: 6, b: 2, action: Action.Divide}
    expect(simpleCalculator(testParams)).toEqual(testParams.a / testParams.b);
  });

  test('should exponentiate two numbers', () => {
    const testParams = { a: 3, b: 2, action: Action.Exponentiate}
    expect(simpleCalculator(testParams)).toEqual(Math.pow(testParams.a, testParams.b));
  });

  test('should return null for invalid action', () => {
    const testParams = { a: 3, b: 2, action: 'invalidAction'}
    expect(simpleCalculator(testParams)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const testParams = { a: '', b: [], action: Action.Add}
    expect(simpleCalculator(testParams)).toBeNull();
  });
});
