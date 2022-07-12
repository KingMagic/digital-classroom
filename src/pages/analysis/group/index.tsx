import ProTable from "@ant-design/pro-table"
import { Key, useRef, useState } from "react";
import type { GroupItem } from "./data"
import type { ActionType, ProColumns } from "@ant-design/pro-table"
import { getCourseList } from "./service";
import { Button, Col, Modal, Row, Space, Tag } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import { ClassRoomItem } from "../classroom/data";

const Group = () => {
  
  const ref = useRef<ActionType>();
  const [tab, setTab] = useState('index')
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [currentCourse, setCurrentCourse] = useState<GroupItem>()
  const [showRealTime, setShowRealTime] = useState(false)
  const [showAnalysis, setShowAnalysis] = useState(false)

  const compare = (a: GroupItem, b: GroupItem, key: string) => {
    if (a[key] < b[key]) {
      return -1
    } else if (a[key] > b[key]) {
      return 1
    }
    return 0
  }

  const columns: ProColumns<GroupItem>[] = [{
    title: '校区名称',
    dataIndex: 'SchoolName',
    align: 'center',
    sorter: {
      compare: (a, b) => compare(a, b, 'name')
    },
  }, {
    title: '班级名称',
    dataIndex: 'ClassName',
    align: 'center',
    sorter: {
      compare: (a, b) => compare(a, b, 'name')
    },
  }, {
    title: '分组名称',
    dataIndex: 'GroupName',
    align: 'center',
    sorter: {
      compare: (a, b) => compare(a, b, 'beginTime')
    },
  }]

  return (
    <>
      <ProTable<GroupItem>
        actionRef={ref}
        bordered
        columns={columns}
        request={getCourseList}
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
              key: 'alter',
              label: <Button style={{backgroundColor: '#67C23A'}} disabled={selectedRowKeys.length === 0} ghost icon={<EditOutlined />} onClick={() => setTab('alter')}>修改</Button>
            }, {
              key: 'remove',
              label: <Button style={{backgroundColor: '#F56C6C'}} disabled={selectedRowKeys.length === 0} ghost icon={<DeleteOutlined />}>批量删除</Button>
            },]
          }
        }}
      />
    </>
  )
}

export default Group