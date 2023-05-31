import { ApiUser } from '@/types/user.types';
import { privateApi, publicApi } from '..';

export const UserService = {
  async login(login: string, password: string) {
    return await publicApi.post<ApiUser>('/user/login', {
      login,
      password,
    });
  },

  async register(login: string, email: string, password: string) {
    return await publicApi.post<ApiUser>('/user/register', {
      login,
      email,
      password,
    });
  },

  async get() {
    return await privateApi.get<ApiUser>('/user/get');
  },
};
