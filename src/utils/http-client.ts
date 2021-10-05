class HttpError extends Error {
  constructor(readonly response: any) {
    super(response.message || 'Http Error.');
  }
}

export class HttpClient {
  private accessToken: string | null = null;
  constructor(readonly baseUri: string) {}

  public request<T = unknown>(method: string, url: string, init?: RequestInit) {
    if (!/^(http|https)/.test(url)) {
      url = `${this.baseUri}/${url}`;
    }

    const config: RequestInit = {
      method,
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      ...init,
    };

    if (this.accessToken) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${this.accessToken}`,
      };
    }

    return fetch(url, config).then(async response => {
      const body = await response.json();
      if (response.ok) {
        return body as Promise<T>;
      }
      throw new HttpError(body);
    });
  }

  public get<T = unknown>(url: string, init?: RequestInit) {
    return this.request<T>('get', url, init);
  }

  public post<T = unknown>(
    url: string,
    body: Record<string, any>,
    init?: RequestInit,
  ) {
    return this.request<T>('post', url, {
      body: JSON.stringify(body),
      ...init,
    });
  }

  public delete<T = unknown>(url: string, init?: RequestInit) {
    return this.request<T>('delete', url, init);
  }

  public setAccessToken(accessToken: string | null) {
    this.accessToken = accessToken;
  }
}

export const httpClient = new HttpClient(
  process.env.REACT_APP_API_BASE as string,
);
