import { DeleteOutlined, EditOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table'
import { Avatar, Button, message, Popconfirm, Tag } from 'antd'
import { Key, useEffect, useRef, useState } from 'react'
import { useModel } from 'umi'
import AlterStudent from './components/AlterStudent'
import NewStudent from './components/NewStudent'
import { StudentItem } from './data'
import { deleteStudent, getStudentList } from './service'

const Student = () => {

  const { columnMap, genderMap, rowMap } = useModel("dictModel")
  const ref = useRef<ActionType>();
  const [tab, setTab] = useState('index')
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [selectedStudent, setSelectedStudent] = useState<StudentItem>()

  const compare = (a: StudentItem, b: StudentItem, key: string) => {
    if (a[key] < b[key]) {
      return -1
    } else if (a[key] > b[key]) {
      return 1
    }
    return 0
  }

  const columns: ProColumns<StudentItem>[] = [{
    align: 'center',
    dataIndex: 'StudentID',
    sorter: {
      compare: (a, b) => compare(a, b, 'StudentID')
    },
    title: '学号',
  }, {
    align: 'center',
    dataIndex: 'StudentName',
    sorter: {
      compare: (a, b) => compare(a, b, 'StudentName')
    },
    title: '姓名',
  }, {
    align: 'center',
    dataIndex: 'Row',
    sorter: {
      compare: (a, b) => compare(a, b, 'Row')
    },
    title: '座位行',
    render: (text: any) => rowMap.find(row => row.value === text)?.label
  }, {
    align: 'center',
    dataIndex: 'Line',
    sorter: {
      compare: (a, b) => compare(a, b, 'Line')
    },
    title: '座位列',
    render: (text: any) => columnMap.find(column => column.value === text)?.label
  }, {
    align: 'center',
    dataIndex: 'Gender',
    title: '性别',
    render: (text: any) => genderMap.find(gender => gender.value === text)?.label
  }, {
    align: 'center',
    dataIndex: 'SchoolName',
    title: '校区名称',
  }, {
    align: 'center',
    dataIndex: 'ClassName',
    title: '班级名称',
  }, {
    align: 'center',
    dataIndex: 'Avatar',
    title: '头像',
    render: (text: any) => <Avatar shape="square" src={text} />
  }, {
    align: 'center',
    dataIndex: 'action',
    title: '动作',
    render: (dom, entity) => [
      <a key="edit" onClick={() => {
        setSelectedStudent(entity)
        setTab('alter')
      }} style={{color: '#67C23A', padding: '6px 10px'}}><EditOutlined /> 修改</a>,
      <Popconfirm title="确认要删除吗" onConfirm={() => {
        deleteStudent({id: entity.id}).then(res => {
          ref.current?.reload()
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
    Promise.all(selectedRowKeys.map(key => deleteStudent({id: key}))).then(res => {
      ref.current?.reload()
    })
  }

  const StudentTable = () => (
    <ProTable<StudentItem>
      actionRef={ref}
      bordered
      columns={columns}
      request={getStudentList}
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
    {tab === 'index' && StudentTable()}
    {tab === 'new' && <NewStudent onBack={() => setTab('index')} />}
    {tab === 'alter' && <AlterStudent onBack={() => setTab('index')} selectedStudent={selectedStudent} />}
    </div>
  )
}

export default Student