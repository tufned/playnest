import { AxiosError, AxiosResponse } from 'axios';

export const responseInterceptor = (response: AxiosResponse) => {
  return response.data;
};

export const responseErrorInterceptor = (error: AxiosError) => {
  return error?.response?.data ? error.response.data : error;
};
