import { $host } from './service';

export class AuthService {
  static async auth(data) {
    const response = await $host.post(`/auth/login`, data);
    return response.data;
  }
  static async register(data) {
    const response = await $host.post(`/auth/register`, data);
    return response.data;
  }
}
