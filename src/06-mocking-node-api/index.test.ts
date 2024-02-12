import { readFileAsynchronously, doStuffByInterval, doStuffByTimeout } from '.';
import path, { join } from 'path';
import fs from 'fs';

let cb: () => void, delay: number;

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    cb = jest.fn();
    delay = 100;
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');

    doStuffByTimeout(cb, delay);

    expect(setTimeout).toHaveBeenCalledWith(cb, delay);
  });

  test('should call callback only after timeout', () => {
    doStuffByTimeout(cb, delay);

    expect(cb).not.toHaveBeenCalled();

    jest.runAllTimers();

    expect(cb).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  beforeEach(() => {
    cb = jest.fn();
    delay = 100;
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');

    doStuffByInterval(cb, delay);

    expect(setInterval).toHaveBeenCalledWith(cb, delay);
  });

  test('should call callback multiple times after multiple intervals', () => {
    doStuffByInterval(cb, delay);

    expect(cb).not.toHaveBeenCalled();

    jest.advanceTimersByTime(delay + 50);

    expect(cb).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(delay + 100);

    expect(cb).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  const filePath = 'test.txt';
  const fileMockData = 'Some text';

  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join');

    await readFileAsynchronously(filePath);

    expect(join).toHaveBeenCalledWith(__dirname, filePath);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);

    const fileData = await readFileAsynchronously(filePath)

    expect(fileData).toBeNull();
  });

  test('should return file content if file exists', async () => {
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(fileMockData);
    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    
    const fileData = await readFileAsynchronously(filePath);
    
    expect(fileData).toBe(fileMockData);
  });
});
