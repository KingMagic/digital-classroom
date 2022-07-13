import { request } from 'umi';
import type { CourseItem } from './data';

export async function getCourseList(): Promise<{ data: CourseItem[] }> {
  return request('/api/Course');
}

export async function getRealTimeData(params: { classId: number }) {
  return request('/api/getRealTimeData', {
    params,
    method: 'GET',
  })
}

export async function addCourse(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request('/api/Course', {
    data,
    method: 'POST',
  })
}

export async function alterCourse(data: { [key: string]: any }, options?: { [key: string]: any }) {
  return request('/api/Course/'+data.id, {
    data,
    method: 'PUT',
    ...(options || {}),
  })
}

export async function getChart(params: { [key: string]: any }) {
  return request('/api/Chart', {
    params,
  });
}