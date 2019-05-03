import { Rest } from '../../shared/services';
import Cookies from 'js-cookie';

const USER_TOKEN_ID = 'user-token';

type UserResponse = {
  token: string;
  id: string;
  username: string;
};

type ErrorResponse = {
  error: string;
};

export default class UserService {
  static async login(username: string, password: string) {
    const response = await Rest.post('/auth/login', {
      contentType: 'application/x-www-form-urlencoded',
      params: `username=${username}&password=${password}`,
    });

    return await UserService.handleResponse(response);
  }

  static async register(username: string, password: string) {
    const response = await Rest.post('/auth/register', {
      contentType: 'application/x-www-form-urlencoded',
      params: `username=${username}&password=${password}`,
    });

    return await UserService.handleResponse(response);
  }

  static isLoggedIn() {
    return Cookies.get(USER_TOKEN_ID) !== undefined;
  }

  private static async handleResponse(response: Response) {
    if (!response.ok) {
      const errorResponse = (await response.json()) as ErrorResponse;
      throw new Error(errorResponse.error);
    }

    const userResponse = (await response.json()) as UserResponse;
    Cookies.set(USER_TOKEN_ID, userResponse.token);

    return {
      id: userResponse.id,
      username: userResponse.username,
    };
  }
}
