import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const url = 'https://jsonplaceholder.typicode.com';
const relativePath = './users';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {    
    const axiosCreateSpy = jest.spyOn(axios, 'create');

    jest.spyOn(axios.Axios.prototype, 'get').mockResolvedValueOnce({ data: 'data' });

    await throttledGetDataFromApi(relativePath);

    jest.runOnlyPendingTimers();

    expect(axiosCreateSpy).toHaveBeenCalled();
    expect(axiosCreateSpy).toHaveBeenCalledWith({ baseURL: url });
  });

  test('should perform request to correct provided url', async () => {
    const axiosSpy = jest.spyOn(axios.Axios.prototype, 'get').mockResolvedValueOnce({ data: 'data' });

    await throttledGetDataFromApi(relativePath);

    jest.runOnlyPendingTimers();
    
    expect(axiosSpy).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const mockData = [{ id: 1, name: 'Jhon'}];
    jest.spyOn(axios.Axios.prototype, 'get').mockResolvedValueOnce({ data: mockData });

    const response = await throttledGetDataFromApi(relativePath);

    jest.runOnlyPendingTimers();

    expect(response).toEqual(mockData);

  });
});
