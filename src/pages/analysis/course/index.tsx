import ProTable from "@ant-design/pro-table"
import { Key, useRef, useState } from "react";
import type { CourseItem } from "./data"
import type { ActionType, ProColumns } from "@ant-design/pro-table"
import { getCourseList } from "./service";
import { Button, Col, Modal, Row, Space, Tag } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import moment from "moment";
import RealTimeTable from "./components/RealTimeTable";
import AnalysisModal from "./components/AnalysisModal";
import { ClassRoomItem } from "../classroom/data";

const Course = () => {
  
  const ref = useRef<ActionType>();
  const [tab, setTab] = useState('index')
  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
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
    dataIndex: 'name',
    align: 'center',
    sorter: {
      compare: (a, b) => compare(a, b, 'name')
    },
  }, {
    title: '校区名称',
    dataIndex: 'school',
    align: 'center',
    sorter: {
      compare: (a, b) => compare(a, b, 'name')
    },
    render: (dom: any) => dom.name
  }, {
    title: '班级名称',
    dataIndex: 'classList',
    align: 'center',
    sorter: {
      compare: (a, b) => compare(a, b, 'name')
    },
    render: (dom: any) => dom.map((item: ClassRoomItem) => <Tag key={item.id} color="blue">{item.ClassName}</Tag>)
  }, {
    title: '上课时间',
    dataIndex: 'beginTime',
    align: 'center',
    sorter: {
      compare: (a, b) => compare(a, b, 'beginTime')
    },
    render: (dom: any) => moment(dom).format('YYYY-MM-DD hh:mm:ss')
  }, {
    title: '课程时长',
    dataIndex: 'beginTime',
    align: 'center',
    sorter: {
      compare: (a, b) => compare(a, b, 'beginTime')
    },
    render: (dom: any) => moment(dom).format('YYYY-MM-DD hh:mm:ss')
  }, {
    title: '举手次数',
    dataIndex: 'raise',
    align: 'center',
    sorter: {
      compare: (a, b) => compare(a, b, 'name')
    },
  }, {
    title: '站立次数',
    dataIndex: 'stand',
    align: 'center',
    sorter: {
      compare: (a, b) => compare(a, b, 'name')
    },
  }, {
    title: '趴桌占比',
    dataIndex: 'lie',
    align: 'center',
    sorter: {
      compare: (a, b) => compare(a, b, 'name')
    },
  }, {
    title: '看黑板占比',
    dataIndex: 'lie',
    align: 'center',
    sorter: {
      compare: (a, b) => compare(a, b, 'name')
    },
  }, {
    title: '状态',
    dataIndex: 'active',
    align: 'center',
    sorter: {
      compare: (a, b) => compare(a, b, 'name')
    },
  }, {
    title: '课情分析',
    align: 'center',
    render: (dom, entity) => (
      <Space>
        <Button style={{backgroundColor: '#909399'}} ghost onClick={() => {
          setShowRealTime(true)
          setCurrentCourse(entity)
        }}>课程分析</Button>
      </Space>
    )
  }]

  return (
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
              key: 'alter',
              label: <Button style={{backgroundColor: '#67C23A'}} disabled={selectedRowKeys.length === 0} ghost icon={<EditOutlined />} onClick={() => setTab('alter')}>修改</Button>
            }, {
              key: 'remove',
              label: <Button style={{backgroundColor: '#F56C6C'}} disabled={selectedRowKeys.length === 0} ghost icon={<DeleteOutlined />}>批量删除</Button>
            },]
          }
        }}
      />
      <Modal
        title="实时信息"
        destroyOnClose
        footer={null}
        onCancel={() => setShowRealTime(false)}
        visible={showRealTime}
        width="60%"
      >
        <Row gutter={16}>
          {currentCourse?.classList.map(classItem => (
            <Col key={classItem.id} span={12}>
              {classItem.name}
              <RealTimeTable classId={classItem.id} />
            </Col>
          ))}
        </Row>
      </Modal>
      {showAnalysis && <AnalysisModal onCancel={() => setShowAnalysis(false)} />}
    </>
  )
}

export default Course