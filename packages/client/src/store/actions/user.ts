import { BaseActionType } from './index';
import { UserDTO } from '../../types/user';
import { Nullable } from '../../types/common';

export enum LoadingActionTypes {
  SET_LOADING_STATUS = 'SET_LOADING_STATUS',
}

export enum UserActionTypes {
  SET_USER = 'SET_USER',
  REMOVE_USER = 'REMOVE_USER',
  UPDATE_USER = 'UPDATE_USER',
}

export type UserAction = BaseActionType<UserActionTypes, Nullable<UserDTO>>;
export type LoadingStatusAction = BaseActionType<LoadingActionTypes, boolean>;

export type Action = UserAction | LoadingStatusAction;

export const setLoadingStatus = (payload: boolean) => ({
  type: LoadingActionTypes.SET_LOADING_STATUS,
  payload,
});

export const setUser = (payload: UserDTO) => ({
  type: UserActionTypes.SET_USER,
  payload,
});

export const removeUser = () => ({
  type: UserActionTypes.REMOVE_USER,
  payload: null,
});

export const updateUser = (payload: Partial<UserDTO>) => ({
  type: UserActionTypes.UPDATE_USER,
  payload,
});
