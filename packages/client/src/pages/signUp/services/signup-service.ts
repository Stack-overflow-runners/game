import AuthAPI from '../../../api/auth';
import { SignUpDTO } from '../../../types/auth';
import { ApiResponse } from '../../../types/api';
import { UserDTO } from '../../../types/user';

const signUp = async (payload: SignUpDTO): ApiResponse<UserDTO> => {
  const api = new AuthAPI();
  const response = await api.signUp(payload);
  if (response.error) {
    return response;
  }
  const userRes = await api.getUser();
  if (userRes.error) {
    return userRes;
  }
  const user = userRes.data;
  return { ...userRes, data: user };
};

export default signUp;
