import { DeleteOutlined, EditOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table'
import { Button, message, Popconfirm, Tag } from 'antd'
import type { Key} from 'react';
import { useEffect, useRef, useState } from 'react'
import { useModel } from 'umi'
import AlterSchool from './components/AlterSchool'
import NewSchool from './components/NewSchool'
import type { SchoolItem } from './data'
import { deleteSchool, getSchoolList } from './service'

const School = () => {

  const { courseMap } = useModel("dictModel")
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
    dataIndex: 'SchoolName',
    sorter: {
      compare: (a, b) => compare(a, b, 'SchoolName')
    },
    title: '校区',
  }, {
    align: 'center',
    dataIndex: 'Area',
    sorter: {
      compare: (a, b) => compare(a, b, 'Area')
    },
    title: '地区',
  }, {
    align: 'center',
    dataIndex: 'Subjects',
    title: '授课科目',
    render: (text: any) => text.split(',').map((item: string) => <Tag color="blue" key={item}>{courseMap.find(course => course.value === item)?.label}</Tag>),
  }, {
    align: 'center',
    dataIndex: 'action',
    title: '动作',
    render: (dom, entity) => [
      <a key="edit" onClick={() => {
        setSelectedSchoolList([entity])
        setTab('alter')
      }} style={{color: '#67C23A', padding: '6px 10px'}}><EditOutlined /> 修改</a>,
      <Popconfirm key="delete" title="确认要删除吗" onConfirm={() => {
        deleteSchool({id: entity.id}).then(() => {
          ref.current?.reload()
          message.success('删除成功')
          // if (res.success) {
          //   ref.current?.reload()
          //   message.success('删除成功')
          // }
        })
      }}>
        <a key="delete" style={{color: '#F56C6C', padding: '6px 10px'}}><MinusCircleOutlined /> 删除</a>
      </Popconfirm>
    ]
  }]

  const deleteBatch = () => {
    Promise.all(selectedRowKeys.map(key => deleteSchool({id: key}))).then(res => {
      ref.current?.reload()
    })
  }

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
            key: 'remove',
            label: <Button style={{backgroundColor: '#F56C6C'}} disabled={selectedRowKeys.length === 0} ghost icon={<DeleteOutlined />} onClick={deleteBatch}>批量删除</Button>
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