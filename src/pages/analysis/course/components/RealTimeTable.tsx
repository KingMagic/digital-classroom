import { Table } from "antd"
import { useEffect, useState } from "react"
import { getRealTimeData } from "../service"

type Props = {
  classId: number
}

const RealTimeTable = (props: Props) => {

  const { classId } = props
  const [data, setData] = useState([])

  const query = () => {
    getRealTimeData({classId}).then(res => {
      if (res.success) {
        setData(res.data)
      }
    })
    return query
  }

  useEffect(() => {
    const timer = setInterval(query(), 3000)
    return () => clearInterval(timer)
  }, [])

  const columns = [{
    title: '姓名',
    dataIndex: 'name'
  }, {
    title: '举手状态(实时)',
    dataIndex: 'raiseStatus'
  }, {
    title: '举手次数',
    dataIndex: 'raise'
  }, {
    title: '站立次数',
    dataIndex: 'stand'
  }, {
    title: '注意力(计算累加值)默认倒叙',
    dataIndex: 'attention'
  }]

  return (
    <Table
      bordered
      columns={columns}
      dataSource={data}
      rowKey="id"
      scroll={{y: 200}}
      size="small"
    />
  )
}

export default RealTimeTable