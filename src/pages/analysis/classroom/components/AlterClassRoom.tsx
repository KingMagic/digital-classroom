import ProForm, { ProFormDigit, ProFormSelect, ProFormText } from "@ant-design/pro-form"
import { Card, Col, Divider, Row, Space } from "antd"
import { useEffect, useState } from "react"
import { SchoolItem } from "../../school/data"
import { getSchoolList } from "../../school/service"
import { ClassRoomItem } from "../data"
import { alterClassRoom } from "../service"

type AlterClassRoomProps = {
  onBack: () => void;
  selectedClassRoom: ClassRoomItem | undefined
}

const AlterClassRoom = ({ onBack, selectedClassRoom }: AlterClassRoomProps) => {

  const [schoolList, setSchoolList] = useState<SchoolItem[]>([])

  useEffect(() => {
    getSchoolList().then(res => {
      setSchoolList(res.data)
    })
  }, [])

  const onFinish = (data: ClassRoomItem) => {
    return alterClassRoom({
      ...data,
    }).then(res => {
      console.log(res)
      if (res.success) {
        onBack()
      }
    })
  }
  
  return (
    <Card>
      <div>
        <a onClick={onBack}>返回</a>
        <Divider type="vertical" />
        <span>修改 班级管理</span>
      </div>
      <ProForm
        initialValues={selectedClassRoom}
        layout="horizontal"
        labelAlign="left"
        labelCol={{span: 3}}
        wrapperCol={{span: 9}}
        onFinish={onFinish}
        submitter={{
          render: (props, doms) => {
            return (
              <Row>
                <Col span={14} offset={3}>
                  <Space>{doms}</Space>
                </Col>
              </Row>
            );
          },
        }}
      >
        <ProFormText name="id" hidden />
        <ProFormDigit name="ClassID" label="班级编号" required rules={[{
          required: true,
          message: '请输入班级编号'
        }]} />
        <ProFormSelect name="SchoolName" label="校区名称" required rules={[{
          required: true,
          message: '请选择校区'
        }]} options={schoolList.map(school => ({value: school.SchoolName, label: school.SchoolName}))} />
        <ProFormText name="ClassName" label="班级名称" required rules={[{
          required: true,
          message: '请输入班级名称'
        }]} />
        <ProFormText name="TeacherName" label="班主任" required rules={[{
          required: true,
          message: '请输入班主任'
        }]} />
        <ProFormDigit name="Students" label="学生数量" required rules={[{
          required: true,
          message: '请输入学生数量'
        }]} />
      </ProForm>
    </Card>
  )
}

export default AlterClassRoom