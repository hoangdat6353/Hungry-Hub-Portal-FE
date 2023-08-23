/* eslint-disable @typescript-eslint/no-explicit-any */
import { ApiError } from '@app/api/ApiError';
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { deleteToken, readToken } from './localStorage.service';
import { HttpStatusCode } from '@app/constants/httpStatusCode';
import { AuthEnum } from '@app/constants/enums/auth';

export interface ApiErrorData {
  message: string;
}

export class HttpService {
  private client: AxiosInstance;

  constructor(baseURL?: string) {
    this.client = axios.create({
      baseURL: baseURL || process.env.REACT_APP_BASE_URL,
    });

    const token = readToken();

    if (token) {
      this.client.interceptors.request.use((config) => {
        config.headers = { ...config.headers, Authorization: `Bearer ${token}` };

        return config;
      });
    }
    this.client.interceptors.response.use(undefined, (error: AxiosError) => {
      if (
        !error.request.responseURL.includes(AuthEnum.AUTHURL) &&
        error.response?.status === HttpStatusCode.Unauthorized
      ) {
        deleteToken();
        window.location.reload();
      }

      throw new ApiError<ApiErrorData>(error.response?.data.message || error.message, error.response?.data);
    });
  }

  post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.client.post(url, data, config);
  }

  get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.client.get(url, config);
  }

  put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.client.put(url, data, config);
  }

  delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.client.delete(url, config);
  }

  patch<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.client.patch(url, data, config);
  }
}
