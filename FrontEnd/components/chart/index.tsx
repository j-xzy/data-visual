import * as React from 'react';
import * as classNames from 'classnames';
import { shallowEqual } from '@lib/tools';
import { Controls, IChartOption } from '@lib/chart';
import './style.styl';

const loading = require('../../assets/image/loading.gif');

let echarts: any;

export interface IChartConfig {
  option: IChartOption;
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
  controls: Controls;
  id: number;
}

export interface IChartProps extends IChartConfig {
  key: number;
  index: number;
  isMask: boolean;
  onChartClick: (e: React.MouseEvent<HTMLElement>, id: number) => void;
}

export class Chart extends React.Component<IChartProps, undefined> {
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

  shouldComponentUpdate(nextProps: IChartProps) {
    const { option: nextOption, ...next } = nextProps;
    const { option, ...cur } = this.props;
    if (!shallowEqual(next, cur)) {
      return true;
    }

    if (!shallowEqual(nextOption, option)) {
      return true;
    }

    return false;
  }

  componentDidUpdate(preProps: IChartProps) {
    const { size: { width, height } } = preProps;
    if (height !== this.props.size.height || width !== this.props.size.width) {
      this.refreshChart(this.props);
    }
    // fix chart not updated sometimes. setOption(,,true);
    this.chart.setOption(this.props.option, true, true);
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
        <img src={loading} className='chart_loading' />
      </div >
    );
  }
}