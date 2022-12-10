import AuthAPI from '../../../api/auth';
import { SignUpDTO } from '../../../types/auth';
import { ApiResponse } from '../../../types/api';
import { UserDTO } from '../../../types/user';
import { forumSignIn } from '../../forum/services/forum-service';

const signUp = async (payload: SignUpDTO): ApiResponse<UserDTO> => {
  const response = await AuthAPI.signUp(payload);
  if (response.error) {
    return response;
  }
  const userRes = await AuthAPI.getUser();
  if (userRes.error || !userRes.data) {
    return { error: 'Не удалось получить пользователя' };
  }
  // temporary not safe solution here
  const user = await forumSignIn(userRes.data);

  return user;
};

export default signUp;
