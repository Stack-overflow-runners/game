import AuthAPI from '../../../api/auth';
import { SignUpDTO } from '../../../types/auth';
import { ApiResponse } from '../../../types/api';
import { UserEntity } from '../../../types/user';

const signUp = async (payload: SignUpDTO): ApiResponse<UserEntity> => {
  const response = await AuthAPI.signUp(payload);
  if (response.error) {
    return response;
  }
  const userRes = await AuthAPI.getUser();
  if (userRes.error || !userRes.data) {
    return { error: 'Не удалось получить пользователя' };
  }

  return { data: userRes.data };
};

export default signUp;
