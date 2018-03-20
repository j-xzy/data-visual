import * as React from 'react';
import update from 'immutability-helper';
import { DropTarget, DropTargetConnector, DropTargetMonitor, ConnectDropTarget } from 'react-dnd';
import { PREVIEW_CHART } from '@lib/dragtype';
import { IDraggableChartPreivewResult } from '@components/draggable-chart-preview';
import { IChartProps, Chart } from '@components/chart';
import { TransformTool, SideType } from '@components/transform-tool';

import './style.styl';

export interface ICanvasProps {
  width: number;
  height: number;
  onWheel: (e: React.WheelEvent<HTMLDivElement>) => void;
  canvasScale: number;
  connectDropTarget?: ConnectDropTarget;
  isShowTransformTool: boolean;
  onChartClick: () => void;
}

type Coordinate = {
  x: number;
  y: number;
};

interface ICanvasState {
  charts: {
    [id: string]: IChartProps
  };
  transformTool: {
    position: {
      left: number;
      top: number;
    };
    size: {
      width: number;
      height: number;
    };
  };
}

const DEFAULT_WIDTH = 300;
const DEFAULT_HEIGHT = 300;
const CHART_MINI_SIZE = {
  width: 20,
  height: 20
};

export class RawCanvas extends React.Component<ICanvasProps, ICanvasState> {
  constructor(props: ICanvasProps) {
    super(props);
    this.getPotionByCanvas = this.getPotionByCanvas.bind(this);
    this.appendChart = this.appendChart.bind(this);
    this.renderCharts = this.renderCharts.bind(this);
    this.chartClick = this.chartClick.bind(this);
    this.renderTransformTool = this.renderTransformTool.bind(this);
    this.handleTransformMouseDown = this.handleTransformMouseDown.bind(this);
    this.handleCanvasMouseUp = this.handleCanvasMouseUp.bind(this);
    this.handleCanvasMouseMove = this.handleCanvasMouseMove.bind(this);
    this.handleCanvasMouseDown = this.handleCanvasMouseDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      charts: {},
      transformTool: {
        position: { left: 0, top: 0 },
        size: { width: 0, height: 0 }
      }
    };
  }

  canvasDiv: HTMLDivElement;
  mouseDownPosition: Coordinate;
  chartSnapShot: IChartProps;
  chartUid = 0;
  sideType = SideType.None;

  async appendChart(option: object, left: number, top: number) {
    const id = this.chartUid++;
    const zIndex = Object.keys(this.state.charts).length;
    left = left - DEFAULT_WIDTH / 2,
      top = top - DEFAULT_HEIGHT / 2;
    let props: IChartProps = {
      option, id, key: id,
      scale: { x: 1, y: 1 },
      size: { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT },
      position: { left: left, top: top, zIndex },
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

  chartClick(id: number) {
    this.props.onChartClick();
    this.chartSnapShot = { ...this.state.charts[id] };
    this.setState((preState) => {
      const position = preState.charts[id].position;
      const size = preState.charts[id].size;
      return update(preState, {
        isShowTransformTool: { $set: true },
        transformTool: {
          position: { $set: position },
          size: { $set: size }
        }
      });
    });
  }

  handleTransformMouseDown(e: React.MouseEvent<HTMLDivElement>, type: SideType) {
    this.sideType = type;
    this.handleCanvasMouseDown(e);
  }

  handleCanvasMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    this.mouseDownPosition = {
      x: e.clientX,
      y: e.clientY
    };
  }

  handleCanvasMouseUp() {
    if (this.sideType !== SideType.None) {
      const id = this.chartSnapShot.id;
      this.setState((preState) => {
        const chart = preState.charts[id];
        const size = {
          width: chart.scale.x * chart.size.width,
          height: chart.scale.y * chart.size.height
        };
        return update(preState, {
          charts: {
            [id]: {
              size: { $merge: size },
              position: { $merge: preState.transformTool.position },
              scale: {
                $set: { x: 1, y: 1 }
              }
            }
          }
        });
      }, () => {
        this.chartSnapShot = { ...this.state.charts[id] };
      });
    }
    this.sideType = SideType.None;
  }

  handleCanvasMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (this.sideType === SideType.None)
      return;
    const scale = this.props.canvasScale;
    const delta = {
      x: (e.clientX - this.mouseDownPosition.x) / scale,
      y: (e.clientY - this.mouseDownPosition.y) / scale
    };

    this.setState((preState) => {
      const chart = this.chartSnapShot;
      const id = chart.id;
      let size = { ...chart.size };
      let position = { ...chart.position };

      if (this.sideType === SideType.Right) {
        size.width = size.width + delta.x;
      }
      if (this.sideType === SideType.Bottom) {
        size.height = size.height + delta.y;
      }
      if (this.sideType === SideType.Top) {
        size.height = size.height - delta.y;
        position.top = position.top + delta.y;
      }
      if (this.sideType === SideType.Left) {
        size.width = size.width - delta.x;
        position.left = position.left + delta.x;
      }
      if (this.sideType === SideType.RightTop) {
        size.width = size.width + delta.x;
        size.height = size.height - delta.y;
        position.top = position.top + delta.y;
      }

      if (this.sideType === SideType.LeftTop) {
        size.width = size.width - delta.x;
        size.height = size.height - delta.y;
        position.top = position.top + delta.y;
        position.left = position.left + delta.x;
      }

      if (this.sideType === SideType.LeftBottom) {
        size.width = size.width - delta.x;
        size.height = size.height + delta.y;
        position.left = position.left + delta.x;
      }

      if (this.sideType === SideType.RightBottom) {
        size.width = size.width + delta.x;
        size.height = size.height + delta.y;
      }
      if (this.sideType === SideType.Middle) {
        position.left = position.left + delta.x;
        position.top = position.top + delta.y;
      }

      const chartScale = {
        x: size.width / chart.size.width,
        y: size.height / chart.size.height
      };
      const chartPosition = {
        left: position.left + chart.size.width * (chartScale.x - 1) / 2,
        top: position.top + chart.size.height * (chartScale.y - 1) / 2
      };

      if (size.width < CHART_MINI_SIZE.width || size.height < CHART_MINI_SIZE.height) {
        return;
      }

      return update(preState, {
        transformTool: {
          size: { $set: size },
          position: { $set: position }
        },
        charts: {
          [id]: {
            position: { $merge: chartPosition },
            scale: { $set: chartScale }
          }
        }
      });
    });
  }

  renderTransformTool() {
    const { transformTool } = this.state;
    const { position, size } = transformTool;
    return <TransformTool position={position} size={size} handleTransformMouseDown={this.handleTransformMouseDown} />;
  }

  handleClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  render() {
    const { width, height, canvasScale, connectDropTarget, isShowTransformTool } = this.props;
    return connectDropTarget(
      <div className='canvas_container' style={{ width, height, transform: `scale(${canvasScale})` }}
        onMouseDown={(e) => this.handleCanvasMouseDown(e)}
        onMouseMove={(e) => this.handleCanvasMouseMove(e)}
        onWheel={(e) => this.props.onWheel(e)}
        onClick={(e) => this.handleClick(e)}
        onMouseUp={this.handleCanvasMouseUp}>
        <div className='canvas' ref={(e) => this.canvasDiv = e}>
          {this.renderCharts()}
          {isShowTransformTool && this.renderTransformTool()}
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
      let { left, top } = component.getPotionByCanvas(x, y);
      component.appendChart(item.option, left, top);
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