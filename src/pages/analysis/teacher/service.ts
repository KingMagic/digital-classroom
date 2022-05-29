import { request } from 'umi';
import type { TeacherItem } from './data';

export async function getTeacherList(): Promise<{ data: TeacherItem[] }> {
  return request('/api/Teacher')
}

export async function addTeacher(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request('/api/Teacher', {
    data,
    method: 'POST',
    ...(options || {}),
  })
}

export async function alterTeacher(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request('/api/Teacher/'+data.id, {
    data,
    method: 'PUT',
    ...(options || {}),
  })
}

export async function deleteTeacher(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request('/api/Teacher/'+data.id, {
    data,
    method: 'DELETE',
    ...(options || {}),
  })
}