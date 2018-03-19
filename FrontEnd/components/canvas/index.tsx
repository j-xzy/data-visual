import * as React from 'react';
import update from 'immutability-helper';
import { DropTarget, DropTargetConnector, DropTargetMonitor, ConnectDropTarget } from 'react-dnd';
import { PREVIEW_CHART } from '@lib/dragtype';
import { IDraggableChartPreivewResult } from '@components/draggable-chart-preview';
import { IChartProps, Chart } from '@components/chart';
import { TransformTool, SideType } from '@components/transform-tool';

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

export interface IMoveTransformTool {
  (type: SideType, position: Coordinate, clientRect: ClientRect): void;
}

export interface IMoveChart {
  (id: number, coordinate: Coordinate): void;
}

export interface IMoveChartDone {
  (id: number): void;
}

interface ICanvasState {
  charts: {
    [id: string]: IChartProps
  };
  isShowTransformTool: boolean;
}

const DEFAULT_WIDTH = '300px';
const DEFAULT_HEIGHT = '300px';
const NO_CHOOSE_CHART = -1;

export class RawCanvas extends React.Component<ICanvasProps, ICanvasState> {
  constructor(props: ICanvasProps) {
    super(props);
    this.appendChart = this.appendChart.bind(this);
    this.getPotionByCanvas = this.getPotionByCanvas.bind(this);
    this.renderCharts = this.renderCharts.bind(this);
    this.chartClick = this.chartClick.bind(this);
    this.renderTransformTool = this.renderTransformTool.bind(this);
    this.handleTransformMouseDown = this.handleTransformMouseDown.bind(this);

    this.state = {
      charts: {},
      isShowTransformTool: false
    };
  }

  sideType: SideType;
  canvasDiv: HTMLDivElement;
  currentLastChartZIndex: number;
  chartUid = 0;
  currentChartId = NO_CHOOSE_CHART;

  async appendChart(option: object, left: string, top: string) {
    const id = this.chartUid++;
    const zIndex = Object.keys(this.state.charts).length;
    let props: IChartProps = {
      option, id: id, key: id,
      size: { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT },
      position: { left, top, zIndex },
      chartClick: this.chartClick
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

  getPotionByCanvas(clientX: number, clientY: number) {
    let { left, top } = this.canvasDiv.getBoundingClientRect();
    const { canvasScale } = this.props;
    left = (clientX - left) / canvasScale;
    top = (clientY - top) / canvasScale;
    return { left, top };
  }

  moveChartStart(id: number) {
    this.currentLastChartZIndex = this.state.charts[id].position.zIndex;
  }

  chartClick(id: number) {
    this.currentLastChartZIndex = this.state.charts[id].position.zIndex;
    this.currentChartId = id;
    const zIndex = Object.keys(this.state.charts).length + 1;
    this.setState((preState) => update(preState, {
      charts: {
        [id]: {
          position: {
            zIndex: {
              $set: zIndex
            }
          }
        }
      },
      isShowTransformTool: { $set: true }
    }));
  }

  handleTransformMouseDown(type: SideType) {
    this.sideType = type;
  }

  renderTransformTool() {
    const { isShowTransformTool, charts } = this.state;
    const { position, size } = charts[this.currentChartId];
    return <TransformTool position={position} size={size} handleTransformMouseDown={this.handleTransformMouseDown} />;
  }

  render() {
    const { width, height, canvasScale, connectDropTarget } = this.props;
    return connectDropTarget(
      <div className='canvas_container' style={{ width, height, transform: `scale(${canvasScale})` }}>
        <div className='canvas' ref={(e) => this.canvasDiv = e}>
          {this.renderCharts()}
        </div>
        {this.state.isShowTransformTool && this.renderTransformTool()}
      </div>
    );
  }
}

const boxTarget = {
  drop(pros: ICanvasProps, monitor: DropTargetMonitor, component: RawCanvas) {
    if (monitor.getItemType() === PREVIEW_CHART) {
      const item = monitor.getItem() as IDraggableChartPreivewResult;
      const { x, y } = monitor.getClientOffset();
      let { left, top } = component.getPotionByCanvas(x, y);
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