import ProForm, { ProFormCheckbox, ProFormText } from "@ant-design/pro-form"
import { Card, Col, Divider, Row, Space } from "antd"
import { useState } from "react"
import { useModel } from "umi"
import { SchoolItem } from "../data"
import { alterSchool } from "../service"

type AlterSchoolProps = {
  onBack: () => void;
  selectedSchoolList: SchoolItem[]
}

const AlterSchool = ({ onBack, selectedSchoolList }: AlterSchoolProps) => {

  const { courseMap } = useModel("dictModel")
  const [index, setIndex] = useState(0)

  const onFinish = (data: SchoolItem) => {
    return alterSchool({
      ...data,
      Subjects: data.Subjects.join(',')
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
        <span>修改 校区管理</span>
      </div>
      <ProForm
        initialValues={selectedSchoolList[index]}
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
        <ProFormText name="SchoolName" label="校区" required rules={[{
          required: true,
          message: '请输入校区'
        }]} />
        <ProFormText name="Area" label="地区" required rules={[{
          required: true,
          message: '请输入地区'
        }]} />
        <ProFormCheckbox.Group
          name="Subjects"
          label="授课科目"
          options={courseMap}
          required
        />
      </ProForm>
    </Card>
  )
}

export default AlterSchool