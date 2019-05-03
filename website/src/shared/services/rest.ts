//const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://www.reatransform.com/' : 'localhost:3000/';
const BASE_URL = '';

export type RequestOptions = {
  contentType: string;
  token?: string;
  params?: string;
};

export default class Rest {
  static async get(url: string, options: RequestOptions) {
    url = options.params ? `${BASE_URL}${url}?${options.params}` : `${BASE_URL}${url}`;
    return await fetch(url, {
      method: 'GET',
      headers: Rest.createHeaders(options),
    });
  }

  static async post(url: string, options: RequestOptions) {
    return await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      body: options.params || '',
      headers: Rest.createHeaders(options),
    });
  }

  static async put(url: string, options: RequestOptions) {
    return await fetch(`${BASE_URL}${url}`, {
      method: 'PUT',
      body: options.params || '',
      headers: Rest.createHeaders(options),
    });
  }

  static async delete(url: string, options: RequestOptions) {
    return await fetch(`${BASE_URL}${url}`, {
      method: 'DELETE',
      body: options.params || '',
      headers: Rest.createHeaders(options),
    });
  }

  private static createHeaders(options: RequestOptions) {
    const headers = new Headers();
    headers.set('Content-Type', options.contentType);
    if (options.token) {
      headers.set('Authorization', `Bearer ${options.token}`);
    }

    return headers;
  }
}
