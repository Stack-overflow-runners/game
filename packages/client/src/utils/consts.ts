import { Indexable } from '../types/common';

const API_URL = 'https://ya-praktikum.tech/api/v2';
const RESOURCE_URL = `${API_URL}/resources`
// Team name. Used to make unique leaderboard for each project. Yandex API
const TEAM = 'stackoverflowRunners';
const RATING_FIELD = 'score';
// OAuth providers
export const OAUTH_PROVIDERS: Indexable<any> = {
  yandex: {
    name: 'Yandex',
    serviceUrl:
      'https://oauth.yandex.ru/authorize?response_type=code&client_id=',
    signInURI: 'https://ya-praktikum.tech/api/v2/oauth/yandex',
    getServiceIdURI: 'https://ya-praktikum.tech/api/v2/oauth/yandex/service-id',
    redirectURI: 'http://localhost:3000',
  },
};
//  Local storage keys
export enum Locals {
  OAUTH_PROVIDER = 'oauth-provider',
}

export default { API_URL, TEAM, RATING_FIELD, OAUTH_PROVIDERS, RESOURCE_URL };
