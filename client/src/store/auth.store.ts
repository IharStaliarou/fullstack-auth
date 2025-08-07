import authService from '@/services/auth.service';
import { httpService } from '@/services/http.services';
import {
  IAccessDecodedToken,
  ILogin,
  ISignUp,
} from '@/shared/interfaces/auth.interfaces';
import { handleHttpError } from '@/shared/utils/errors/handle-http-error';
import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';

interface IUseAuthStore {
  isAuth: boolean;
  authUser: IAccessDecodedToken;
  isLoading: boolean;
  error: null | unknown;
  logIn: (loginData: ILogin) => void;
  signUp: (signUpData: ISignUp) => void;
}

const useAuthStore = create<IUseAuthStore>((set) => ({
  isAuth: false,
  authUser: null,
  isLoading: false,
  error: null,

  logIn: (loginData: ILogin) => {
    set({ isLoading: true, error: null });
    authService
      .logIn(loginData)
      .then((data) => {
        const accessToken: string = data.accessToken;
        if (!accessToken) {
          throw new Error('Access token not found');
        }
        set({ isAuth: true });

        localStorage.setItem('accessToken', accessToken);

        const decodedToken: IAccessDecodedToken = jwtDecode(accessToken);
        delete decodedToken.exp;
        delete decodedToken.iat;
        set({ authUser: decodedToken });
      })
      .catch((error: unknown) => {
        handleHttpError(error, 'Log in error');
        set({ error });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },

  signUp: (signUpData: ISignUp) => {
    set({ isLoading: true, error: null });
    authService
      .signUp(signUpData)
      .then((data) => {
        console.log(data);
      })
      .catch((error: unknown) => {
        handleHttpError(error, 'Sign up error');
        set({ error });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
}));

export default useAuthStore;
