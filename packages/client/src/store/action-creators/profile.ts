import { createAsyncThunk } from '@reduxjs/toolkit';
import { RequestUserData } from '../../types/user';
import userAPI from '../../api/user';


export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (payload: RequestUserData, thunkAPI) => {
    try {
      const { data, error } = await userAPI.updateProfile(payload);
      if (error) {
        return thunkAPI.rejectWithValue(error);
      }
      return data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue(
        `Не удалось сохранить данные. ${e.message}`
      );
    }
  }
);

const actions = {
  updateProfile,
};
export default actions;
