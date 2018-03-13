import * as React from 'react';
import * as echarts from 'echarts';

let option = {
  title: {
    text: 'ECharts 入门示例'
  },
  tooltip: {},
  legend: {
    data: ['销量']
  },
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
  },
  yAxis: {},
  series: [{
    name: '销量',
    type: 'bar',
    data: [5, 20, 36, 10, 10, 20]
  }]
};

export default class NormalPie extends React.Component {
  private chartEle: HTMLDivElement;
  private chart: echarts.ECharts;

  componentDidMount() {
    this.chart = echarts.init(this.chartEle);
    this.chart.setOption(option);
  }

  render() {
    return <div style={{ width: '100%', height: '100%' }} ref={(e) => this.chartEle = e}></div>;
  }
}