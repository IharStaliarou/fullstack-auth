export interface ILogin {
  userName: string;
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

export interface IAccessDecodedToken {
  userId: string;
  userName: string;
  email: string;
  role: Role[];
  exp: number;
  iat: number;
}

enum Role {
  ADMIN,
  USER,
}

export interface IUser {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: Role[];
  createdAt: Date;
  updatedAt: Date;
}
