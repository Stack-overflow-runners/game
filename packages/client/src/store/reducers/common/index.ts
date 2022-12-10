import { PayloadAction } from '@reduxjs/toolkit';
import { Leader } from '../../../pages/leaderBoard/types';
import { Nullable } from '../../../types/common';
import { UserDTO } from '../../../types/user';

export type LoadingState = {
  isLoading: boolean;
  error: Nullable<string>;
};

export type UserState = LoadingState & {
  user: Nullable<UserDTO>;
  isLoggedIn: boolean;
};

export type LeaderBoardState = LoadingState & {
  isLoading: boolean;
  leaders: Nullable<Leader[]>;
};

export type ActionPayload<T> = PayloadAction<T, string, any, any>;

export const setPending = <T extends LoadingState>(state: T) => {
  state.isLoading = true;
  state.error = null;
};

export const setRejected = <T extends LoadingState, A extends Nullable<string>>(
  state: T,
  action: ActionPayload<A>
) => {
  state.isLoading = false;
  state.error = action.payload;
};

export const setFulfilled = <T extends UserState, A extends UserDTO>(
  state: T,
  action: ActionPayload<A>
) => {
  state.isLoading = false;
  state.error = null;
  state.user = action.payload;
  state.isLoggedIn = true;
};
