export interface ILogin {
  username: string;
  password: string;
}

export interface ISignUp extends ILogin {
  repeatPassword: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export type EntranceTypes = 'login' | 'signup';
