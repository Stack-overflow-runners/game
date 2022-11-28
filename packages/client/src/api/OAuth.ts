import BaseAPI from './base';
import { OAuthServiceIdDTO, OAuthSignInYandexDTO } from '../types/auth';
import { ApiResponse } from '../types/api';

class OAuthYandexAPI extends BaseAPI {
  constructor() {
    super('/oauth/yandex');
  }

  signIn(body: OAuthSignInYandexDTO): ApiResponse<string> {
    return this.httpService.post('', {
      body,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  getServiceId(query: string): ApiResponse<OAuthServiceIdDTO> {
    return this.httpService.get(`/service-id?redirect_uri=${query}`, {
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

const oAuthYandexAPI = new OAuthYandexAPI();

export default oAuthYandexAPI;
