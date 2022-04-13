const axios = require('axios');
const { getToken } = require('./auth.service');
class HttpRequest {
  axiosInstance = axios.create({
    baseURL: process.env.API_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  constructor() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = getToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    // Catch HTTP errors globally
    this.axiosInstance.interceptors.response.use(
      (response) => {
        if (response.status === 200 || response.status === 201) {
          return Promise.resolve(response);
        } else {
          return Promise.reject(response);
        }
      },
      (error) => {
        if (!error.response) {
          return Promise.reject(error.message);
        } else if (error.response.status) {
          return Promise.reject(error.response.data);
        }
      }
    );
  }

  async get(url, config = undefined) {
    const req = await this.axiosInstance.get(url, config);
    return req.data;
  }

  async post(url, data, config = undefined) {
    const req = await this.axiosInstance.post(url, data, config);
    return req.data;
  }

  async put(url, data, config = undefined) {
    const req = await this.axiosInstance.put(url, data, config);
    return req.data;
  }

  async delete(url, config = undefined) {
    await this.axiosInstance.delete(url, config);
  }

  async postFile(url, file) {
    const formData = new FormData();
    formData.append('file', file);
    const req = await this.axiosInstance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return req.data;
  }
}

exports.RequestInstance = new HttpRequest();
