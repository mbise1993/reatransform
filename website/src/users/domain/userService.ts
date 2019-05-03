import { Rest } from '../../shared/services';
import Cookies from 'js-cookie';

import { User } from './userModel';

const loginUrl = '/auth/login';
const registerUrl = '/auth/register';

export default class UserService {
  static async login(username: string, password: string) {
    const response = await Rest.post(loginUrl, {
      contentType: 'application/x-www-form-urlencoded',
      params: `username=${username}&password=${password}`,
    });

    console.log(`login response: ${JSON.stringify(response)}`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return (await response.json()) as User;
  }

  static async register(username: string, password: string) {
    const response = await Rest.post(registerUrl, {
      contentType: 'application/x-www-form-urlencoded',
      params: `username=${username}&password=${password}`,
    });

    console.log(`register response: ${JSON.stringify(response)}`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return (await response.json()) as User;
  }

  static isLoggedIn() {
    return Cookies.get('user-auth') !== undefined;
  }
}
