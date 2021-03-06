export interface HttpClientConfig {
  baseURL: string;
}

export class HttpClient {
  constructor(private config: HttpClientConfig) {}

  public get(url: string) {
    return this.createFetch('GET', url);
  }

  public post(url: string, body: any) {
    return this.createFetch('POST', url, body);
  }

  public put(url: string, body: any) {
    return this.createFetch('PUT', url, body);
  }

  public patch(url: string, body: any) {
    return this.createFetch('PATCH', url, body);
  }

  public delete(url: string) {
    return this.createFetch('DELETE', url);
  }

  private async createFetch(method: string, url: string, body?: any) {
    const requestOptions: RequestInit = {
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      method: method,
      credentials: 'include'
    };
    if (body) {
      requestOptions.body = JSON.stringify(body);
    }
    const response = await fetch(this.config.baseURL + url, requestOptions);
    if (response.ok) {
      return response;
    } else {
      let message = await response.text();
      try {
        message = JSON.parse(message).message;
      } catch (e) {}
      message = message || response.statusText;
      return Promise.reject({ message, statusCode: response.status });
    }
  }
}
