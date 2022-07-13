import { Card, Col, Modal, Row } from 'antd';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import noData from 'highcharts/modules/no-data-to-display'
import { useEffect, useState } from 'react';
import type { CourseItem } from '../data';
import { getChart } from '../service';

noData(Highcharts)

type Props = {
  currentCourse: CourseItem;
  onCancel: () => void;
}

const defaultOption: Highcharts.Options = {
  credits: {
    enabled: false
  },
  title: {
    text: ''
  },
  chart: {
    spacing: [40,0,0,0]
  },
  noData: {
    position: {
      align: 'center',
      verticalAlign: 'middle'
    }
  },
  lang: {
    noData: '暂无数据'
  }
}

const AnalysisModal = (props: Props) => {

  const { currentCourse, onCancel } = props
  const [options, setOptions] = useState<Highcharts.Options>(defaultOption)

  useEffect(() => {
    getChart({Course: currentCourse.id}).then(res => {
      if (res.success && res.data) {
        console.log(res.data)
        setOptions({
          ...options,
          xAxis: [{
            categories: res.data.map((item: any) => item.LineTime),
            title: {
              text: '分钟',
              align: 'high',
              x: 30,
              y: -20,
            }
          }],
          yAxis: [{
            title: {
              text: '举手次数',
              align: 'high',
              rotation: 0,
              x: 50,
              y: -20,
            },
            allowDecimals: false,
            opposite: false,
            offset: 0,
          }, {
            title: {
              text: '站立次数',
              align: 'high',
              rotation: 0,
              x: 50,
              y: -20,
            },
            allowDecimals: false,
            opposite: false,
            offset: 50,
          }, {
            title: {
              text: '趴桌比例(%)',
              align: 'high',
              rotation: 0,
              x: -50,
              y: -20,
            },
            opposite: true,
            offset: 0,
          }, {
            title: {
              text: '注视黑板(%)',
              align: 'high',
              rotation: 0,
              x: -50,
              y: -20,
            },
            opposite: true,
            offset: 70,
          }],
          tooltip: {
            shared: true
          },
          series: [{
            name: '举手次数',
            type: 'spline',
            yAxis: 0,
            data: res.data.map((item: any) => item.RaiseHandNum)
          }, {
            name: '站立次数',
            type: 'spline',
            yAxis: 1,
            data: res.data.map((item: any) => item.StandNum)
          }, {
            name: '趴桌比例',
            type: 'spline',
            yAxis: 2,
            data: res.data.map((item: any) => Math.round(item.LyingTableNum*100)),
            tooltip: {
              valueSuffix: '%'
            }
          }, {
            name: '注视黑板',
            type: 'spline',
            yAxis: 3,
            data: res.data.map((item: any) => Math.round(item.BlackboardNum*100)),
            tooltip: {
              valueSuffix: '%'
            }
          }]
        })
      }
    })
  }, [currentCourse.id])

  return (
    <Modal
      title="统计分析"
      onCancel={onCancel}
      visible
      width={1600}
      footer={null}
    >
      <Row gutter={[8,8]}>
        <Col span={6}>
          <Card title="举手次数" style={{textAlign: 'center'}}><span style={{fontSize: '48px', fontWeight: 'bold'}}>{currentCourse.RaiseHandNum}</span>次</Card>
        </Col>
        <Col span={6}>
          <Card title="站立次数" style={{textAlign: 'center'}}><span style={{fontSize: '48px', fontWeight: 'bold'}}>{currentCourse.StandNum}</span>次</Card>
        </Col>
        <Col span={6}>
          <Card title="趴桌比例" style={{textAlign: 'center'}}><span style={{fontSize: '48px', fontWeight: 'bold'}}>{Number(currentCourse.LyingTableNum)*100}</span>%</Card>
        </Col>
        <Col span={6}>
          <Card title="注视黑板" style={{textAlign: 'center'}}><span style={{fontSize: '48px', fontWeight: 'bold'}}>{Number(currentCourse.BlackboardNum)*100}</span>%</Card>
        </Col>
      </Row>
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
        />
      </div>
    </Modal>
  )
}

export default AnalysisModal