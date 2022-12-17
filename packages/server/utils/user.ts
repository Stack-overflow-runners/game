import type { UserDTO, UserEntity } from 'common';
import User from '../models/user.model';
import { httpService } from './http-service';
import { API_YANDEX_URL } from './const';

export const userInterceptorHandler = async (
  user: UserDTO
): Promise<UserEntity | null> => {
  const {
    id: yandexId,
    login,
    first_name: name,
    second_name: lastname,
    display_name: displayName,
    avatar,
    phone,
    email,
  } = user;
  if (!login || !email || !yandexId) {
    console.log('userHandler: login or email or yandexId is empty');
    return null;
  }
  let dbUser = await User.findOne({ where: { yandexId } });
  if (!dbUser) {
    dbUser = await User.create({
      userId: yandexId,
      yandexId,
      email,
      phone: user.phone,
      avatar: user.avatar,
      name,
      lastname,
      displayName,
      login: user.login,
    });
  } else {
    // TODO: update only IF needed
    dbUser = await dbUser.update({
      email,
      phone,
      avatar,
      name,
      lastname,
      login,
      displayName,
    });
  }

  if (!dbUser.dataValues) {
    return null;
  }
  delete dbUser.dataValues.yandexId;
  return {
    ...dbUser.dataValues,
    forumId: dbUser.dataValues.userId,
  } as UserEntity;
};

export const transformUserDTOtoUserEntity = (
  user: UserDTO
): Partial<UserEntity> => {
  const {
    id: yandexId,
    login,
    first_name: name,
    second_name: lastname,
    display_name: displayName,
    avatar,
    phone,
    email,
  } = user;

  return {
    userId: yandexId,
    email,
    phone,
    avatar,
    name,
    lastname,
    displayName,
    login,
  };
};

export const getUser = async (cookie = ''): Promise<UserDTO | null> => {
  const cookieString = [...Object.entries(cookie)]
    .map(([key, value]) => `${key}=${value}`)
    .join('; ');
  try {
    const { data } = await httpService(`${API_YANDEX_URL}/auth/user`, {
      method: 'get',
      headers: {
        Cookie: cookieString,
      },
    });
    return data;
  } catch (error: any) {
    return null;
  }
};

const userActions = {
  getUser,
  userInterceptorHandler,
  transformUserDTOtoUserEntity,
};

export default userActions;
