import * as React from 'react';
import * as classNames from 'classnames';
import { shallowEqual } from '@lib/tools';
import { Controls, IChartOption, ISeriesItemTemplate, ChartType } from '@charts';
import { Spin } from 'antd';
import './style.styl';

let echarts: any;

export interface IChartConfig {
  option: IChartOption;
  readonly seriesItemTemplate: Readonly<ISeriesItemTemplate>;
  type: ChartType;
  mode: 'responsive' | 'absolute';
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
  onChartClick?: (e: React.MouseEvent<HTMLElement>, id: number) => void;
}

export class Chart extends React.Component<IChartProps, undefined> {
  constructor(props: IChartProps) {
    super(props);
    this.refreshChart = this.refreshChart.bind(this);
  }

  elRef: React.RefObject<HTMLDivElement> = React.createRef();
  chart: echarts.ECharts;

  refreshChart(props: IChartProps) {
    if (!this.chart)
      return;
    this.chart.dispose();
    const { width, height } = props.size;
    this.chart = echarts.init(this.elRef.current, '', { width, height });
  }

  async componentDidMount() {
    echarts = await import('echarts');
    const { size: { width, height }, option } = this.props;
    this.chart = echarts.init(this.elRef.current, '', { width, height });
    this.chart.setOption(option);
  }

  componentWillUnmount() {
    if (!this.chart)
      return;
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
    if (!this.chart)
      return;
    // fix chart not updated sometimes. setOption(,,true);
    this.chart.setOption(this.props.option, true, true);
  }

  render() {
    const { size, position, scale, index, isMask, onChartClick, id, mode } = this.props;
    const cls = classNames('chart-container', {
      'chart-container-mask': isMask
    });
    const transform = `scale(${scale.x},${scale.y})`;

    let positionType: any = 'relative';

    if (mode === 'absolute') {
      positionType = 'absolute';
    }

    return (
      <div
        onClick={onChartClick ? (e) => onChartClick(e, id) : null} className={cls}
        style={{ ...size, ...position, position: positionType, transform, zIndex: index }} ref={this.elRef}>
        <Spin className='chart_loading' />
      </div >
    );
  }
}