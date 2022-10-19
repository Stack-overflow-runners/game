import { configureStore } from '@reduxjs/toolkit';
import leaderBoardReducer from './reducers/leader-board';
import userReducer from './reducers/user';

export const store = configureStore({
  reducer: {
    user: userReducer,
    leaderBoard: leaderBoardReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
