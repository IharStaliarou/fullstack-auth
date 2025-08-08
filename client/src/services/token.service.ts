import { httpService } from './http.services';

interface IRefreshTokensResponse {
  accessToken: string;
}

const TOKEN_ENDPOINT = '/token/';

const tokenService = {
  refreshTokens: async (): Promise<IRefreshTokensResponse> => {
    const { data } = await httpService.get(`${TOKEN_ENDPOINT}refresh-tokens`);
    return data;
  },
};

export default tokenService;
