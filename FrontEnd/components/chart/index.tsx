import * as React from 'react';
import * as echarts from 'echarts';

import './style.styl';

export interface IChartProps {
  option: object;
  top: string;
  left: string;
  width: string;
  height: string;
  key: number;
}

export class Chart extends React.Component<IChartProps, undefined> {
  constructor(props: IChartProps) {
    super(props);
  }

  element: HTMLDivElement;
  chart: echarts.ECharts;

  componentDidMount() {
    this.chart = echarts.init(this.element);
    this.chart.setOption(this.props.option);
  }

  render() {
    let { width, height, top, left } = this.props;
    top = parseFloat(top) - parseFloat(height) / 2 + 'px';
    left = parseFloat(left) - parseFloat(width) / 2 + 'px';
    return (
      <div
        className='chart-container'
        style={{ width, height, top, left }} ref={(e) => this.element = e}>
      </div>
    );
  }
}