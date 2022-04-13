import router from '@/router';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { getToken } from './auth.service';

type ArrayElementType<T> = T extends (infer E)[] ? E : T;

export class HttpRequest {
  private axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  });

  constructor() {
    this.axiosInstance.interceptors.request.use(
      config => {
        const token = getToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    // Catch HTTP errors globally
    this.axiosInstance.interceptors.response.use(
      response => {
        if (response.status === 200 || response.status === 201) {
          return Promise.resolve(response);
        } else {
          return Promise.reject(response);
        }
      },
      error => {
        if (!error.response) {
          return Promise.reject(error.message);
        } else if (error.response.status) {
          switch (error.response.status) {
            case 401:
              if (router.currentRoute.name !== 'Login') {
                router.replace({
                  name: 'Login',
                  query: { redirect: router.currentRoute.fullPath }
                  // eslint-disable-next-line @typescript-eslint/no-empty-function
                }).catch(() => { });
              }
              break;
          }
          return Promise.reject(error.response.data);
        }
      }
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async get<T>(cls: ClassConstructor<ArrayElementType<T>> | undefined, url: string, config?: AxiosRequestConfig<never> | undefined) {
    const req = await this.axiosInstance.get(url, config);
    return (cls) ? plainToClass(cls, req.data) as unknown as T : req.data;
  }

  public getRaw(url: string) {
    return this.axiosInstance.get(url, { responseType: 'arraybuffer' });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async post<T>(cls: ClassConstructor<ArrayElementType<T>> | undefined, url: string, data?: any, config?: AxiosRequestConfig<never> | undefined): Promise<T> {
    const req = await this.axiosInstance.post(url, data, config);
    return (cls) ? plainToClass(cls, req.data) as unknown as T : req.data;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async put<T>(cls: ClassConstructor<ArrayElementType<T>>, url: string, data?: any, config?: AxiosRequestConfig<never> | undefined): Promise<T> {
    const req = await this.axiosInstance.put(url, data, config);
    return plainToClass(cls, req.data) as unknown as T;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async delete<T>(cls: ClassConstructor<ArrayElementType<T>>, url: string, config?: AxiosRequestConfig<never> | undefined) {
    await this.axiosInstance.delete(url, config);
  }

  public async postFile(url: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const req = await this.axiosInstance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return req.data as unknown as { fileUrl: string };
  }
}

export const httpRequestInstance = new HttpRequest();