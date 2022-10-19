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
      return { ...state, isLoading: action.payload };
    },
    setUser(state: UserState, action: PayloadAction<UserDTO>) {
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    },
    removeUser(state: UserState) {
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    },
    updateUser(state: UserState, action: PayloadAction<UserDTO>) {
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    },
  },
});

export const { setLoadingStatus, setUser, removeUser, updateUser } =
  userSlice.actions;

export default userSlice.reducer;
