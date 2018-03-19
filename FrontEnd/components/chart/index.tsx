import * as React from 'react';
import { IMoveChart, IMoveChartDone } from '@components/canvas';

export interface IChartConfig {
  option: object;
  size: {
    width: string;
    height: string;
  };
  position: {
    left: string;
    top: string;
    zIndex: number;
  };
}

export interface IChartProps extends IChartConfig {
  key?: number;
  id: number;
  chartClick: (id: number) => void;
}

export class Chart extends React.PureComponent<IChartProps, undefined> {
  constructor(props: IChartProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  element: HTMLDivElement;
  chart: echarts.ECharts;

  handleClick() {
    this.props.chartClick(this.props.id);
  }

  async componentDidMount() {
    let echarts = await import('echarts');
    this.chart = echarts.init(this.element);
    this.chart.setOption(this.props.option);
  }

  render() {
    let { size: { width, height }, position: { left, top, zIndex } } = this.props;
    left = parseFloat(left) - parseFloat(width) / 2 + 'px',
      top = parseFloat(top) - parseFloat(height) / 2 + 'px';
    return (
      <div
        onClick={this.handleClick}
        className='chart-container'
        style={{ width, height, left, top, zIndex, position: 'absolute' }} ref={(e) => this.element = e}>
      </div >
    );
  }
}