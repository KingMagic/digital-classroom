import { Card, Col, Divider, Modal, Rate, Row, Space } from 'antd';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more'
import Xrange from 'highcharts/modules/xrange'
import * as echarts from 'echarts';
import { useEffect, useRef, useState } from 'react';
import moment from 'moment';

HighchartsMore(Highcharts)
Xrange(Highcharts)

type Props = {
  onCancel: () => void
}

const AnalysisModal = (props: Props) => {

  const { onCancel } = props
  const activeRef = useRef<HTMLDivElement>(null)
  const [bubbleOptions, setBubbleOptions] = useState<Highcharts.Options>()
  const [ganttOptions, setGanttOptions] = useState<Highcharts.Options>()
  const [activePieOptions, setActivePieOptions] = useState<Highcharts.Options>()
  const [tempNumber, setTempNumber] = useState<number>(0)

  useEffect(() => {
    const clock = setInterval(() => {
      setTempNumber(Math.round(Math.random()*100))
    }, 3000)
    return () => clearInterval(clock)
  }, [])

  useEffect(() => {
    console.log(activeRef.current)
    if (activeRef.current) {
      const myChart = echarts.init(activeRef.current)
      myChart.setOption({
        title: {
          text: 'ECharts 入门示例'
        },
        series: [
          {
            type: 'treemap',
            breadcrumb: {
              show: false,
            },
            data: [{
              name: '江苏',
              children: [{
                name: '南京',
                value: 100,
              }, {
                name: '苏州',
                value: 150
,              }]
            }, {
              name: '浙江',
              children: [{
                name: '杭州',
                children: [{
                  name: '杭州A',
                  value: 100,
                }, {
                  name: '杭州B',
                  value: 200,
                }]
              }, {
                name: '宁波',
                value: 40,
              }]
            }, {
              name: '安徽',
              children: [{
                name: '合肥',
                value: 10,
              }, {
                name: '芜湖',
                value: 5
              }]
            }],
            upperLabel:{
              show: true,
              color: '#ffffff',
              height: 10,
              backgroundColor: '#333037'
            }
          }
        ]
      });
    }
  }, [activeRef.current])

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
        name:'举手次数',
        data: [[97, 36, 79], [94, 74, 60], [68, 76, 58], [64, 87, 56], [68, 27, 73], [74, 99, 42], [7, 93, 87], [51, 69, 40], [38, 23, 33], [57, 86, 31]]
      }, {
        name:'倾站立次数',
        data: [[25, 10, 87], [2, 75, 59], [11, 54, 8], [86, 55, 93], [5, 3, 58], [90, 63, 44], [91, 33, 17], [97, 3, 56], [15, 67, 48], [54, 25, 81]]
      }, {
        name:'趴桌时长',
        data: [[47, 47, 21], [20, 12, 4], [6, 76, 91], [38, 30, 60], [57, 98, 64], [61, 17, 80], [83, 60, 13], [67, 78, 75], [64, 12, 10], [30, 77, 82]]
      }, {
        name:'注视黑板',
        data: [[17, 57, 21], [29, 12, 4], [6, 45, 15], [8, 30, 36], [57, 9, 6], [16, 17, 8], [23, 14, 13], [7, 7, 75], [13, 26, 10], [3, 7, 82]]
      }],
      yAxis: {
        title: {
          align: 'high',
          rotation: 0,
          text: '',
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
        <Col span={6}>
          <Card title="举手次数"><span style={{fontSize: '48px', fontWeight: 'bold'}}>32</span>次</Card>
        </Col>
        <Col span={6}>
          <Card title="站立次数"><span style={{fontSize: '48px', fontWeight: 'bold'}}>15</span>次</Card>
        </Col>
        <Col span={6}>
          <Card title="趴桌比例"><span style={{fontSize: '48px', fontWeight: 'bold'}}>2</span>%</Card>
        </Col>
        <Col span={6}>
          <Card title="注视黑板"><span style={{fontSize: '48px', fontWeight: 'bold'}}>80</span>%</Card>
        </Col>
      </Row>
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={bubbleOptions}
        />
      </div>
    </Modal>
  )
}

export default AnalysisModal