import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDTO } from '../../types/user';
import { Nullable } from '../../types/common';
import { fetchUser, signIn, signOut, signUp } from '../action-creators/auth';

type UserState = {
  user: Nullable<UserDTO>;
  isLoading: boolean;
  isLoggedIn: boolean;
  error: Nullable<string>;
};

const initialState: UserState = {
  user: null,
  isLoading: true,
  isLoggedIn: false,
  error: null,
};

const setPending = (state: UserState) => {
  state.isLoading = true;
  state.error = null;
};

const setRejected = (state: UserState, action: PayloadAction<string>) => {
  state.isLoading = false;
  state.error = action.payload;
};

const setFulfilled = (state: UserState, action: PayloadAction<UserDTO>) => {
  state.isLoading = false;
  state.error = null;
  state.user = action.payload;
  state.isLoggedIn = true;
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoadingStatus(state: UserState, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setUser(state: UserState, action: PayloadAction<UserDTO>) {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    removeUser(state: UserState) {
      state.user = null;
      state.isLoggedIn = false;
    },
    updateUser(state: UserState, action: PayloadAction<Partial<UserDTO>>) {
      if (!state.user) return;

      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: {
    [fetchUser.fulfilled.type]: setFulfilled,
    [fetchUser.pending.type]: setPending,
    [fetchUser.rejected.type]: setRejected,
    [signIn.fulfilled.type]: setFulfilled,
    [signIn.pending.type]: setPending,
    [signIn.rejected.type]: setRejected,
    [signUp.fulfilled.type]: setFulfilled,
    [signUp.pending.type]: setPending,
    [signUp.rejected.type]: setRejected,
    [signOut.pending.type]: setPending,
    [signOut.rejected.type]: setRejected,
    [signOut.fulfilled.type]: (state: UserState) => {
      state.isLoading = false;
      state.error = null;
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setLoadingStatus, setUser, removeUser, updateUser } =
  userSlice.actions;

export default userSlice.reducer;
