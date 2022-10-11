import AuthAPI from '../../../api/auth';
import { SignInDTO } from '../../../types/auth';
import { ApiResponse } from '../../../types/api';
import { UserDTO } from '../../../types/user';

const signIn = async (payload: SignInDTO): ApiResponse<UserDTO> => {
  const response = await AuthAPI.signIn(payload);
  if (response.error) {
    return response;
  }
  const userRes = await AuthAPI.getUser();
  if (userRes.error) {
    return userRes;
  }
  return { data: userRes.data };
};

export default signIn;
