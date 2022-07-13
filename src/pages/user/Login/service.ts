import { request } from 'umi';

export async function login(data: { [key: string]: any }) {
  return request('/login', {
    data,
    method: 'POST',
  })
}