import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Leader } from '../../pages/leaderBoard/types';
import { addLeader, getLeaders } from '../action-creators/leaders';
import { LeaderBoardState, setPending, setRejected } from './common';

const initialState: LeaderBoardState = {
  leaders: null,
  isLoading: false,
  error: null
};

const leaderBoardSlice = createSlice({
  name: 'leaderBoard',
  initialState,
  reducers: {
    setLoadingStatus(state: LeaderBoardState, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setLeaderBoard(state: LeaderBoardState, action: PayloadAction<Leader[]>) {
      state.leaders = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(addLeader.pending.type, setPending<LeaderBoardState>);
    builder.addCase(addLeader.rejected.type, setRejected<LeaderBoardState, string>);
    builder.addCase(addLeader.fulfilled.type, (state: LeaderBoardState) => state);

    builder.addCase(getLeaders.pending.type, setPending<LeaderBoardState>);
    builder.addCase(getLeaders.rejected.type, setRejected<LeaderBoardState, string>);
    builder.addCase(getLeaders.fulfilled.type, (
      state: LeaderBoardState, 
      action: PayloadAction<{ data: Leader}[]>
    ) => {
      const leaders = action.payload.map(item => item.data);
      state.isLoading = false;
      state.error = null;
      state.leaders = leaders;
    });
  }
});

export const { setLeaderBoard, setLoadingStatus } = leaderBoardSlice.actions;

export default leaderBoardSlice.reducer;
