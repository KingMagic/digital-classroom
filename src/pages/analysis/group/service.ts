import { request } from 'umi';
import type { GroupItem } from './data';

export async function getCourseList(): Promise<{ data: GroupItem[] }> {
  return request('/api/Group');
}