import * as React from 'react';
import * as echarts from 'echarts';

let option = {
  tooltip: {},
  legend: {
    data: ['销量']
  },
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫']
  },
  yAxis: {},
  series: [{
    name: '销量',
    type: 'bar',
    data: [5, 20, 36]
  }]
};

export default class NormalBar extends React.Component {
  private chartEle: HTMLDivElement;
  private chart: echarts.ECharts;

  componentDidMount() {
    this.chart = echarts.init(this.chartEle);
    this.chart.setOption(option);
  }

  render() {
    return <div style={{ width: '200px', height: '200px' }} ref={(e) => this.chartEle = e}></div>;
  }
}