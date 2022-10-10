import { ApiResponse } from '../types/api';

export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type RequestOptions<Data> = {
  credentials?: RequestCredentials;
  method?: string;
  body?: Data;
  headers?: Record<string, string>;
};

class HttpService {
  constructor(private endPoint: string) {}

  query = (url: string, options?: RequestOptions<any>): ApiResponse<any> =>
    fetch(`${this.endPoint}${url}`, options)
      .then(async response => {
        if (!response.ok) {
          return Promise.reject(response);
        }
        const contentType = response.headers.get('content-type');
        const data = contentType?.includes('application/json')
          ? await response.json()
          : await response.text();
        return Promise.resolve({ data, status: response.status });
      })
      .catch(error => {
        if (typeof error.json === 'function') {
          return error
            .json()
            .then((_error: any) => ({ error: _error.reason }))
            .catch((_error: any) => ({ error: _error.statusText }));
        }
        return { error };
      });

  get = (url: string, options?: RequestOptions<any>): Promise<any> =>
    this.query(url, {
      ...options,
      credentials: 'include',
      method: METHODS.GET,
    });

  post = (url: string, options?: RequestOptions<any>): Promise<any> =>
    this.query(url, {
      ...options,
      credentials: 'include',
      method: METHODS.POST,
    });

  put = (url: string, options?: RequestOptions<any>): Promise<any> =>
    this.query(url, {
      ...options,
      credentials: 'include',
      method: METHODS.PUT,
    });

  delete = (url: string, options?: RequestOptions<any>): Promise<any> =>
    this.query(url, {
      ...options,
      credentials: 'include',
      method: METHODS.DELETE,
    });
}

export default HttpService;
