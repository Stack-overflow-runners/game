import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDTO } from '../../types/user';
import { fetchUser, signIn, signOut, signUp } from '../action-creators/auth';
import { setFulfilled, setPending, setRejected, UserState } from './common';

const initialState: UserState = {
  user: null,
  isLoading: true,
  isLoggedIn: false,
  error: null,
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
  extraReducers: builder => {
    builder.addCase(fetchUser.fulfilled.type, setFulfilled<UserState, UserDTO>);
    builder.addCase(fetchUser.pending.type, setPending<UserState>);
    builder.addCase(fetchUser.rejected.type, setRejected<UserState, string>);

    builder.addCase(signIn.fulfilled.type, setFulfilled<UserState, UserDTO>);
    builder.addCase(signIn.pending.type, setPending<UserState>);
    builder.addCase(signIn.rejected.type, setRejected<UserState, string>);

    builder.addCase(signUp.fulfilled.type, setFulfilled<UserState, UserDTO>);
    builder.addCase(signUp.pending.type, setPending<UserState>);
    builder.addCase(signUp.rejected.type, setRejected<UserState, string>);

    builder.addCase(signOut.pending.type, setPending<UserState>);
    builder.addCase(signOut.rejected.type, setRejected<UserState, string>);
    builder.addCase(signOut.fulfilled.type, (state: UserState) => {
      state.isLoading = false;
      state.error = null;
      state.user = null;
      state.isLoggedIn = false;
    });
  },
});

export const { setLoadingStatus, setUser, removeUser, updateUser } =
  userSlice.actions;

export default userSlice.reducer;
