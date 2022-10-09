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
    try {
      const response = await fetch(`${this.endPoint}${url}`, {
        credentials: 'include',
      });
      return await HttpService.returnResponse(response);
    } catch (e: any) {
      return HttpService.returnResponse(
        new Response(JSON.stringify({ reason: e.message }), {
          status: 500,
          statusText: e.message,
        })
      );
    }
  };

  post = async (url: string, body: any) => {
    try {
      const response = await fetch(`${this.endPoint}${url}`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      });
      return await HttpService.returnResponse(response);
    } catch (e: any) {
      return HttpService.returnResponse(
        new Response(JSON.stringify({ reason: e.message }), {
          status: 500,
          statusText: e.message,
        })
      );
    }
  };

  put = async (url: string, body: any) => {
    try {
      const response = await fetch(`${this.endPoint}${url}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      return await HttpService.returnResponse(response);
    } catch (e: any) {
      return HttpService.returnResponse(
        new Response(JSON.stringify({ reason: e.message }), {
          status: 500,
          statusText: e.message,
        })
      );
    }
  };

  delete = async (url: string) => {
    try {
      const response = await fetch(`${this.endPoint}${url}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      return await HttpService.returnResponse(response);
    } catch (e: any) {
      return HttpService.returnResponse(
        new Response(JSON.stringify({ reason: e.message }), {
          status: 500,
          statusText: e.message,
        })
      );
    }
  };
}

export default HttpService;
