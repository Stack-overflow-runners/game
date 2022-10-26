import React, { useEffect, useContext, createContext } from 'react';
import { useAppDispatch, useAppSelector } from './store';
import { SignInDTO, SignUpDTO } from '../types/auth';
import {
  fetchUser,
  signIn as login,
  signOut as logout,
  signUp as register,
} from '../store/action-creators/auth';
import { UserDTO } from '../types/user';
import { Nullable } from '../types/common';

type Props = {
  children: React.ReactNode;
};

type AuthContextProps = {
  user: Nullable<UserDTO>;
  signUp: (credentials: SignUpDTO) => any;
  signIn: (credentials: SignInDTO) => any;
  signOut: () => any;
  error: string | null;
  isLoading: boolean;
  isLoggedIn: boolean;
};

const authContext = createContext<AuthContextProps>({} as AuthContextProps);
export const useAuth = () => useContext(authContext);

function useAuthProvider() {
  const dispatch = useAppDispatch();

  const { user, error, isLoading, isLoggedIn } = useAppSelector(
    state => state.user
  );

  const signUp = (credentials: SignUpDTO): void => {
    dispatch(register(credentials));
  };

  const signIn = (credentials: SignInDTO): void => {
    dispatch(login(credentials));
  };

  const signOut = (): void => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    }
  }, []);

  return {
    user,
    signUp,
    signIn,
    signOut,
    error,
    isLoading,
    isLoggedIn,
  };
}

export function AuthProvider({ children }: Props) {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
