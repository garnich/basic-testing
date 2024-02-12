import lodash from 'lodash';
import { getBankAccount, InsufficientFundsError, TransferFailedError, SynchronizationFailedError  } from '.';

describe('BankAccount', () => {
  beforeEach(() => {
    jest.unmock('lodash');
  })

  test('should create account with initial balance', () => {
    const newAccount = getBankAccount(100);
    expect(newAccount.getBalance()).toEqual(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const newAccount = getBankAccount(100);
    expect(() => newAccount.withdraw(1000)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const newAccount = getBankAccount(100);
    const destinationAccount = getBankAccount(0)
    expect(() => newAccount.transfer(1000, destinationAccount)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const newAccount = getBankAccount(100);
    expect(() => newAccount.transfer(1000, newAccount)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const newAccount = getBankAccount(100);
    newAccount.deposit(10);
    expect(newAccount.getBalance()).toEqual(110);
  });

  test('should withdraw money', () => {
    const newAccount = getBankAccount(100);
    newAccount.withdraw(10);
    expect(newAccount.getBalance()).toEqual(90);
  });

  test('should transfer money', () => {
    const newAccount = getBankAccount(100);
    const destinationAccount = getBankAccount(0);

    expect(destinationAccount.getBalance()).toEqual(0);

    newAccount.transfer(50, destinationAccount)

    expect(destinationAccount.getBalance()).toEqual(50);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    lodash.random = jest.fn(() => 1)
    const newAccount = getBankAccount(100);

    const fetchBalanceResponse = await newAccount.fetchBalance();

    expect(fetchBalanceResponse).not.toBeNull();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    lodash.random = jest.fn(() => 1)

    const newAccount = getBankAccount(1000);
  
    await newAccount.synchronizeBalance();

    expect(newAccount.getBalance()).toBeLessThan(1000);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    lodash.random = jest.fn(() => 0)

    const newAccount = getBankAccount(100);
  
    expect(newAccount.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);
  });
});
