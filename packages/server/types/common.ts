export type Nullable<T> = T | null;

export type UserDTO = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
};

export type UserEntity = {
  userId: number;
  forumId: Nullable<number>;
  email: string;
  phone: Nullable<string>;
  avatar: Nullable<string>;
  name: Nullable<string>;
  lastname: Nullable<string>;
  displayName: Nullable<string>;
  login: string;
  updatedAt: string;
  createdAt: string;
};

declare module 'express-serve-static-core' {
  interface Request {
    user: Partial<UserEntity>;
  }
}
