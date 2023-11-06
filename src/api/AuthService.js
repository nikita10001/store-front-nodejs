import { $host } from './service';

export class AuthService {
  static async auth(data) {
    const response = await $host.post(`/auth`, data);
    return response.data;
  }
}
