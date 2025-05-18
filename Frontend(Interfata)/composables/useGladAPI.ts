import type {responseType} from '../types/generic.types';

interface RequestInit {
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit | null;
  mode?: RequestMode;
  credentials?: RequestCredentials;
  cache?: RequestCache;
  redirect?: RequestRedirect;
  referrer?: string;
  referrerPolicy?: ReferrerPolicy;
  integrity?: string;
  keepalive?: boolean;
  signal?: AbortSignal | null;
  window?: any; // Used for browser context
}
export const useGladAPI = () => {
  const baseURL = 'http://localhost:3000/api/';

  type ResponseAPI<T> = responseType & (T extends responseType ? Partial<T> : T);

  const request = async <T,B>(endpoint: string, method: string, body?: B, otherOptions?: RequestInit): Promise<ResponseAPI<T>> => {
    try {
      const response = await fetch(baseURL + endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
        ...otherOptions
      });

      const data: ResponseAPI<T> = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  const get = async <T, B>(endpoint: string, body?: B, otherOptions?: RequestInit): Promise<ResponseAPI<T>> => { return await request(endpoint, 'GET', body, otherOptions); };
  const post = async <T, B>(endpoint: string, body?: B, otherOptions?: RequestInit): Promise<ResponseAPI<T>> => { return await request(endpoint, 'POST', body, otherOptions); };
  const put = async <T, B>(endpoint: string, body?: B, otherOptions?: RequestInit): Promise<ResponseAPI<T>> => { return await request(endpoint, 'PUT', body, otherOptions); };
  const del = async <T, B>(endpoint: string, body?: B, otherOptions?: RequestInit): Promise<ResponseAPI<T>> => { return await request(endpoint, 'DELETE', body, otherOptions); };

  return {
    get,
    post,
    put,
    del
  }

}