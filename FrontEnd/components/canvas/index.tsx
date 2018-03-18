import * as React from 'react';
import update from 'immutability-helper';
import { DropTarget, DropTargetConnector, DropTargetMonitor, ConnectDropTarget } from 'react-dnd';
import { PREVIEW_CHART } from '@lib/dragtype';
import { IDraggableChartPreivewResult } from '@components/draggable-chart-preview';
import { IChartProps, IChartConfig, Chart } from '@components/chart';
import './style.styl';

export interface ICanvasProps {
  width: string;
  height: string;
  canvasScale: number;
  connectDropTarget?: ConnectDropTarget;
}

type Coordinate = {
  x: number;
  y: number;
};

export interface IMoveChart {
  (id: number, coordinate: Coordinate): void;
}

export interface IMoveDone {
  (id: number): void;
}

interface ICanvasState {
  charts: {
    [id: string]: IChartProps
  };
}

const DEFAULT_WIDTH = '300px';
const DEFAULT_HEIGHT = '300px';

export class RawCanvas extends React.Component<ICanvasProps, ICanvasState> {
  constructor(props: ICanvasProps) {
    super(props);
    this.appendChart = this.appendChart.bind(this);
    this.moveChart = this.moveChart.bind(this);
    this.getChartPotionByCanvas = this.getChartPotionByCanvas.bind(this);
    this.moveDone = this.moveDone.bind(this);
    this.moveStart = this.moveStart.bind(this);
    this.renderCharts = this.renderCharts.bind(this);
    this.state = {
      charts: {}
    };
  }

  canvasDiv: HTMLDivElement;
  chartUid = 0;
  curChartZIndex: number;

  async appendChart(option: object, left: string, top: string) {
    const id = this.chartUid++;
    const zIndex = Object.keys(this.state.charts).length;
    let props: IChartProps = {
      option, id: id, key: id,
      size: { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT },
      position: { left, top, zIndex },
      moveChart: this.moveChart,
      moveDone: this.moveDone,
      moveStart: this.moveStart
    };
    this.setState((preState) => update(preState, {
      charts: { [id]: { $set: props } }
    }));
  }

  renderCharts() {
    const charts = this.state.charts;
    return Object.keys(charts).map((key) => {
      const props = charts[key];
      return <Chart {...props} />;
    });
  }

  getChartPotionByCanvas(clientX: number, clientY: number) {
    let { left, top } = this.canvasDiv.getBoundingClientRect();
    const { canvasScale } = this.props;
    left = (clientX - left) / canvasScale;
    top = (clientY - top) / canvasScale;
    return { left, top };
  }

  moveStart(id: number) {
    this.curChartZIndex = this.state.charts[id].position.zIndex;
  }

  moveChart(id: number, position: Coordinate) {
    const { left, top } = this.getChartPotionByCanvas(position.x, position.y);
    const { charts } = this.state;
    const topZIndex = Object.keys(charts).length + 1;
    this.setState((preState) =>
      update(preState, {
        charts: {
          [id]: {
            position: {
              $merge: {
                zIndex: topZIndex,
                left, top
              }
            }
          }
        }
      }));
  }

  moveDone(id: number) {
    this.setState(
      update(this.state, {
        charts: {
          [id]: {
            position: { zIndex: { $set: this.curChartZIndex } }
          }
        }
      }));
  }

  render() {
    const { width, height, canvasScale, connectDropTarget } = this.props;
    const { charts } = this.state;
    return connectDropTarget(
      <div className='canvas_container' style={{ width, height, transform: `scale(${canvasScale})` }}>
        <div className='canvas' ref={(e) => this.canvasDiv = e}>
          {this.renderCharts()}
        </div>
      </div>
    );
  }
}

const boxTarget = {
  drop(pros: ICanvasProps, monitor: DropTargetMonitor, component: RawCanvas) {
    if (monitor.getItemType() === PREVIEW_CHART) {
      const item = monitor.getItem() as IDraggableChartPreivewResult;
      const { x, y } = monitor.getClientOffset();
      let { left, top } = component.getChartPotionByCanvas(x, y);
      component.appendChart(item.option, left + 'px', top + 'px');
      return;
    }
  }
};

function collect(connect: DropTargetConnector, monitor: DropTargetMonitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

export const Canvas = DropTarget<ICanvasProps>([PREVIEW_CHART], boxTarget, collect)(RawCanvas);