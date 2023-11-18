import { $host } from './service';
import { jwtDecode } from 'jwt-decode';

export class AuthService {
  static async login(authData) {
    const { data } = await $host.post(`/auth/login`, authData);
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
  }
  static async registration(authData) {
    const { data } = await $host.post(`/auth/registration`, authData);
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
  }
  static async check() {
    const { data } = await $host.get(`/auth/check`);
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
  }

  static async checkEmail(login, confirmationCode) {
    const { data } = await $host.post(`/auth/verify`, { login, confirmationCode });
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
  }
}
