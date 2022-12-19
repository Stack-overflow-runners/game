import { ForumBaseAPI } from './base';
import { SignUpDTO, SignInDTO } from '../types/auth';
import { UserEntity } from '../types/user';
import { ApiResponse } from '../types/api';

class AuthAPI extends ForumBaseAPI {
  constructor() {
    super('/user');
  }

  signIn(body: SignInDTO): ApiResponse<UserEntity> {
    return this.httpService.post('/signin', {
      body,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  signUp(body: SignUpDTO): ApiResponse<UserEntity> {
    return this.httpService.post('/signup', {
      body,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  getUser(): ApiResponse<UserEntity> {
    return this.httpService.get('/', {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  logout(): ApiResponse<void> {
    return this.httpService.post('/logout');
  }
}

const authAPI = new AuthAPI();

export default authAPI;
