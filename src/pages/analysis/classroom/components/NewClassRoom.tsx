import ProForm, { ProFormDigit, ProFormSelect, ProFormText } from "@ant-design/pro-form"
import { Card, Col, Divider, message, Row, Space } from "antd"
import { useEffect, useState } from "react"
import type { SchoolItem } from "../../school/data"
import { getSchoolList } from "../../school/service"
import { addClassRoom } from "../service"

type NewClassRoomProps = {
  onBack: () => void
}

const NewClassRoom = ({ onBack }: NewClassRoomProps) => {

  const [schoolList, setSchoolList] = useState<SchoolItem[]>([])

  useEffect(() => {
    getSchoolList().then(res => {
      setSchoolList(res.data)
    })
  }, [])
  
  const onFinish = (data: any) => {
    return addClassRoom({
      ...data,
    }).then(res => {
      console.log(res)
      if (res.success) {
        onBack()
      } else {
        message.error(res.msg)
      }
    })
  }

  return (
    <Card>
      <div style={{marginBottom: 24}}>
        <a onClick={onBack}>返回</a>
        <Divider type="vertical" />
        <span>增加 班级管理</span>
      </div>
      <ProForm
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
        <ProFormSelect name="School" label="校区名称" required rules={[{
          required: true,
          message: '请选择校区'
        }]} options={schoolList.map(school => ({value: school.id, label: school.SchoolName}))} />
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

export default NewClassRoom
