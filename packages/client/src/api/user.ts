import { ApiResponse } from '../types/api';
import {
  RequestUserPasswordData,
  RequestUserAvatarData,
  RequestUserData,
  UserEntity,
} from '../types/user';
import { ForumBaseAPI } from './base';

class UserAPI extends ForumBaseAPI {
  constructor() {
    super('/user');
  }

  public updateProfile(body: RequestUserData): ApiResponse<UserEntity> {
    return this.httpService.put('/profile', {
      body,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  public updateAvatar(body: RequestUserAvatarData): ApiResponse<UserEntity> {
    return this.httpService.put('/profile/avatar', {
      body,
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
