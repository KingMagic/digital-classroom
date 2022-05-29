import { request } from 'umi';
import type { ClassRoomItem } from './data';

export async function getClassRoomList(): Promise<{ data: ClassRoomItem[] }> {
  return request('/api/ClassRoom')
}

export async function addClassRoom(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request('/api/ClassRoom', {
    data,
    method: 'POST',
  })
}

export async function alterClassRoom(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request('/api/ClassRoom/'+data.id, {
    data,
    method: 'PUT',
    ...(options || {}),
  })
}

export async function deleteClassRoom(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request('/api/ClassRoom/'+data.id, {
    data,
    method: 'DELETE',
    ...(options || {}),
  })
}