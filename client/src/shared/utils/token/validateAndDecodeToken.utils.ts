import { IAccessDecodedToken } from '@/shared/interfaces/auth.interfaces';
import dayjs from 'dayjs';
import { jwtDecode } from 'jwt-decode';

export const validateAndDecodeToken = (
  accessToken: string
): IAccessDecodedToken => {
  if (!accessToken) {
    return;
  }
  const decodedToken: IAccessDecodedToken = jwtDecode(accessToken);

  const today = dayjs();
  const expirationDate = dayjs(decodedToken.exp);
  const isExpired = expirationDate.isBefore(today);

  if (!isExpired) {
    return;
  }

  delete decodedToken.exp;
  delete decodedToken.iat;

  return decodedToken;
};
