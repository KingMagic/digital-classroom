import { DeleteOutlined, EditOutlined, MinusCircleOutlined, PlusOutlined, TeamOutlined } from '@ant-design/icons'
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table'
import { Button, message, Popconfirm, Tag } from 'antd'
import type { Key} from 'react';
import { useEffect, useRef, useState } from 'react'
import AlterClassRoom from './components/AlterClassRoom'
import NewClassRoom from './components/NewClassRoom'
import PageLoading from '@/components/PageLoading';
import type { ClassRoomItem } from './data'
import { getClassRoomList, deleteClassRoom } from './service'

const School = () => {

  const ref = useRef<ActionType>();
  const [tab, setTab] = useState('index')
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [selectedClassRoom, setSelectedClassRoom] = useState<ClassRoomItem>()
  const [loading, setLoading] = useState(false)

  const compare = (a: ClassRoomItem, b: ClassRoomItem, key: string) => {
    if (a[key] < b[key]) {
      return -1
    } else if (a[key] > b[key]) {
      return 1
    }
    return 0
  }

  const columns: ProColumns<ClassRoomItem>[] = [{
    align: 'center',
    dataIndex: 'SchoolName',
    sorter: {
      compare: (a, b) => compare(a, b, 'SchoolName')
    },
    title: '校区名称',
  }, {
    align: 'center',
    dataIndex: 'ClassName',
    sorter: {
      compare: (a, b) => compare(a, b, 'ClassName')
    },
    title: '班级名称',
  }, {
    align: 'center',
    dataIndex: 'TeacherName',
    sorter: {
      compare: (a, b) => compare(a, b, 'TeacherName')
    },
    title: '班主任',
  }, {
    align: 'center',
    dataIndex: 'Students',
    sorter: {
      compare: (a, b) => compare(a, b, 'Students')
    },
    title: '学生数量',
  }, {
    align: 'center',
    dataIndex: 'action',
    title: '动作',
    render: (dom, entity) => [
      <a key="edit" onClick={() => {
        setSelectedClassRoom(entity)
        setTab('alter')
      }} style={{color: '#67C23A', padding: '6px 10px'}}><EditOutlined /> 修改</a>,
      <Popconfirm key="delete" title="确认要删除吗" onConfirm={() => {
        setLoading(true)
        deleteClassRoom({id: entity.id}).then(() => {
          ref.current?.reload()
          message.success('删除成功')
          setLoading(false)
        })
      }}>
        <a key="delete" style={{color: '#F56C6C', padding: '6px 10px'}}><MinusCircleOutlined /> 删除</a>
      </Popconfirm>
    ]
  }]

  const deleteBatch = () => {
    console.log(selectedRowKeys)
    Promise.all(selectedRowKeys.map(key => deleteClassRoom({id: key}))).then(res => {
      console.log(res)
      ref.current?.reload()
    })
  }

  const ClassRoomTable = () => (
    <ProTable<ClassRoomItem>
      actionRef={ref}
      bordered
      columns={columns}
      request={getClassRoomList}
      rowKey="id"
      rowSelection={{
        onChange: (selectedRowKeys, selectedRows) => {
          setSelectedRowKeys(selectedRowKeys)
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
    {tab === 'index' && ClassRoomTable()}
    {tab === 'new' && <NewClassRoom onBack={() => setTab('index')} />}
    {tab === 'alter' && <AlterClassRoom onBack={() => setTab('index')} selectedClassRoom={selectedClassRoom} />}
    </div>
  )
}

export default School