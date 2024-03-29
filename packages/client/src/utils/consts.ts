import { Indexable } from '../types/common';

const API_URL = 'https://ya-praktikum.tech/api/v2';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const PROD_URL = 'https://spacerunner.ru';
const DEV_URL = `http://localhost:${__CLIENT_PORT__}`;
const FORUM_API_URL = IS_PRODUCTION
  ? `https://api.spacerunner.ru/api`
  : `http://localhost:${__SERVER_PORT__}/api`;
const RESOURCE_URL = `${API_URL}/resources`;
const PROXY_RESOURCE_URL = `${FORUM_API_URL}/resources`;
const AVATAR_PLACEHOLDER =
  'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
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
    redirectURI: IS_PRODUCTION ? PROD_URL : DEV_URL,
  },
};
//  Local storage keys
export enum Locals {
  OAUTH_PROVIDER = 'oauth-provider',
}

export default {
  API_URL,
  TEAM,
  RATING_FIELD,
  OAUTH_PROVIDERS,
  FORUM_API_URL,
  RESOURCE_URL,
  IS_PRODUCTION,
  PROD_URL,
  DEV_URL,
  AVATAR_PLACEHOLDER,
  PROXY_RESOURCE_URL,
};
