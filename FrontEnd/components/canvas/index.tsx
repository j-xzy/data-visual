import * as React from 'react';
import { DropTarget, DropTargetConnector, DropTargetMonitor, ConnectDropTarget } from 'react-dnd';
import { PREVIEW_CHART, CHART } from '@lib/dragtype';
import { IDraggableChartPreivew } from '@components/draggable-chart-preview';
import { IChartProps } from '@components/chart';
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

const DEFAULT_WIDTH = '300px';
const DEFAULT_HEIGHT = '300px';

export class RawCanvas extends React.Component<ICanvasProps, ICanvasState> {
  constructor(props: ICanvasProps) {
    super(props);
    this.state = {
      charts: []
    };
  }

  canvasDiv: HTMLDivElement;
  chartUid = 0;

  async appendChart(option: object, left: string, top: string) {
    this.chartUid++;

    const { DraggableChart: Chart } = await import('@components/draggable-chart');
    let props: IChartProps = {
      option,
      left,
      top,
      key: this.chartUid,
      height: DEFAULT_HEIGHT,
      width: DEFAULT_WIDTH
    };
    this.setState(({ charts }) => {
      return {
        charts: [...charts, React.createElement(Chart, props)]
      };
    });
  }

  render() {
    const { width, height, canvasScale, connectDropTarget } = this.props;
    return connectDropTarget(
      <div className='canvas_container' style={{ width, height, transform: `scale(${canvasScale})` }}>
        <div className='canvas' ref={(e) => this.canvasDiv = e}>
          {[...this.state.charts]}
        </div>
      </div>
    );
  }
}

const boxTarget = {
  drop(pros: ICanvasProps, monitor: DropTargetMonitor, component: RawCanvas) {
    const item = monitor.getItem() as IDraggableChartPreivew;
    const { x, y } = monitor.getClientOffset();
    let { left, top } = component.canvasDiv.getBoundingClientRect();
    left = x - left, top = y - top;
    component.appendChart(item.option, left + 'px', top + 'px');
  }
};

function collect(connect: DropTargetConnector, monitor: DropTargetMonitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

export const Canvas = DropTarget<ICanvasProps>([PREVIEW_CHART, CHART], boxTarget, collect)(RawCanvas);