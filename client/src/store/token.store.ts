import { httpService } from '@/services/http.services';
import { handleHttpError } from '@/shared/utils/errors/handle-http-error';
import { AxiosError } from 'axios';
import { create } from 'zustand';

interface ITokenStoreProps {
  isLoading: boolean;
  error: null | unknown;
  refreshTokens: (error: AxiosError) => void;
}

const useTokenStore = create<ITokenStoreProps>((set) => ({
  isLoading: false,
  error: null,

  refreshTokens: async (error: AxiosError) => {
    set({ isLoading: true, error: null });

    try {
      const { data } = await httpService.get('/token/refresh-tokens');

      const accessToken: string = data.accessToken;

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      localStorage.setItem('accessToken', accessToken);

      error.config.headers.Authorization = `Bearer ${accessToken}`;
      return await httpService.request(error.config);
    } catch (err) {
      handleHttpError(err, 'Log in error');
      localStorage.removeItem('accessToken');
      set({ error: err });
      // TODO: add redirect
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useTokenStore;
