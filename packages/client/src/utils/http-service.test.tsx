import fetchMock from 'jest-fetch-mock';
import HttpService from './http-service';

fetchMock.dontMock();

describe('http service', () => {
  let httpService: any;
  beforeAll(() => {
    httpService = new HttpService('https://jsonplaceholder.typicode.com');
  });

  test('get should return data', async () => {
    const data = await httpService.get('/todos/1');
    expect(data).toEqual({
      data: {
        completed: false,
        id: 1,
        title: 'delectus aut autem',
        userId: 1,
      },
      status: 200,
    });
  });

  test('post should return post data', async () => {
    const payload = {
      title: 'foo',
      body: 'bar',
      userId: 1,
    };

    const data = await httpService.post('/todos', {
      body: payload,
      headers: { 'Content-type': 'application/json' },
    });
    expect(data).toEqual(
      expect.objectContaining({
        data: expect.objectContaining(payload),
        status: 201,
      })
    );
  });

  test('put should return updated data', async () => {
    const payload = {
      title: 'updated title',
    };

    const data = await httpService.put('/todos/1', {
      body: payload,
      headers: { 'Content-Type': 'application/json' },
    });
    expect(data).toEqual(
      expect.objectContaining({
        data: expect.objectContaining(payload),
        status: 200,
      })
    );
  });

  test('delete should return no data', async () => {
    const data = await httpService.delete('/todos/1');
    expect(data).toEqual({
      data: {},
      status: 200,
    });
  });
});
