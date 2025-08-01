export type LoginTypes = { username: string; password: string };

export type SignUpTypes = {
  username: string;
  password: string;
  passwordRepeat: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type EntranceTypes = 'login' | 'signup';
