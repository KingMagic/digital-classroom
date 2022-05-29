import ProForm, { ProFormCheckbox, ProFormText } from "@ant-design/pro-form"
import { Card, Col, Divider, message, Row, Space } from "antd"
import { useModel } from 'umi';
import { SchoolItem } from "../data"
import { addSchool } from "../service"

type NewSchoolProps = {
  onBack: () => void
}

const NewSchool = ({ onBack }: NewSchoolProps) => {

  const { courseMap } = useModel("dictModel")
  
  const onFinish = (data: any) => {
    return addSchool({
      ...data,
      Subjects: data.Subjects.join(',')
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
        <span>增加 校区管理</span>
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
          rules={[{
            required: true,
            message: '请选择授课科目'
          }]}
        />
      </ProForm>
    </Card>
  )
}

export default NewSchool
