import axios from 'axios';
import envConfig from '~/config/env.config';
import { responseErrorInterceptor, responseInterceptor } from '~/lib/axios/interceptors';

const api = axios.create({
  baseURL: envConfig.NEXT_PUBLIC_API_BASE_URL
});

api.interceptors.response.use(responseInterceptor, responseErrorInterceptor);

export default api;
