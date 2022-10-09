import BaseAPI from './base';
import { SignUpDTO, SignInDTO } from '../types/auth';
import { UserDTO } from '../types/user';
import { ApiResponse } from '../types/api';

export default class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signIn(payload: SignInDTO): ApiResponse<UserDTO> {
    return this.httpService.post('/signin', payload);
  }

  signUp(payload: SignUpDTO): ApiResponse<UserDTO> {
    return this.httpService.post('/signup', payload);
  }

  getUser(): ApiResponse<UserDTO> {
    return this.httpService.get('/user');
  }

  logout(): ApiResponse<void> {
    return this.httpService.post('/logout', {});
  }
}
