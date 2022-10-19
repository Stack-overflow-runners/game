import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Leader } from '../../pages/leaderBoard/types';
import { Nullable } from '../../types/common';

type LeaderBoardState = {
  isLoading: boolean;
  board: Nullable<Leader[]>;
};

const initialState: LeaderBoardState = {
  isLoading: false,
  board: null,
};
/* eslint-disable no-param-reassign */
const leaderBoardSlice = createSlice({
  name: 'leaderBoard',
  initialState,
  reducers: {
    setLoadingStatus(state: LeaderBoardState, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setLeaderBoard(state: LeaderBoardState, action: PayloadAction<Leader[]>) {
      state.board = action.payload;
    },
  },
});

export const { setLeaderBoard, setLoadingStatus } = leaderBoardSlice.actions;

export default leaderBoardSlice.reducer;
