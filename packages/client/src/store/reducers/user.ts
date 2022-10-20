import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserDTO } from '../../types/user';
import { Nullable } from '../../types/common';

type UserState = {
  user: Nullable<UserDTO>;
  isLoading: boolean;
  isLoggedIn: boolean;
};

const initialState: UserState = {
  user: null,
  isLoading: false,
  isLoggedIn: false,
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
});

export const { setLoadingStatus, setUser, removeUser, updateUser } =
  userSlice.actions;

export default userSlice.reducer;
