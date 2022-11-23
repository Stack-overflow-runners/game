import { createAsyncThunk } from '@reduxjs/toolkit';
import { NavigateFunction } from 'react-router';
import AuthApi from '../../api/auth';
import { SignInDTO, SignUpDTO } from '../../types/auth';

import signInService, {
  signInWithProvider,
} from '../../pages/signIn/services/signin-service';
import signUpService from '../../pages/signUp/services/signup-service';

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (_, thunkAPI) => {
    try {
      const { data, error } = await AuthApi.getUser();
      if (error) {
        return thunkAPI.rejectWithValue(error.includes('Cookie') ? '' : error);
      }
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(
        `Не удалось загрузить пользователя. ${e.message}`
      );
    }
  }
);

export const signIn = createAsyncThunk(
  'user/login',
  async (payload: SignInDTO, thunkAPI) => {
    try {
      const { data, error } = await signInService(payload);
      if (error) {
        return thunkAPI.rejectWithValue(error);
      }
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(
        `Не удалось авторизоваться. ${e.message}`
      );
    }
  }
);

export const signUp = createAsyncThunk(
  'user/signUp',
  async (payload: SignUpDTO, thunkAPI) => {
    try {
      const { data, error } = await signUpService(payload);
      if (error) {
        return thunkAPI.rejectWithValue(error);
      }
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(
        `Не удалось зарегистрироваться. ${e.message}`
      );
    }
  }
);

export const signOut = createAsyncThunk('user/signOut', async (_, thunkAPI) => {
  try {
    const { data, error } = await AuthApi.logout();
    if (error) {
      return thunkAPI.rejectWithValue(error);
    }
    return data;
  } catch (e: any) {
    return thunkAPI.rejectWithValue(`Ошибка ${e.message}`);
  }
});

export const signInOAuth = createAsyncThunk(
  'user/signInOAuth',
  async (payload: { code: string; navigate: NavigateFunction }, thunkAPI) => {
    const { code, navigate } = payload;
    try {
      const { data, error } = await signInWithProvider(code);
      if (error) {
        navigate('/sign-in');
        return thunkAPI.rejectWithValue(error);
      }
      return data;
    } catch (e: any) {
      navigate('/sign-in');
      return thunkAPI.rejectWithValue(
        `Не удалось авторизоваться через OAuth. ${e.message}`
      );
    }
  }
);

const actions = {
  fetchUser,
  signIn,
  signUp,
  signOut,
  signInOAuth,
};
export default actions;
