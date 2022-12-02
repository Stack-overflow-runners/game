import { createAsyncThunk } from '@reduxjs/toolkit';
import { Leader } from '../../pages/leaderBoard/types';
import leaderAPI from '../../api/leader';
import { LeaderBoardData } from '../../types/leaders';

export const addLeader = createAsyncThunk(
  'leaderBoard/addLeader',
  async (payload: Leader, thunkAPI) => {
    try {
      const { data, error } = await leaderAPI.addLeader(payload);
      if (error) {
        return thunkAPI.rejectWithValue(error);
      }
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        `Не удалось добавить лидера. ${error.message}`
      );
    }
  }
);

export const getLeaders = createAsyncThunk(
  'leaderBoard/getLeaders',
  async (payload: LeaderBoardData, thunkAPI) => {
    try {
      const { data, error } = await leaderAPI.getLeaders(payload);
      if (error) {
        return thunkAPI.rejectWithValue(error);
      }
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        `Не удалось получить данные лидеров. ${error.message}`
      );
    }
  }
);

const actions = {
  addLeader,
  getLeaders,
};

export default actions;
