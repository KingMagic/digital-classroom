import { request } from 'umi';
import { SchoolItem } from './data';

export async function getSchoolList(): Promise<{ data: SchoolItem[] }> {
  return request('/api/getSchoolList');
}

export async function addSchool(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request('/api/addSchool', {
    data,
    method: 'POST',
    ...(options || {}),
  })
}

export async function alterSchool(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request('/api/alterSchool', {
    data,
    method: 'POST',
    ...(options || {}),
  })
}

export async function deleteSchool(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request('/api/deleteSchool', {
    data,
    method: 'POST',
    ...(options || {}),
  })
}