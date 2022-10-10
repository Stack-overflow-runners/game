import AuthAPI from '../../../api/auth';
import { SignUpDTO } from '../../../types/auth';
import { ApiResponse } from '../../../types/api';
import { UserDTO } from '../../../types/user';

const signUp = async (payload: SignUpDTO): ApiResponse<UserDTO> => {
  const response = await AuthAPI.signUp(payload);
  if (response.error) {
    return response;
  }
  const userRes = await AuthAPI.getUser();
  if (userRes.error) {
    return userRes;
  }
  return { data: userRes.data };
};

export default signUp;
