import apiHasError from './api-has-error';
import { ApiResponse } from '../types/api';

class HttpService {
  constructor(private endPoint: string) {}

  static returnResponse = async (response: Response): ApiResponse<any> => {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
      const data = await response.json();
      return {
        data: { ...data },
        status: response.status,
        error: apiHasError(data) ? data.reason : null,
      };
    }
    return {
      data: response.text(),
      status: response.status,
      error: !response.ok ? response.statusText : '',
    };
  };

  get = async (url: string) => {
    const response = await fetch(`${this.endPoint}${url}`, {
      credentials: 'include',
    });
    return HttpService.returnResponse(response);
  };

  post = async (url: string, body: any) => {
    const response = await fetch(`${this.endPoint}${url}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    return HttpService.returnResponse(response);
  };

  put = async (url: string, body: any) => {
    const response = await fetch(`${this.endPoint}${url}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    return HttpService.returnResponse(response);
  };

  delete = async (url: string) => {
    const response = await fetch(`${this.endPoint}${url}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return HttpService.returnResponse(response);
  };
}

export default HttpService;
