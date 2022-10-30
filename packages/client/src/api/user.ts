import { ApiResponse } from '../types/api';
import {
  RequestUserPasswordData,
  RequestUserAvatarData,
  RequestUserData,
  UserDTO,
} from '../types/user';
import BaseAPI from './base';

class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  public updateProfile(body: RequestUserData): ApiResponse<UserDTO> {
    return this.httpService.put('/profile', {
      body,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  public updateAvatar(body: RequestUserAvatarData): ApiResponse<void> {
    return this.httpService.put('/profile/avatar', {
      body,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  public updatePassword(body: RequestUserPasswordData): ApiResponse<void> {
    return this.httpService.put('/password', {
      body,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

const userAPI = new UserAPI();

export default userAPI;
