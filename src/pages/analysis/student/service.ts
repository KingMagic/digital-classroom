import { request } from 'umi';
import type { StudentItem } from './data';

export async function getStudentList(): Promise<{ data: StudentItem[] }> {
  return request('/api/Students')
}

export async function addStudent(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request('/api/Students', {
    data,
    method: 'POST',
    ...(options || {}),
  })
}

export async function alterStudent(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request('/api/Students/'+data.id, {
    data,
    method: 'PUT',
    ...(options || {}),
  })
}

export async function deleteStudent(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request('/api/Students/'+data.id, {
    data,
    method: 'DELETE',
    ...(options || {}),
  })
}