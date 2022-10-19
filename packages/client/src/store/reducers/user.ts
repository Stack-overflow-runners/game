import { Action, LoadingActionTypes, UserActionTypes } from '../actions/user';
import { UserDTO } from '../../types/user';
import { Nullable } from '../../types/common';

type UserState = {
  user: Nullable<UserDTO>;
  isLoading: boolean;
  isLoggedIn: boolean;
};

const defaultState: UserState = {
  user: null,
  isLoading: false,
  isLoggedIn: false,
};

const userReducer = (
  /* eslint-disable-next-line @typescript-eslint/default-param-last */
  state: UserState = defaultState,
  { type, payload }: Action
): UserState => {
  switch (type) {
    case LoadingActionTypes.SET_LOADING_STATUS:
      return {
        ...state,
        isLoading: payload,
      };
    case UserActionTypes.SET_USER:
      return {
        ...state,
        user: payload,
        isLoggedIn: true,
      };
    case UserActionTypes.REMOVE_USER:
      return {
        ...state,
        user: null,
        isLoggedIn: false,
      };
    case UserActionTypes.UPDATE_USER:
      return {
        ...state,
        user: payload ? { ...state.user, ...payload } : state.user,
      };
    default:
      return state;
  }
};

export default userReducer;
