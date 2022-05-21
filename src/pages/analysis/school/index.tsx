import { DeleteOutlined, EditOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table'
import { Button, message, Tag } from 'antd'
import { Key, useEffect, useRef, useState } from 'react'
import { useModel } from 'umi'
import AlterSchool from './components/AlterSchool'
import NewSchool from './components/NewSchool'
import { SchoolItem } from './data'
import { deleteSchool, getSchoolList } from './service'

const School = () => {

  const { courseMap } = useModel("courseModel")
  const ref = useRef<ActionType>();
  const [tab, setTab] = useState('index')
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [selectedSchoolList, setSelectedSchoolList] = useState<SchoolItem[]>([])

  const compare = (a: SchoolItem, b: SchoolItem, key: string) => {
    if (a[key] < b[key]) {
      return -1
    } else if (a[key] > b[key]) {
      return 1
    }
    return 0
  }

  const columns: ProColumns<SchoolItem>[] = [{
    align: 'center',
    dataIndex: 'name',
    sorter: {
      compare: (a, b) => compare(a, b, 'name')
    },
    title: '校区',
  }, {
    align: 'center',
    dataIndex: 'address',
    sorter: {
      compare: (a, b) => compare(a, b, 'address')
    },
    title: '地区',
  }, {
    align: 'center',
    dataIndex: 'course',
    title: '授课科目',
    sorter: true,
    render: (text: any) => text.map((item: string) => <Tag color="blue" key={item}>{courseMap.find(course => course.value === item)?.label}</Tag>),
  }, {
    align: 'center',
    dataIndex: 'action',
    title: '动作',
    render: (dom, entity) => [
      <a key="edit" onClick={() => {
        setSelectedSchoolList([entity])
        setTab('alter')
      }} style={{color: '#67C23A', padding: '6px 10px'}}><EditOutlined /> 编辑</a>,
      <a key="delete" onClick={() => {
        deleteSchool({data: entity}).then(res => {
          if (res.success) {
            ref.current?.reload()
            message.success('删除成功')
          }
        })
      }} style={{color: '#F56C6C', padding: '6px 10px'}}><MinusCircleOutlined /> 删除</a>
    ]
  }]

  const SchoolTable = () => (
    <ProTable<SchoolItem>
      actionRef={ref}
      bordered
      columns={columns}
      request={getSchoolList}
      rowKey="id"
      rowSelection={{
        onChange: (selectedRowKeys, selectedRows) => {
          setSelectedRowKeys(selectedRowKeys)
          setSelectedSchoolList(selectedRows)
        },
        selectedRowKeys,
      }}
      search={false}
      tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => (
        <span>
          已选择{selectedRowKeys.length}条
          <a style={{ marginLeft: 8 }} onClick={onCleanSelected}>
            清除
          </a>
        </span>
      )}
      toolbar={{
        menu: {
          items: [{
            key: 'add',
            label: <Button style={{backgroundColor: '#009688'}} ghost icon={<PlusOutlined />} onClick={() => setTab('new')}>增加</Button>
          }, {
            key: 'alter',
            label: <Button style={{backgroundColor: '#67C23A'}} disabled={selectedRowKeys.length === 0} ghost icon={<EditOutlined />} onClick={() => setTab('alter')}>修改</Button>
          }, {
            key: 'remove',
            label: <Button style={{backgroundColor: '#F56C6C'}} disabled={selectedRowKeys.length === 0} ghost icon={<DeleteOutlined />}>批量删除</Button>
          },]
        }
      }}
    />
  )

  return (
    <div>
    {tab === 'index' && SchoolTable()}
    {tab === 'new' && <NewSchool onBack={() => setTab('index')} />}
    {tab === 'alter' && <AlterSchool onBack={() => setTab('index')} selectedSchoolList={selectedSchoolList} />}
    </div>
  )
}

export default School