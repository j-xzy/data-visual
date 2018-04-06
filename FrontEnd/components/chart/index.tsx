import * as React from 'react';
import * as classNames from 'classnames';

import './style.styl';

let echarts: any;

export interface IChartConfig {
  option: any;
  scale: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  position: {
    left: number;
    top: number;
  };
  colorFromGlobal: boolean;
  imgSrc: string;
  id: number;
}

export interface IChartProps extends IChartConfig {
  key: number;
  index: number;
  isMask: boolean;
  onChartClick: (e: React.MouseEvent<HTMLElement>, id: number) => void;
}

export class Chart extends React.PureComponent<IChartProps, undefined> {
  constructor(props: IChartProps) {
    super(props);
    this.refreshChart = this.refreshChart.bind(this);
  }

  element: HTMLDivElement;
  chart: echarts.ECharts;

  refreshChart(props: IChartProps) {
    this.chart.dispose();
    const { width, height } = props.size;
    this.chart = echarts.init(this.element, '', { width, height });
  }

  async componentDidMount() {
    echarts = await import('echarts');
    const { size: { width, height }, option } = this.props;
    this.chart = echarts.init(this.element, '', { width, height });
    this.chart.setOption(option);
  }

  componentWillUnmount() {
    this.chart.dispose();
  }

  componentDidUpdate(preProps: IChartProps) {
    const { size: { width, height }, option } = preProps;
    if (height !== this.props.size.height || width !== this.props.size.width) {
      this.refreshChart(this.props);
    }
    this.chart.setOption(option);
  }

  render() {
    const { size, position, scale, index, isMask, onChartClick, id } = this.props;
    const cls = classNames('chart-container', {
      'chart-container-mask': isMask
    });
    const transform = `scale(${scale.x},${scale.y})`;
    return (
      <div
        onClick={(e) => onChartClick(e, id)}
        className={cls}
        style={{ ...size, ...position, position: 'absolute', transform, zIndex: index }} ref={(e) => this.element = e}>
      </div >
    );
  }
}