import { httpService } from '@/services/http.services';
import tokenService from '@/services/token.service';
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
      const data = await tokenService.refreshTokens();

      const accessToken: string = data.accessToken;

      if (!accessToken) {
        throw new Error('Access token not found');
      }

      localStorage.setItem('accessToken', accessToken);

      error.config.headers.Authorization = `Bearer ${accessToken}`;
      return await httpService.request(error.config);
    } catch (error: unknown) {
      handleHttpError(error, 'Log in error');
      localStorage.removeItem('accessToken');
      set({ error });
      // TODO: add redirect
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useTokenStore;
