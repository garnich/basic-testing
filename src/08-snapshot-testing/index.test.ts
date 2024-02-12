// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

const expectReult = {
  next: {
    next: {
      next: {
        next: {
          next: null,
          value: null,
        },
        value: 'd',
      },
      value: 'c',
    },
    value: 'b',
  },
  value: 'a',
};

const values: string[] = ['a', 'b', 'c', 'd'];

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(values)).toStrictEqual(expectReult);
  });

  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(values)).toMatchSnapshot(expectReult);
  });
});
