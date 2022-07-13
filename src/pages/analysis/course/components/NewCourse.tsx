import ProForm, { ProFormDigit, ProFormSelect, ProFormText, ProFormDateTimePicker } from "@ant-design/pro-form"
import { Card, Col, Divider, Form, message, Row, Space } from "antd"
import { useEffect, useState } from "react"
import type { ClassRoomItem } from "../../classroom/data"
import { getClassRoomList } from "../../classroom/service"
import type { SchoolItem } from "../../school/data"
import { getSchoolList } from "../../school/service"
import { addCourse } from "../service"

type NewCourseProps = {
  onBack: () => void
}

const NewCourse = ({ onBack }: NewCourseProps) => {

  const [schoolList, setSchoolList] = useState<SchoolItem[]>([])
  const [classroomList, setClassroomList] = useState<ClassRoomItem[]>([])
  const [selectedSchool, setSelectedSchool] = useState<string>()
  const [form] = Form.useForm()

  useEffect(() => {
    getSchoolList().then(res => {
      setSchoolList(res.data)
    })
    getClassRoomList().then(res => {
      setClassroomList(res.data)
    })
  }, [])
  
  const onFinish = (data: any) => {
    return addCourse({
      ...data,
      SchoolName: schoolList.find(school => school.id === data.School)?.SchoolName,
      ClassName: classroomList.find(classroom => classroom.id === data.ClassRoom)?.ClassName,
    }).then(res => {
      console.log(res)
      if (res.success) {
        onBack()
      } else {
        message.error(res.msg)
      }
    })
  }

  const onValuesChange = (change: any) => {
    if (change.School) {
      setSelectedSchool(schoolList.find(school => school.id === change.School)?.SchoolName)
      form.resetFields(['ClassName'])
    }
  }

  return (
    <Card>
      <div style={{marginBottom: 24}}>
        <a onClick={onBack}>返回</a>
        <Divider type="vertical" />
        <span>增加 班级管理</span>
      </div>
      <ProForm
        form={form}
        layout="horizontal"
        labelAlign="left"
        labelCol={{span: 3}}
        wrapperCol={{span: 9}}
        onFinish={onFinish}
        onValuesChange={onValuesChange}
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
        <ProFormText name="CourseName" label="课程名称" required rules={[{
          required: true,
          message: '请输入课程名称'
        }]} />
        <ProFormSelect name="School" label="校区名称" required rules={[{
          required: true,
          message: '请选择校区'
        }]} options={schoolList.map(school => ({value: school.id, label: school.SchoolName}))} />
        <ProFormSelect name="ClassRoom" label="班级名称" required rules={[{
          required: true,
          message: '请输入班级名称'
        }]} options={classroomList.filter(classroom => classroom.SchoolName === selectedSchool).map(classroom => ({value: classroom.id, label: classroom.ClassName}))} />
        <ProFormDateTimePicker name="StartTime" label="上课时间" required rules={[{
          required: true,
          message: '请选择上课时间'
        }]} />
        <ProFormDigit name="Duration" label="课程时长" required rules={[{
          required: true,
          message: '请输入课程时长'
        }]} addonAfter='分钟' />
      </ProForm>
    </Card>
  )
}

export default NewCourse
