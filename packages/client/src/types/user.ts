export type UserEntity = {
  userId: number;
  forumId: number;
  email: string;
  phone: string;
  avatar: string;
  name: string;
  lastname: string;
  login: string;
  displayName: string;
  updatedAt: string;
  createdAt: string;
};

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

export type RequestUserAvatarData = FormData;

export type RequestUserPasswordData = {
  oldPassword: string;
  newPassword: string;
};

export type RequestUserData = {
  login: string;
  email: string;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
};
