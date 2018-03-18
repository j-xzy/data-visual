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
  moveStart: IMoveChartDone;
  moveChart: IMoveChart;
  moveDone: IMoveChartDone;
  chartClick: IMoveChartDone;
}

export class Chart extends React.PureComponent<IChartProps, undefined> {
  constructor(props: IChartProps) {
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  element: HTMLDivElement;
  chart: echarts.ECharts;
  canDrag = false;

  handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    this.props.moveStart(this.props.id);
    this.canDrag = true;
  }

  handleMouseUp(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    this.canDrag = false;
    this.props.moveDone(this.props.id);
  }

  handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    if (!this.canDrag) return;
    const position = {
      x: e.clientX,
      y: e.clientY
    };
    this.props.moveChart(this.props.id, position);
  }

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
      <div onMouseDown={(e) => this.handleMouseDown(e)}
        onMouseMove={(e) => this.handleMouseMove(e)}
        onMouseUp={(e) => this.handleMouseUp(e)}
        onClick={this.handleClick}
        className='chart-container'
        style={{ width, height, left, top, zIndex, position: 'absolute' }} ref={(e) => this.element = e}>
      </div >
    );
  }
}