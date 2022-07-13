import ProTable from "@ant-design/pro-table"
import type { Key} from "react";
import { useRef, useState } from "react";
import type { CourseItem } from "./data"
import type { ActionType, ProColumns } from "@ant-design/pro-table"
import { deleteCourse, getCourseList } from "./service";
import { Button, Col, Modal, Row, Space, Switch, Tag } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import RealTimeTable from "./components/RealTimeTable";
import AnalysisModal from "./components/AnalysisModal";
import NewCourse from "./components/NewCourse";

const Course = () => {
  
  const ref = useRef<ActionType>();
  const [tab, setTab] = useState('index')
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const [selectedCourse, setSelectedCourse] = useState<CourseItem>()
  const [currentCourse, setCurrentCourse] = useState<CourseItem>()
  const [showRealTime, setShowRealTime] = useState(false)
  const [showAnalysis, setShowAnalysis] = useState(false)

  const compare = (a: CourseItem, b: CourseItem, key: string) => {
    if (a[key] < b[key]) {
      return -1
    } else if (a[key] > b[key]) {
      return 1
    }
    return 0
  }

  const columns: ProColumns<CourseItem>[] = [{
    title: '课程名',
    dataIndex: 'CourseName',
    align: 'center',
  }, {
    title: '校区名称',
    dataIndex: 'SchoolName',
    align: 'center',
  }, {
    title: '班级名称',
    dataIndex: 'ClassName',
    align: 'center',
  }, {
    title: '上课时间',
    dataIndex: 'StartTime',
    align: 'center',
    render: (dom: any) => moment(dom).format('YYYY-MM-DD HH:mm:ss')
  }, {
    title: '课程时长',
    dataIndex: 'Duration',
    align: 'center',
  }, {
    title: '举手次数',
    dataIndex: 'RaiseHandNum',
    align: 'center',
  }, {
    title: '站立次数',
    dataIndex: 'StandNum',
    align: 'center',
  }, {
    title: '趴桌占比',
    dataIndex: 'LyingTableNum',
    align: 'center',
  }, {
    title: '看黑板占比',
    dataIndex: 'BlackboardNum',
    align: 'center',
  }, {
    title: '是否下课',
    dataIndex: 'Status',
    align: 'center',
    render: (dom: any) => <Switch checked={dom} />
  }, {
    title: '课情分析',
    align: 'center',
    render: (dom, entity) => (
      <Space>
        <Button style={{backgroundColor: '#ffa500'}} ghost onClick={() => {
          setCurrentCourse(entity)
        }}>分析结果</Button>
      </Space>
    )
  }]

  const deleteBatch = () => {
    Promise.all(selectedRowKeys.map(key => deleteCourse({id: key}))).then(() => {
      ref.current?.reload()
      message.success('删除成功')
    })
  }

  const CourseTable = () => (
    <>
      <ProTable<CourseItem>
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
              key: 'remove',
              label: <Button style={{backgroundColor: '#F56C6C'}} disabled={selectedRowKeys.length === 0} ghost onClick={deleteBatch} icon={<DeleteOutlined />}>批量删除</Button>
            },]
          }
        }}
      />
      {currentCourse && <AnalysisModal currentCourse={currentCourse} onCancel={() => setCurrentCourse(undefined)} />}
    </>
  )

  return (
    <div>
    {tab === 'index' && CourseTable()}
    {tab === 'new' && <NewCourse onBack={() => setTab('index')} />}
    </div>
  )
}

export default Course