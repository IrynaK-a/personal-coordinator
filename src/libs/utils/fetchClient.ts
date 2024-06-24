import axios, { AxiosRequestConfig } from 'axios';
import { BASE_API_URL } from '../constants';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';
type Token = string | undefined | null;

const axiosInstance = axios.create({
  baseURL: `${BASE_API_URL}`,
});

export async function request<T>(
  url: string,
  method: RequestMethod,
  payload: BodyInit | null = null,
  token?: Token,
): Promise<T> {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const config: AxiosRequestConfig = {
    url,
    method,
    data: payload,
    headers,
  };

  const { data } = await axiosInstance(config);

  return data;
}

export const client = {
  get: <T>(url: string, token?: Token) => request<T>(url, 'GET', null, token),
  post: <T>(url: string, payload: any, token: Token) =>
    request<T>(url, 'POST', payload, token),
  patch: <T>(url: string, payload: any, token: Token) =>
    request<T>(url, 'PATCH', payload, token),
  delete: <T>(url: string, token: Token) =>
    request<T>(url, 'DELETE', null, token),
};
