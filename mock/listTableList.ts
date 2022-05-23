// eslint-disable-next-line import/no-extraneous-dependencies
import type { CourseItem } from '@/pages/analysis/course/data';
import type { SchoolItem } from '@/pages/analysis/school/data';
import type { Request, Response } from 'express';
import moment from 'moment';
import { parse } from 'url';

// mock tableListDataSource
const genList = (current: number, pageSize: number) => {
  const tableListDataSource: API.RuleListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      key: index,
      disabled: i % 6 === 0,
      href: 'https://ant.design',
      avatar: [
        'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
        'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
      ][i % 2],
      name: `TradeCode ${index}`,
      owner: '曲丽丽',
      desc: '这是一段描述',
      callNo: Math.floor(Math.random() * 1000),
      status: Math.floor(Math.random() * 10) % 4,
      updatedAt: moment().format('YYYY-MM-DD'),
      createdAt: moment().format('YYYY-MM-DD'),
      progress: Math.ceil(Math.random() * 100),
    });
  }
  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 100);

function getRule(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = parse(realUrl, true).query as unknown as API.PageParams &
    API.RuleListItem & {
      sorter: any;
      filter: any;
    };

  let dataSource = [...tableListDataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  if (params.sorter) {
    const sorter = JSON.parse(params.sorter);
    dataSource = dataSource.sort((prev, next) => {
      let sortNumber = 0;
      Object.keys(sorter).forEach((key) => {
        if (sorter[key] === 'descend') {
          if (prev[key] - next[key] > 0) {
            sortNumber += -1;
          } else {
            sortNumber += 1;
          }
          return;
        }
        if (prev[key] - next[key] > 0) {
          sortNumber += 1;
        } else {
          sortNumber += -1;
        }
      });
      return sortNumber;
    });
  }
  if (params.filter) {
    const filter = JSON.parse(params.filter as any) as {
      [key: string]: string[];
    };
    if (Object.keys(filter).length > 0) {
      dataSource = dataSource.filter((item) => {
        return Object.keys(filter).some((key) => {
          if (!filter[key]) {
            return true;
          }
          if (filter[key].includes(`${item[key]}`)) {
            return true;
          }
          return false;
        });
      });
    }
  }

  if (params.name) {
    dataSource = dataSource.filter((data) => data?.name?.includes(params.name || ''));
  }
  const result = {
    data: dataSource,
    total: tableListDataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.current}`, 10) || 1,
  };

  return res.json(result);
}

function postRule(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter((item) => key.indexOf(item.key) === -1);
      break;
    case 'post':
      (() => {
        const i = Math.ceil(Math.random() * 10000);
        const newRule: API.RuleListItem = {
          key: tableListDataSource.length,
          href: 'https://ant.design',
          avatar: [
            'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
            'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
          ][i % 2],
          name,
          owner: '曲丽丽',
          desc,
          callNo: Math.floor(Math.random() * 1000),
          status: Math.floor(Math.random() * 10) % 2,
          updatedAt: moment().format('YYYY-MM-DD'),
          createdAt: moment().format('YYYY-MM-DD'),
          progress: Math.ceil(Math.random() * 100),
        };
        tableListDataSource.unshift(newRule);
        return res.json(newRule);
      })();
      return;

    case 'update':
      (() => {
        let newRule = {};
        tableListDataSource = tableListDataSource.map((item) => {
          if (item.key === key) {
            newRule = { ...item, desc, name };
            return { ...item, desc, name };
          }
          return item;
        });
        return res.json(newRule);
      })();
      return;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  res.json(result);
}

const genSchoolList = (current: number, pageSize: number) => {
  const tableListDataSource: SchoolItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      id: index,
      name: `大学 ${index}`,
      address: `文苑路${index}号`,
      course: ['3', '4']
    });
  }
  return tableListDataSource;
};

let schoolList = genSchoolList(1, 6);

function getSchool(req: Request, res: Response) {
  const result = {
    data: schoolList,
    total: schoolList.length,
    success: true,
  };

  res.json(result);
}

function addSchool(req: Request, res: Response, u: string, b: Request) {
  const body = (b && b.body) || req.body;
  const { data } = body;
  schoolList.push({
    ...data,
    id: schoolList.length
  })
  const result = {
    success: true
  };

  res.json(result);
}

function alterSchool(req: Request, res: Response) {
  const { data } = req.body
  const index = schoolList.findIndex(school => school.id === data.id)
  if (index !== -1) {
    schoolList[index] = data
  }
  const result = {
    success: true
  };

  res.json(result);
}

function deleteSchool(req: Request, res: Response) {
  const { data } = req.body
  schoolList = schoolList.filter(school => school.id !== data.id)
  const result = {
    success: true
  };

  res.json(result);
}

const genClassList = (current: number, pageSize: number) => {
  const classListDataSource = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    classListDataSource.push({
      id: index,
      name: `class ${index}`,
      school: schoolList[1],
      admin: 'banzhuren',
      studentNumber: 99,
    });
  }
  return classListDataSource;
};

let classList = genClassList(1, 6);

const genCourseList = (current: number, pageSize: number) => {
  const courseListDataSource = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    courseListDataSource.push({
      id: index,
      name: `course ${index}`,
      school: schoolList[1],
      classList: classList.slice(1,3),
      beginTime: 1231231231231,
      raise: 12,
      stand: 13,
      lie: 14,
      active: 15,
      listenPercent: 16,
    });
  }
  return courseListDataSource;
};

let courseList = genCourseList(1, 6);

function getCourseList(req: Request, res: Response) {
  const result = {
    data: courseList,
    total: courseList.length,
    success: true,
  };

  res.json(result);
}

const genStudentList = (current: number, pageSize: number) => {
  const studentListDataSource = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    studentListDataSource.push({
      id: index,
      name: `student ${index}`,
      school: schoolList[1],
      class: classList[1],
      raiseStatus: index%2,
      raise: index+1,
      stand: index+3,
      attention: index*17%5
    });
  }
  return studentListDataSource;
}

let studentList = genStudentList(1, 20)

function getRealTimeData(req: Request, res: Response) {
  const { classId } = req.query;
  const filterList = studentList.filter(student => student.class.id === Number(classId))
  const result = {
    data: filterList,
    total: filterList.length,
    success: true,
  };

  res.json(result);
}

export default {
  'GET /api/rule': getRule,
  'POST /api/rule': postRule,
  'GET /api/getSchoolList': getSchool,
  'POST /api/addSchool': addSchool,
  'POST /api/alterSchool': alterSchool,
  'POST /api/deleteSchool': deleteSchool,
  'GET /api/getCourseList': getCourseList,
  'GET /api/getRealTimeData': getRealTimeData,
};
