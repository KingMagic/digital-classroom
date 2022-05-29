import { request } from 'umi';
import type { SchoolItem } from './data';

export async function getSchoolList(): Promise<{ data: SchoolItem[] }> {
  return request('/api/School')
}

export async function addSchool(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request('/api/School', {
    data,
    method: 'POST',
    ...(options || {}),
  })
}

export async function alterSchool(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request('/api/School/'+data.id, {
    data,
    method: 'PUT',
    ...(options || {}),
  })
}

export async function deleteSchool(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request('/api/School/'+data.id, {
    data,
    method: 'DELETE',
    ...(options || {}),
  })
}