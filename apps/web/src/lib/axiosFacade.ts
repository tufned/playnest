import axios from 'axios';
import envConfig from '~/config/env.config';

const api = axios.create({
  baseURL: envConfig.NEXT_PUBLIC_API_BASE_URL
});

export default api;
