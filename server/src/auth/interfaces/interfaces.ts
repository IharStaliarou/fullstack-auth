import { Role } from '@user/interfaces/interfaces';

export interface IAccessToken {
  userId: string;
  username: string;
  email: string;
  role: Role[];
}

export interface IJwtPayload extends IAccessToken {}
