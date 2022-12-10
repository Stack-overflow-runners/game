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

export type OAuthSignInYandexDTO = {
  code: string;
  redirect_uri: string;
};

export type OAuthServiceIdDTO = {
  service_id: string;
};

export type OAuthProvider = {
  name: string;
  serviceUrl: string;
  redirectURI?: string;
  signInURI?: string;
  getServiceIdURI?: string;
};
