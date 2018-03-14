import * as React from 'react';
import { DropTarget, DropTargetConnector, DropTargetMonitor, ConnectDropTarget } from 'react-dnd';
import { PREVIEW_CHART } from '@lib/dragtype';
import { IChartPreview, pieList } from '@lib/chart';
import ChartContainer from '@components/chart-container';
import './style.styl';

export interface ICanvasProps {
  width: string;
  height: string;
  canvasScale: number;
  connectDropTarget?: ConnectDropTarget;
}

interface ICanvasState {
  charts: any[];
}

export class RawCanvas extends React.Component<ICanvasProps, ICanvasState> {
  constructor(props: ICanvasProps) {
    super(props);
    this.state = {
      charts: []
    };
  }

  async appendChart(getChart: () => Promise<any>) {
    const { default: Chart } = await getChart();
    const component = (
      <ChartContainer>
        <Chart />
      </ChartContainer>
    );
    this.setState((preState) => {
      return {
        charts: [...preState.charts, component]
      };
    });
  }

  renderCharts() {
    const charts = this.state.charts;
    const els: any[] = [];
    charts.forEach((Chart, idx) => {
      els.push(Chart);
    });
    return els;
  }

  render() {
    const { width, height, canvasScale, connectDropTarget } = this.props;
    return connectDropTarget(
      <div className='canvas_container' style={{ width, height, transform: `scale(${canvasScale})` }}>
        <div className='canvas'>
          {this.renderCharts()}
        </div>
      </div>
    );
  }
}

const boxTarget = {
  drop(pros: ICanvasProps, monitor: DropTargetMonitor, component: RawCanvas) {
    const item = monitor.getItem() as IChartPreview;
    component.appendChart(item.getChartAsync);
  }
};

function collect(connect: DropTargetConnector, monitor: DropTargetMonitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

export const Canvas = DropTarget<ICanvasProps>(PREVIEW_CHART, boxTarget, collect)(RawCanvas);