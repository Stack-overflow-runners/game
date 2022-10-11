import BaseAPI from './base';
import { SignUpDTO, SignInDTO } from '../types/auth';
import { UserDTO } from '../types/user';
import { ApiResponse } from '../types/api';

class AuthAPI extends BaseAPI {
  private static instance: AuthAPI;

  private constructor() {
    super('/auth');
  }

  public static getInstance(): AuthAPI {
    if (!AuthAPI.instance) {
      AuthAPI.instance = new AuthAPI();
    }

    return AuthAPI.instance;
  }

  signIn(payload: SignInDTO): ApiResponse<UserDTO> {
    return this.httpService.post('/signin', {
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });
  }

  signUp(payload: SignUpDTO): ApiResponse<UserDTO> {
    return this.httpService.post('/signup', {
      body: JSON.stringify(payload),
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

const authAPI = AuthAPI.getInstance();

export default authAPI;
