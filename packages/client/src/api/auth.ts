import BaseAPI from './base';
import { SignUpDTO, SignInDTO } from '../types/auth';
import { UserDTO } from '../types/user';
import { ApiResponse } from '../types/api';

class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  signIn(body: SignInDTO): ApiResponse<UserDTO> {
    return this.httpService.post('/signin', {
      body,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  signUp(body: SignUpDTO): ApiResponse<UserDTO> {
    return this.httpService.post('/signup', {
      body,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  getUser(): ApiResponse<UserDTO> {
    return this.httpService.get('/user', {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  logout(): ApiResponse<void> {
    return this.httpService.post('/logout');
  }
}

const authAPI = new AuthAPI();

export default authAPI;
