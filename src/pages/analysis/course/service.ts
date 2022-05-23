import { request } from 'umi';
import type { CourseItem } from './data';

export async function getCourseList(): Promise<{ data: CourseItem[] }> {
  return request('/api/getCourseList');
}

export async function getRealTimeData(params: { classId: number }) {
  return request('/api/getRealTimeData', {
    params,
    method: 'GET',
  })
}