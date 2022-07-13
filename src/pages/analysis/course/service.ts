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

export async function addCourse(data: Record<string, any>, options?: Record<string, any>) {
  return request('/api/Course', {
    data,
    method: 'POST',
  })
}

export async function alterCourse(data: Record<string, any>, options?: Record<string, any>) {
  return request('/api/Course/'+data.id, {
    data,
    method: 'PUT',
    ...(options || {}),
  })
}

export async function deleteCourse(data: Record<string, any>, options?: Record<string, any>) {
  return request('/api/Course/'+data.id, {
    data,
    method: 'DELETE',
    ...(options || {}),
  })
}

export async function getChart(params: Record<string, any>) {
  return request('/api/Chart', {
    params,
  });
}