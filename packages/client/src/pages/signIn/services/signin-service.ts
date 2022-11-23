import AuthAPI from '../../../api/auth';
import { OAuthServiceIdDTO, SignInDTO } from '../../../types/auth';
import { ApiResponse } from '../../../types/api';
import { UserDTO } from '../../../types/user';
import OAuthYandexAPI from '../../../api/OAuth';
import getOAuthProvider from '../../../utils/get-OAuth-provider';
import LocalStorageService from '../../../utils/localstorage-service';

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

export const signInWithProvider = async (
  code: string
): ApiResponse<UserDTO> => {
  const providerName = LocalStorageService.getOAuthProvider();
  if (!providerName) {
    return { error: 'Не удалось получить провайдера' };
  }
  const provider = getOAuthProvider(providerName);
  if (provider) {
    if (provider.name === 'Yandex') {
      const response = await OAuthYandexAPI.signIn({
        code,
        redirect_uri: provider.redirectURI,
      });
      if (response.error) {
        return {
          error: response.error || 'Не удалось авторизоваться через OAuth',
        };
      }
      const { data, error } = await AuthAPI.getUser();
      if (error) {
        return {
          error: 'Не удалось получить пользователя (OAuth)',
        };
      }
      return { data };
    }
  }
  return { error: 'Неизвестный провайдер' };
};

export const getServiceIdFromProvider = async (
  payload: string
): ApiResponse<OAuthServiceIdDTO> => {
  const provider = getOAuthProvider(payload);
  const response = await OAuthYandexAPI.getServiceId(provider.redirectURI);
  if (response.error || !response?.data?.service_id) {
    return { error: response.error || 'Не удалось получить serviceId' };
  }
  LocalStorageService.setOAuthProvider(provider.name);
  return { data: response.data };
};

export default signIn;
