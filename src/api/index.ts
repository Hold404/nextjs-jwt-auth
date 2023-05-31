import axios from 'axios';
import { parseCookies } from 'nookies';
import { config } from 'process';

export const publicApi = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  withCredentials: true,
});

export const privateApi = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  withCredentials: true,
});

privateApi.interceptors.request.use((config) => {
  const accessToken = parseCookies().accessToken;
  config.headers['Authorization'] = `Bearer ${accessToken}`;

  return config;
});

privateApi.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status == 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;

      try {
        const refreshToken = parseCookies().refreshToken;

        await publicApi.post('/user/refresh', { refreshToken });

        return privateApi.request(originalRequest);
      } catch (error) {
        throw error;
      }
    }

    throw error;
  }
);
