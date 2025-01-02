import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import envConfig from '~/config/env.config';
import { AccessToken } from '~/types';
import authService from '~/services/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: envConfig.NEXT_PUBLIC_API_BASE_URL }),
  endpoints: (builder) => ({
    getAccessToken: builder.query<AccessToken, void>({
      queryFn: async () => {
        const response = await authService.refreshAccessToken();
        if (!response.success) return { data: null };
        return { data: response.data!.accessToken };
      }
    })
  })
});

export const setAccessToken = (token: AccessToken) => {
  return authApi.util.upsertQueryData('getAccessToken', undefined, token);
};

export const { useGetAccessTokenQuery } = authApi;
