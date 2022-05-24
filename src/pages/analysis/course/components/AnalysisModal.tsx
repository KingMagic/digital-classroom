import { Card, Col, Divider, Modal, Rate, Row, Space } from "antd"
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more'
import Xrange from 'highcharts/modules/xrange'
import { useEffect, useState } from "react";

HighchartsMore(Highcharts)
Xrange(Highcharts)

type Props = {
  onCancel: () => void
}

const AnalysisModal = (props: Props) => {

  const { onCancel } = props
  const [bubbleOptions, setBubbleOptions] = useState<Highcharts.Options>()
  const [ganttOptions, setGanttOptions] = useState<Highcharts.Options>()
  const [activePieOptions, setActivePieOptions] = useState<Highcharts.Options>()

  useEffect(() => {
    setBubbleOptions({
      chart: {
        type: 'bubble',
        height: 200,
      },
      credits: {
        enabled: false
      },
      legend: {
        verticalAlign: 'top',
      },
      title: {
        text: '活跃度分析',
        align: 'left'
      },
      series: [{
        name:'思考',
        data: [[97, 36, 79], [94, 74, 60], [68, 76, 58], [64, 87, 56], [68, 27, 73], [74, 99, 42], [7, 93, 87], [51, 69, 40], [38, 23, 33], [57, 86, 31]]
      }, {
        name:'倾听',
        data: [[25, 10, 87], [2, 75, 59], [11, 54, 8], [86, 55, 93], [5, 3, 58], [90, 63, 44], [91, 33, 17], [97, 3, 56], [15, 67, 48], [54, 25, 81]]
      }, {
        name:'活跃',
        data: [[47, 47, 21], [20, 12, 4], [6, 76, 91], [38, 30, 60], [57, 98, 64], [61, 17, 80], [83, 60, 13], [67, 78, 75], [64, 12, 10], [30, 77, 82]]
      }],
      yAxis: {
        title: {
          align: 'high',
          rotation: 0,
          text: '情绪系数',
          x: 50,
          y: -10,
        }
      }
    })
  }, [])

  useEffect(() => {
    setGanttOptions({
      chart: {
        type: 'xrange',
        height: 200,
      },
      credits: {
        enabled: false
      },
      legend: {
        verticalAlign: 'top',
      },
      title: {
        text: '教学行为分析',
        align: 'left'
      },
      series: [{
        type: 'xrange',
        name: '项目1',
        borderColor: 'gray',
        pointWidth: 25,
        data: [{
          x: 0,
          x2: 20,
          y: 0,
        }, {
          x: 20,
          x2: 30,
          y: 1
        }, {
          x: 30,
          x2: 40,
          y: 2
        }],
        dataLabels: {
          enabled: true
        }
      }],
      yAxis: {
        categories: ['听讲', '练习', '讨论'],
        title: {
          align: 'high',
          rotation: 0,
          text: '课堂情景',
          x: 50,
          y: -10,
        }
      }
    })
  }, [])

  useEffect(() => {
    setActivePieOptions({
      chart: {
        height: 300,
      },
      credits: {
        enabled: false
      },
      series: [{
        type: 'pie',
        name: '项目1',
        data: [
          ['Firefox',   44.2],
          ['IE7',       26.6],
          ['IE6',       20],
          ['Chrome',    3.1],
          ['Other',    5.4]
        ],
        innerSize: '90%',
      }],
    })
  }, [])

  return (
    <Modal
      title="统计分析"
      onCancel={onCancel}
      visible
      width={1600}
    >
      <div>
        课堂信息：
      </div>
      <Row gutter={[8,8]}>
        <Col span={8}>
          <Card bodyStyle={{padding: 0}}>
            较活跃
            <Divider orientationMargin={0} /> 
            课堂气氛活跃程度<Rate value={4} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>课堂参与度</Card>
        </Col>
        <Col span={8}>
          <Card>授课类型</Card>
        </Col>
        <Col span={8}>
          <Card title="活跃度比率">
            <HighchartsReact
              highcharts={Highcharts}
              options={activePieOptions}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="行为/表情(人数)">课堂参与度</Card>
        </Col>
        <Col span={8}>
          <Card title="教学行为比率">
            <HighchartsReact
              highcharts={Highcharts}
              options={activePieOptions}
            />
          </Card>
        </Col>
      </Row>
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={bubbleOptions}
        />
      </div>
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={ganttOptions}
        />
      </div>
    </Modal>
  )
}

export default AnalysisModal