export interface BunactylClientOptions {
  url: string | undefined;
  apiKey: string | undefined;
  userAgent?: string;
}

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

export class BunactylClient {
  private baseUrl: string | undefined;
  private headers: Record<string, string>;
  
  constructor(options: BunactylClientOptions) {
    this.baseUrl = options.url?.endsWith('/') ? options.url.slice(0, -1) : options.url;
    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${options.apiKey}`,
      'User-Agent': `${options.userAgent}`
    };
  }

  private buildUrl(path: string, params?: Record<string, string | number | boolean>): string {
    const url = new URL(`${this.baseUrl}/api/application${path}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    
    return url.toString();
  }

  private async request<T>(path: string, method: string, options: RequestOptions = {}): Promise<T> {
    const { params, body, ...rest } = options;
    
    const response = await fetch(this.buildUrl(path, params), {
      method,
      headers: this.headers,
      body: body ? JSON.stringify(body) : undefined,
      ...rest
    });

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${await response.text()}`);
    }
    
    // For 204 No Content responses
    if (response.status === 204) {
      return {} as T;
    }
    
    return response.json() as Promise<T>;
  }

  async get<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, 'GET', options);
  }

  async post<T>(path: string, data?: any, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, 'POST', { ...options, body: data });
  }

  async patch<T>(path: string, data?: any, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, 'PATCH', { ...options, body: data });
  }

  async delete<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, 'DELETE', options);
  }
}
