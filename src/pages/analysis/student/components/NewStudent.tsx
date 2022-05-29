import ProForm, { ProFormCheckbox, ProFormDigit, ProFormRadio, ProFormSelect, ProFormText, ProFormUploadButton } from "@ant-design/pro-form"
import { Card, Col, Divider, message, Row, Space } from "antd"
import { useEffect, useState } from "react";
import { useModel } from 'umi';
import { ClassRoomItem } from "../../classroom/data";
import { getClassRoomList } from "../../classroom/service";
import { SchoolItem } from "../../school/data";
import { getSchoolList } from "../../school/service";
import { StudentItem } from "../data"
import { addStudent } from "../service"

type NewStudentProps = {
  onBack: () => void
}

const NewStudent = ({ onBack }: NewStudentProps) => {

  const { columnMap, genderMap, rowMap } = useModel("dictModel")
  const [schoolList, setSchoolList] = useState<SchoolItem[]>([])
  const [classRoomList, setClassRoomList] = useState<ClassRoomItem[]>([])

  useEffect(() => {
    getSchoolList().then(res => {
      setSchoolList(res.data)
    })
    getClassRoomList().then(res => {
      setClassRoomList(res.data)
    })
  }, [])
  
  const onFinish = (data: any) => {
    return addStudent({
      ...data
    }).then(res => {
      console.log(res)
      if (res.success) {
        onBack()
      } else {
        message.error(res.errMsg)
      }
    })
  }
  return (
    <Card>
      <div>
        <a onClick={onBack}>返回</a>
        <Divider type="vertical" />
        <span>增加 学生管理</span>
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
        <ProFormDigit name="StudentID" label="学号" required rules={[{
          required: true,
          message: '请输入学号'
        }]} />
        <ProFormText name="StudentName" label="姓名" required rules={[{
          required: true,
          message: '请输入姓名'
        }]} />
        <ProFormUploadButton
          name="Avatar"
          label="头像"
        />
        <ProFormSelect name="SchoolName" label="校区名称" required rules={[{
          required: true,
          message: '请选择校区'
        }]} options={schoolList.map(school => ({value: school.SchoolName, label: school.SchoolName}))} />
        <ProFormSelect name="ClassName" label="班级名称" required rules={[{
          required: true,
          message: '请选择班级'
        }]} options={classRoomList.map(classRoom => ({value: classRoom.ClassName, label: classRoom.ClassName}))} />
        <ProFormRadio.Group
          name="Row"
          label="座位行"
          options={rowMap}
          required
          rules={[{
            required: true,
            message: '请选择性别'
          }]}
        />
        <ProFormRadio.Group
          name="Line"
          label="座位列"
          options={columnMap}
          required
          rules={[{
            required: true,
            message: '请选择性别'
          }]}
        />
        <ProFormRadio.Group
          name="Gender"
          label="性别"
          options={genderMap}
          required
          rules={[{
            required: true,
            message: '请选择性别'
          }]}
        />
      </ProForm>
    </Card>
  )
}

export default NewStudent
