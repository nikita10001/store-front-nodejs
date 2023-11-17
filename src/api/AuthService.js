import { click } from '@testing-library/user-event/dist/click';
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
    console.log('After registration');
    console.log(jwtDecode(data.token));
    return jwtDecode(data.token);
  }
  static async check() {
    const { data } = await $host.get(`/auth/check`);
    localStorage.setItem('token', data.token);
    return jwtDecode(data.token);
  }

  static async checkEmail(token, userId) {
    if (jwtDecode(token).login == userId) {
      const { data } = await $host.post('/auth/verify', { token });
      localStorage.setItem('token', data.token);
      return jwtDecode(data.token);
    }
    return null;
  }
}
