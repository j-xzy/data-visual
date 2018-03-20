import * as React from 'react';
import './style.styl';

let echarts: any;

export interface IChartConfig {
  option: object;
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
    this.refreshChart = this.refreshChart.bind(this);
  }

  element: HTMLDivElement;
  chart: echarts.ECharts;

  handleClick() {
    this.props.chartClick(this.props.id);
  }

 refreshChart(nextProps: IChartConfig) {
    this.chart.dispose();
    const { width, height } = nextProps.size;
    this.chart = echarts.init(this.element, '', { width, height });
    this.chart.setOption(this.props.option);
  }

  async componentDidMount() {
    echarts = await import('echarts');
    const { width, height } = this.props.size;
    this.chart = echarts.init(this.element, '', { width, height });
    this.chart.setOption(this.props.option);
  }

  componentWillUnmount() {
    this.chart.dispose();
  }

  componentWillReceiveProps(nextProps: IChartConfig) {
    if (nextProps.size !== this.props.size) {
      this.refreshChart(nextProps);
    }
  }

  render() {
    const { size, position, scale } = this.props;
    const transform = `scale(${scale.x},${scale.y})`;
    return (
      <div
        onClick={this.handleClick}
        className='chart-container'
        style={{ ...size, ...position, position: 'absolute', transform }} ref={(e) => this.element = e}>
      </div >
    );
  }
}