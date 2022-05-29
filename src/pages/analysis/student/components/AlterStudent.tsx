import ProForm, { ProFormCheckbox, ProFormDigit, ProFormRadio, ProFormSelect, ProFormText, ProFormUploadButton } from "@ant-design/pro-form"
import { Card, Col, Divider, Row, Space } from "antd"
import { useEffect, useState } from "react"
import { useModel } from "umi"
import { ClassRoomItem } from "../../classroom/data"
import { getClassRoomList } from "../../classroom/service"
import { SchoolItem } from "../../school/data"
import { getSchoolList } from "../../school/service"
import { StudentItem } from "../data"
import { alterStudent } from "../service"

type AlterStudentProps = {
  onBack: () => void;
  selectedStudent: StudentItem | undefined
}

const AlterStudent = ({ onBack, selectedStudent }: AlterStudentProps) => {

 
  const { courseMap, genderMap, roleMap } = useModel("dictModel")
  const [schoolList, setSchoolList] = useState<SchoolItem[]>([])
  const [classRoomList, setClassRoomList] = useState<ClassRoomItem[]>([])

  useEffect(() => {
    console.log('selectedStudent', selectedStudent)
    getSchoolList().then(res => {
      setSchoolList(res.data)
    })
    getClassRoomList().then(res => {
      setClassRoomList(res.data)
    })
  }, [])

  const onFinish = (data: StudentItem) => {
    return alterStudent({
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
        <span>修改 教师管理</span>
      </div>
      <ProForm
        initialValues={selectedStudent}
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
        <ProFormDigit name="StudentID" label="职工号" required rules={[{
          required: true,
          message: '请输入职工号'
        }]} />
        <ProFormText name="Name" label="姓名" required rules={[{
          required: true,
          message: '请输入姓名'
        }]} />
        <ProFormSelect name="SchoolName" label="校区名称" required rules={[{
          required: true,
          message: '请选择校区'
        }]} options={schoolList.map(school => ({value: school.SchoolName, label: school.SchoolName}))} />
        <ProFormSelect name="ClassName" label="班级名称" required rules={[{
          required: true,
          message: '请选择班级'
        }]} options={classRoomList.map(classRoom => ({value: classRoom.ClassName, label: classRoom.ClassName}))} />
        <ProFormCheckbox.Group
          name="Role"
          label="角色"
          options={roleMap}
          required
          rules={[{
            required: true,
            message: '请选择角色'
          }]}
        />
        <ProFormCheckbox.Group
          name="Course"
          label="授课科目"
          options={courseMap}
          required
          rules={[{
            required: true,
            message: '请选择授课科目'
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
        <ProFormText name="PassPort" label="账号" required rules={[{
          required: true,
          message: '请输入账号'
        }]} />
        <ProFormUploadButton
          name="Avatar"
          label="头像"
        />
      </ProForm>
    </Card>
  )
}

export default AlterStudent