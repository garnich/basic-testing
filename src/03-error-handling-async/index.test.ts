import { throwError, throwCustomError, resolveValue, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const testValue = 'Test Value';
    const value = await resolveValue(testValue);
    expect(value).toEqual(testValue);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errorMsg = 'Test error message';
    const error = () => throwError(errorMsg);
    expect(error).toThrow(errorMsg);
  });

  test('should throw error with default message if message is not provided', () => {
    const error = () => throwError();
    expect(error).toThrow('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const customError = () => throwCustomError();
    expect(customError).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await expect(rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
