import * as React from 'react';
import * as echarts from 'echarts';

export interface IChartProps {
  option: object;
  width: string;
  height: string;
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
    let { width, height } = this.props;
    return (
      <div
        className='chart-container'
        style={{ width, height }} ref={(e) => this.element = e}>
      </div>
    );
  }
}