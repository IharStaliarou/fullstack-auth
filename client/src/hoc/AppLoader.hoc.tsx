import { validateAndDecodeToken } from '@/shared/utils/token/validateAndDecodeToken.utils';
import useAuthStore from '@/store/auth.store';
import React, { useEffect } from 'react';

interface IAppLoaderProps {
  children: React.ReactNode;
}

export const AppLoader = ({ children }: IAppLoaderProps) => {
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!accessToken) {
      return;
    }
    const decodedToken = validateAndDecodeToken(accessToken);

    if (!decodedToken) {
      return;
    }

    useAuthStore.setState({ isAuth: true, authUser: decodedToken });
  }, [accessToken]);

  return <>{children}</>;
};
