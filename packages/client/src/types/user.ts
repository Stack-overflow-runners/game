export type UserDTO = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
  forumId?: number;
};

export type RequestUserAvatarData = {
  avatar: FormData;
};

export type RequestUserPasswordData = {
  oldPassword: string;
  newPassword: string;
};

export type RequestUserData = {
  login: string;
  email: string;
  first_name: string;
  second_name: string;
  display_name?: string;
  phone: string | number;
  avatar: string;
};
