import { ILogin, IUser } from '@/shared/interfaces/auth.interfaces';
import { httpService } from './http.services';

interface ILoginResponseProps {
  accessToken: string;
}

const AUTH_ENDPOINT = '/auth/';

const authService = {
  login: async (loginData: ILogin): Promise<ILoginResponseProps> => {
    const { data } = await httpService.post(`${AUTH_ENDPOINT}login`, loginData);
    return data;
  },
  signup: async (signUpData: ILogin): Promise<IUser> => {
    const { data } = await httpService.post(
      `${AUTH_ENDPOINT}signup`,
      signUpData
    );
    return data;
  },

  logout: async () => {
    await httpService.get(`${AUTH_ENDPOINT}logout`);
  },
};

export default authService;
