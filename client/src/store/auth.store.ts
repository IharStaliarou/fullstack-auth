import authService from '@/services/auth.service';
import {
  IAccessDecodedToken,
  ILogin,
  ISignUp,
} from '@/shared/interfaces/auth.interfaces';
import { handleHttpError } from '@/shared/utils/errors/handle-http-error';
import { validateAndDecodeToken } from '@/shared/utils/token/validateAndDecodeToken.utils';
import { create } from 'zustand';

interface IUseAuthStore {
  isAuth: boolean;
  authUser: IAccessDecodedToken;
  isLoading: boolean;
  error: null | unknown;
  login: (loginData: ILogin) => Promise<string | void>;
  signup: (signUpData: ISignUp) => Promise<string | void>;
  logout: () => void;
}

const useAuthStore = create<IUseAuthStore>((set) => ({
  isAuth: false,
  authUser: null,
  isLoading: false,
  error: null,

  login: (loginData: ILogin) => {
    set({ isLoading: true, error: null });

    return authService
      .login(loginData)
      .then((data) => {
        const accessToken: string = data.accessToken;
        if (!accessToken) {
          throw new Error('Access token not found');
        }
        set({ isAuth: true });

        localStorage.setItem('accessToken', accessToken);

        const decodedToken = validateAndDecodeToken(accessToken);

        if (!decodedToken) {
          throw new Error('Access token not found');
        }

        set({ authUser: decodedToken });
        return accessToken;
      })
      .catch((error: unknown) => {
        handleHttpError(error, 'Log in error');
        set({ error });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },

  signup: (signUpData: ISignUp) => {
    set({ isLoading: true, error: null });
    return authService
      .signup(signUpData)
      .then(() => {
        return useAuthStore.getState().login({
          userName: signUpData.userName,
          password: signUpData.password,
        });
      })
      .catch((error: unknown) => {
        handleHttpError(error, 'Sign up error');
        set({ error });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },

  logout: () => {
    set({ isAuth: false, authUser: null });
    authService
      .logout()
      .then(() => {
        localStorage.removeItem('accessToken');
        set({ isAuth: false });
      })
      .catch((error: unknown) => {
        handleHttpError(error, 'Something went wrong. Please try again.');
        set({ error });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
}));

export default useAuthStore;
