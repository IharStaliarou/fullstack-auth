import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import config from '@config/config.json';
import useTokenStore from '@/store/token.store';
import useAuthStore from '@/store/auth.store';
import { validateAndDecodeToken } from '@/shared/utils/token/validateAndDecodeToken.utils';

export const httpService = axios.create({
  baseURL: config.baseURL,
  params: {},
  withCredentials: true,
});

httpService.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const accessToken = localStorage.getItem('accessToken');

    config.headers.Authorization = accessToken ? `Bearer ${accessToken}` : '';

    return config;
  }
);

httpService.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const { refreshTokens } = useTokenStore.getState();
    const accessToken = localStorage.getItem('accessToken');
    if (error.response?.status === 401) {
      if (!accessToken) {
        Promise.reject(error);
      }

      const decodedToken = validateAndDecodeToken(accessToken);

      if (!decodedToken) {
        return Promise.reject();
      }

      useAuthStore.setState({ isAuth: true, authUser: decodedToken });

      return refreshTokens(error);
    }

    return Promise.reject(error);
  }
);

httpService
  .get('user/find-by-username/Ihar1')
  .then((res) => {
    console.log('res data', res.data);
  })
  .catch((err) => {
    console.log('err', err);
  });
