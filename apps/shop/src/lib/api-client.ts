import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import envConfig from "~/config/env.config";
import { ResponseDTO } from "@playnest/core/types/response.types";

type AsyncResponse<T extends object> = Promise<ResponseDTO<T>>;

class ApiClient {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: envConfig.NEXT_PUBLIC_API_BASE_URL,
      withCredentials: true
    });
    this.axiosInstance.interceptors.response.use(
      this.responseInterceptor,
      this.responseErrorInterceptor
    );
  }

  responseInterceptor(response: AxiosResponse) {
    return response.data;
  }

  responseErrorInterceptor(error: AxiosError) {
    return error?.response?.data ? error.response.data : error;
  }

  get<T extends object>(url: string, config = {}): AsyncResponse<T> {
    return this.axiosInstance.get(url, config);
  }

  post<T extends object>(url: string, data?: unknown, config = {}): AsyncResponse<T> {
    return this.axiosInstance.post(url, data, config);
  }

  put<T extends object>(url: string, data?: unknown, config = {}): AsyncResponse<T> {
    return this.axiosInstance.put(url, data, config);
  }

  delete(url: string, config = {}): AsyncResponse<Record<string, unknown>> {
    return this.axiosInstance.delete(url, config);
  }
}

export default ApiClient;
