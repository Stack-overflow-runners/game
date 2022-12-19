import axios from 'axios';
import { API_YANDEX_DOMAIN } from './const';

export const httpService = axios.create({
  baseURL: API_YANDEX_DOMAIN,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const http = {
  httpService,
};
export default http;
