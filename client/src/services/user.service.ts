import { IUser } from '@/shared/interfaces/auth.interfaces';
import { httpService } from './http.services';

const USER_ENDPOINT = '/user';

const userService = {
  create: async (user: Partial<IUser>): Promise<IUser> => {
    const { data } = await httpService.post(USER_ENDPOINT, user);
    return data;
  },
  findAll: async (): Promise<IUser[]> => {
    const { data } = await httpService.get(`${USER_ENDPOINT}/find-all`);
    return data;
  },
  findById: async (id: string): Promise<IUser> => {
    const { data } = await httpService.get(`${USER_ENDPOINT}/find-by-id/${id}`);
    return data;
  },
  findByUsername: async (userName: string): Promise<IUser> => {
    const { data } = await httpService.get(
      `${USER_ENDPOINT}/find-by-username/${userName}`
    );
    return data;
  },
  findByEmail: async (email: string): Promise<IUser> => {
    const { data } = await httpService.get(
      `${USER_ENDPOINT}/find-by-email/${email}`
    );
    return data;
  },
  findByPhone: async (phone: string): Promise<IUser> => {
    const { data } = await httpService.get(
      `${USER_ENDPOINT}/find-by-phone/${phone}`
    );
    return data;
  },
  update: async (id: string, user: Partial<IUser>): Promise<IUser> => {
    const { data } = await httpService.patch(`${USER_ENDPOINT}${id}`, user);
    return data;
  },
  remove: async (id: string): Promise<void> => {
    await httpService.delete(`${USER_ENDPOINT}${id}`);
  },
};

export default userService;
