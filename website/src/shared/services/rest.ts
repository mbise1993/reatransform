export interface IRequestOptions {
  contentType: string;
  token?: string;
  params?: string;
}

const createHeaders = (options: IRequestOptions) => {
  const headers = new Headers();
  headers.set('Content-Type', options.contentType);
  if (options.token) {
    headers.set('Authorization', `Bearer ${options.token}`);
  }

  return headers;
};

export default class Rest {
  static async get(url: string, options: IRequestOptions) {
    url = options.params ? `${url}?${options.params}` : url;
    return await fetch(url, {
      method: 'GET',
      headers: createHeaders(options),
    });
  }

  static async post(url: string, options: IRequestOptions) {
    return await fetch(url, {
      method: 'POST',
      body: options.params || '',
      headers: createHeaders(options),
    });
  }
}
