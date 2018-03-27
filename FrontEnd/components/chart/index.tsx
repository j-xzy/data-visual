import * as React from 'react';

let echarts: any;

export interface IChartBaseConfig {
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
  };
  imgSrc: string;
}

export interface IChartConfig extends IChartBaseConfig {
  id: number;
}

export interface IChartProps extends IChartBaseConfig {
  key: number;
  index: number;
  onChartClick: (id: number) => void;
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
    this.props.onChartClick(this.props.index);
  }

  refreshChart(nextProps: IChartProps) {
    this.chart.dispose();
    const { width, height } = nextProps.size;
    this.chart = echarts.init(this.element, '', { width, height });
    this.chart.setOption(nextProps.option);
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

  componentWillReceiveProps(nextProps: IChartProps) {
    if (nextProps.size !== this.props.size) {
      this.refreshChart(nextProps);
    }
  }

  render() {
    const { size, position, scale, index } = this.props;
    const transform = `scale(${scale.x},${scale.y})`;
    return (
      <div
        onClick={this.handleClick}
        className='chart-container'
        style={{ ...size, ...position, position: 'absolute', transform, zIndex: index }} ref={(e) => this.element = e}>
      </div >
    );
  }
}