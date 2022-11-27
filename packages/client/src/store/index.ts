import { configureStore } from '@reduxjs/toolkit';
import leaderBoardReducer from './reducers/leader-board';
import userReducer from './reducers/user';

declare global {
  interface Window {
    __PRELOADED_STATE__?: object;
  }
}

// eslint-disable-next-line no-underscore-dangle
const preloadedState = window.__PRELOADED_STATE__;

// eslint-disable-next-line no-underscore-dangle
delete window.__PRELOADED_STATE__;

export const store = configureStore({
  reducer: {
    user: userReducer,
    leaderBoard: leaderBoardReducer,
  },
  devTools: true,
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
