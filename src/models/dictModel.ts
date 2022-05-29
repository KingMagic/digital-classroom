export default function dictModel () {
  const courseMap = [{
    key: '0',
    value: '0',
    label: '语文',
  }, {
    key: '1',
    value: '1',
    label: '数学',
  }, {
    key: '2',
    value: '2',
    label: '英语',
  }, {
    key: '3',
    value: '3',
    label: '政治',
  }, {
    key: '4',
    value: '4',
    label: '生物'
  }, {
    key: '5',
    value: '5',
    label: '历史'
  }, {
    key: '6',
    value: '6',
    label: '体育'
  }]

  const genderMap = [{
    key: 0,
    value: 0,
    label: '男',
  }, {
    key: 1,
    value: 1,
    label: '女',
  }]

  const roleMap = [{
    key: '0',
    value: '0',
    label: '教导主任',
  }, {
    key: '1',
    value: '1',
    label: '学科主任',
  }, {
    key: '2',
    value: '2',
    label: '班主任',
  }, {
    key: '3',
    value: '3',
    label: '任课老师',
  }]

  const rowMap = [{
    key: '0',
    value: 0,
    label: '第一行'
  }, {
    key: '1',
    value: 1,
    label: '第二行'
  }, {
    key: '2',
    value: 2,
    label: '第三行'
  }, {
    key: '3',
    value: 3,
    label: '第四行'
  }, {
    key: '4',
    value: 4,
    label: '第五行'
  }, {
    key: '5',
    value: 5,
    label: '第六行'
  }, {
    key: '6',
    value: 6,
    label: '第七行'
  }, {
    key: '7',
    value: 7,
    label: '第八行'
  }, {
    key: '8',
    value: 8,
    label: '第九行'
  }, {
    key: '9',
    value: 9,
    label: '第十行'
  }]

  const columnMap = [{
    key: '0',
    value: 0,
    label: '第一列'
  }, {
    key: '1',
    value: 1,
    label: '第二列'
  }, {
    key: '2',
    value: 2,
    label: '第三列'
  }, {
    key: '3',
    value: 3,
    label: '第四列'
  }, {
    key: '4',
    value: 4,
    label: '第五列'
  }, {
    key: '5',
    value: 5,
    label: '第六列'
  }, {
    key: '6',
    value: 6,
    label: '第七列'
  }, {
    key: '7',
    value: 7,
    label: '第八列'
  }, {
    key: '8',
    value: 8,
    label: '第九列'
  }, {
    key: '9',
    value: 9,
    label: '第十列'
  }]

  return {
    courseMap,
    genderMap,
    roleMap,
    rowMap,
    columnMap,
  }
}