// eslint-disable-next-line max-classes-per-file
import HttpService from '../utils/http-service';
import CONSTS from '../utils/consts';

export default class BaseAPI {
  httpService: HttpService;

  constructor(endPoint: string) {
    this.httpService = new HttpService(`${CONSTS.API_URL}${endPoint}`);
  }
}
export class ForumBaseAPI {
  httpService: HttpService;

  constructor(endPoint: string) {
    this.httpService = new HttpService(`${CONSTS.FORUM_API_URL}${endPoint}`);
  }
}
