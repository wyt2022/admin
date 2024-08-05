import axios from 'axios';
import { ElMessage } from 'element-plus';
import { getMessageInfo } from './status';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

export type BaseResponse<T> = {
  code: number;
  data: T;
  message: string;
  status?: string;
};

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_USE_MOCK ? import.meta.env.VITE_APP_MOCK_BASEURL : import.meta.env.VITE_APP_BASEURL,
  timeout: 15000
});

// axios实例拦截请求
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// axios实例拦截响应
service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      return response.data;
    }
    ElMessage({
      message: getMessageInfo(response.status),
      type: 'error',
      duration: 3000
    });
    return Promise.reject(response);
  },
  (error: AxiosError) => {
    const { response } = error;
    if (response) {
      ElMessage({
        message: getMessageInfo(response.status),
        type: 'error',
        duration: 3000
      });
      return Promise.reject(response.data);
    }
    ElMessage({
      message: '网络异常',
      type: 'error',
      duration: 3000
    });
  }
);
const requestInstance = <T = any>(config: AxiosRequestConfig): Promise<T> => {
  const conf = config;
  return new Promise((resolve, reject) => {
    service.request<any, BaseResponse<T>>(conf).then((res: BaseResponse<T>) => {
      const { data, code, message } = res;
      // 如果data.code为错误代码返回message信息
      if (code != 200) {
        ElMessage({
          message: message,
          type: 'error'
        });
        reject(message);
      } else {
        // 此处返回data信息 也就是 api 中配置好的 Response类型
        resolve(data as T);
      }
    });
  });
};

export function get<T = any, U = any>(config: AxiosRequestConfig, url: string, params?: U): Promise<T> {
  return requestInstance({ ...config, url, method: 'GET', params });
}

export function post<T = any, U = any>(config: AxiosRequestConfig, url: string, data?: U): Promise<T> {
  return requestInstance({ ...config, url, method: 'POST', data });
}
export function put<T = any, U = any>(config: AxiosRequestConfig, url: string, data?: U): Promise<T> {
  return requestInstance({ ...config, url, method: 'PUT', data });
}

export function del<T = any, U = any>(config: AxiosRequestConfig, url: string, params?: U): Promise<T> {
  return requestInstance({ ...config, url, method: 'DELETE', params });
}

export default service;
