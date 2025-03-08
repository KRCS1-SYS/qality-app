import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const createAuthenticatedAxiosInstance = (config: AxiosRequestConfig, token?: string): AxiosInstance => {
  const instance = axios.create({
    headers: {
      "Content-Type": "application/json",
    },
    maxBodyLength: Infinity, 
    ...config,      
  });

  // Attach token if provided
  instance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return instance;
};

export { createAuthenticatedAxiosInstance };