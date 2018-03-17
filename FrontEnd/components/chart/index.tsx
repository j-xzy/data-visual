import * as React from 'react';
import { IMoveChart, IMoveDone } from '@components/canvas';

export interface IChartProps {
  option: object;
  size: {
    width: string;
    height: string;
  };
  position: {
    left: string;
    top: string;
  };
  zIndex: number;
  key?: number;
  id: number;
  moveStart: IMoveDone;
  moveChart: IMoveChart;
  moveDone: IMoveDone;
}

type OriginXY = {
  x: number;
  y: number;
};

export class Chart extends React.Component<IChartProps, undefined> {
  constructor(props: IChartProps) {
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
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

  async componentDidMount() {
    let echarts = await import('echarts');
    this.chart = echarts.init(this.element);
    this.chart.setOption(this.props.option);
  }

  render() {
    let { size: { width, height }, position: { left, top }, moveChart, id, zIndex } = this.props;
    left = parseFloat(left) - parseFloat(width) / 2 + 'px',
      top = parseFloat(top) - parseFloat(height) / 2 + 'px';
    return (
      <div onMouseDown={(e) => this.handleMouseDown(e)}
        onMouseMove={(e) => this.handleMouseMove(e)}
        onMouseUp={(e) => this.handleMouseUp(e)}
        className='chart-container'
        style={{ width, height, left, top, zIndex, position: 'absolute' }} ref={(e) => this.element = e}>
      </div >
    );
  }
}