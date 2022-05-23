export type CourseItem = {
  id: number;
  name: string;
  school: SchoolItem;
  classList: ClassItem[];
  beginTime: number;
  raise: number;
  stand: number;
  lie: number;
  active: number;
  listenPercent: number;
};