import { DeleteOutlined, EditOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table'
import { Avatar, Button, message, Popconfirm, Tag } from 'antd'
import { Key, useEffect, useRef, useState } from 'react'
import { useModel } from 'umi'
import AlterTeacher from './components/AlterTeacher'
import NewTeacher from './components/NewTeacher'
import { TeacherItem } from './data'
import { deleteTeacher, getTeacherList } from './service'

const Teacher = () => {

  const { courseMap, genderMap, roleMap } = useModel("dictModel")
  const ref = useRef<ActionType>();
  const [tab, setTab] = useState('index')
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [selectedTeacher, setSelectedTeacher] = useState<TeacherItem>()

  const compare = (a: TeacherItem, b: TeacherItem, key: string) => {
    if (a[key] < b[key]) {
      return -1
    } else if (a[key] > b[key]) {
      return 1
    }
    return 0
  }

  const columns: ProColumns<TeacherItem>[] = [{
    align: 'center',
    dataIndex: 'TeacherID',
    sorter: {
      compare: (a, b) => compare(a, b, 'TeacherID')
    },
    title: '职工号',
  }, {
    align: 'center',
    dataIndex: 'Name',
    sorter: {
      compare: (a, b) => compare(a, b, 'Name')
    },
    title: '姓名',
  }, {
    align: 'center',
    dataIndex: 'Gender',
    title: '性别',
    render: (text: any) => genderMap.find(gender => gender.value === text)?.label
  }, {
    align: 'center',
    dataIndex: 'PassPort',
    title: '账号',
  }, {
    align: 'center',
    dataIndex: 'Role',
    title: '角色',
    render: (text: any) => text.split(',').map((item: string) => <Tag color="blue" key={item}>{roleMap.find(role => role.value === item)?.label}</Tag>),
  }, {
    align: 'center',
    dataIndex: 'Course',
    title: '授课科目',
    render: (text: any) => text.split(',').map((item: string) => <Tag color="blue" key={item}>{courseMap.find(course => course.value === item)?.label}</Tag>),
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
        setSelectedTeacher(entity)
        setTab('alter')
      }} style={{color: '#67C23A', padding: '6px 10px'}}><EditOutlined /> 修改</a>,
      <Popconfirm title="确认要删除吗" onConfirm={() => {
        deleteTeacher({id: entity.id}).then(res => {
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
    Promise.all(selectedRowKeys.map(key => deleteTeacher({id: key}))).then(res => {
      ref.current?.reload()
    })
  }

  const TeacherTable = () => (
    <ProTable<TeacherItem>
      actionRef={ref}
      bordered
      columns={columns}
      request={getTeacherList}
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
    {tab === 'index' && TeacherTable()}
    {tab === 'new' && <NewTeacher onBack={() => setTab('index')} />}
    {tab === 'alter' && <AlterTeacher onBack={() => setTab('index')} selectedTeacher={selectedTeacher} />}
    </div>
  )
}

export default Teacher