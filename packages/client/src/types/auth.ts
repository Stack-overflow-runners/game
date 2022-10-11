export type SignInDTO = {
  login: string;
  password: string;
  remember: boolean;
};

export type SignUpDTO = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};
