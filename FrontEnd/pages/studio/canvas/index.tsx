import * as React from 'react';
import update from 'immutability-helper';
import { DropTarget, DropTargetConnector, DropTargetMonitor, ConnectDropTarget } from 'react-dnd';
import { PREVIEW_CHART } from '@lib/dragtype';
import { IBeginDragResult as IDraggableChartPreivewResult } from '@container/draggable-chart-preview';
import { IChartConfig, Chart } from '@components/chart';
import { TransformTool, SideType } from '@components/transform-tool';
import { MIN_SCALE_VALUE, MAX_SCALE_VALUE, IUpdateStudioState, ITransformTool } from '@pages/studio';

import './style.styl';

export interface ICanvasProps {
  width: number;
  height: number;
  canvasScale: number;
  isShowTransformTool: boolean;
  charts: ReadonlyArray<IChartConfig>;
  updateStudioState: IUpdateStudioState;
  hideTransformTool: () => void;
  transformTool: ITransformTool;
}

interface IChartSnapShot extends IChartConfig {
  index: number;
}

interface IRawCanvasProps extends ICanvasProps {
  connectDropTarget: ConnectDropTarget;
}

type Coordinate = {
  x: number;
  y: number;
};

type Position = {
  left: number;
  top: number;
};

type Size = {
  width: number;
  height: number;
};

export const OFFSET_POSITION = {
  left: 10,
  top: 10
};
const DEFAULT_WIDTH = 300;
const DEFAULT_HEIGHT = 300;
const CHART_MINI_SIZE = {
  width: 50,
  height: 50
};

let guid = 0;

export class RawCanvas extends React.Component<IRawCanvasProps, undefined> {
  constructor(props: IRawCanvasProps) {
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
    this.handleCopyClick = this.handleCopyClick.bind(this);
    this.handleTrashcanClick = this.handleTrashcanClick.bind(this);
    this.handleCanvasWheel = this.handleCanvasWheel.bind(this);
  }

  canvasDiv: HTMLDivElement;
  mouseDownPosition: Coordinate;
  chartSnapShot: IChartSnapShot;
  sideType = SideType.None;

  appendChart(option: object, config: { position: Position, size: Size, imgSrc: string }, callback?: () => void) {
    const { position, size, imgSrc } = config;
    guid++;
    const props: IChartConfig = {
      option, position, size, imgSrc, id: guid,
      scale: { x: 1, y: 1 }
    };
    const { updateStudioState, charts } = this.props;
    updateStudioState({
      charts: update(charts, {
        $push: [props]
      })
    }, callback);
  }

  renderCharts() {
    const charts = this.props.charts;
    return charts.map((props, idx) => {
      const { id, ...onIdProps } = props;
      return <Chart onChartClick={this.chartClick} {...onIdProps} key={idx} index={idx} />;
    });
  }

  getPotionByCanvas(clientX: number, clientY: number) {
    let { left, top } = this.canvasDiv.getBoundingClientRect();
    const { canvasScale } = this.props;
    left = (clientX - left) / canvasScale;
    top = (clientY - top) / canvasScale;
    return { left, top };
  }

  chartClick(index: number) {
    this.chartSnapShot = { ...this.props.charts[index], index };
    const { position, size } = this.chartSnapShot;
    this.props.updateStudioState({
      isShowTransformTool: true,
      transformTool: update(this.props.transformTool, {
        position: { $set: position },
        size: { $set: size }
      })
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
      const index = this.chartSnapShot.index;
      const charts = this.props.charts;
      const chart = charts[index];
      const size = {
        width: chart.scale.x * chart.size.width,
        height: chart.scale.y * chart.size.height
      };
      this.props.updateStudioState({
        charts: update(charts, {
          [index]: {
            size: { $merge: size },
            position: { $merge: this.props.transformTool.position },
            scale: {
              $set: { x: 1, y: 1 }
            }
          }
        })
      }, () => {
        this.chartSnapShot = { ...this.props.charts[index], index };
      });
    }
    this.sideType = SideType.None;
  }

  handleCanvasWheel(e: React.WheelEvent<HTMLDivElement>) {
    const { canvasScale, updateStudioState } = this.props;
    if (e.deltaY > 0) {
      canvasScale >= MIN_SCALE_VALUE && updateStudioState({ canvasScale: canvasScale - 0.05 });
    } else {
      canvasScale <= MAX_SCALE_VALUE && updateStudioState({ canvasScale: canvasScale + 0.05 });
    }
  }

  handleCanvasMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (this.sideType === SideType.None)
      return;
    const scale = this.props.canvasScale;
    const delta = {
      x: (e.clientX - this.mouseDownPosition.x) / scale,
      y: (e.clientY - this.mouseDownPosition.y) / scale
    };

    const chart = this.chartSnapShot;
    const index = chart.index;
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

    this.props.updateStudioState({
      transformTool: {
        size,
        position
      }
    });

    const { updateStudioState, charts } = this.props;
    updateStudioState({
      charts: update(charts, {
        [index]: {
          position: { $merge: chartPosition },
          scale: { $set: chartScale }
        }
      })
    });
  }

  handleCopyClick() {
    const { charts, updateStudioState, transformTool } = this.props;
    const { index, imgSrc } = this.chartSnapShot;
    const { option, position: { left, top }, size } = charts[index];
    const position = {
      left: left + OFFSET_POSITION.left,
      top: top + OFFSET_POSITION.top
    };
    this.appendChart(option, { position, size, imgSrc }, () => {
      this.chartSnapShot = { ...this.props.charts[index + 1], index: index + 1 };
    });
    updateStudioState({
      transformTool: update(transformTool, {
        size: { $set: size },
        position: { $set: position }
      })
    });
  }

  handleTrashcanClick() {
    const { charts, hideTransformTool, updateStudioState } = this.props;
    const index = this.chartSnapShot.index;
    hideTransformTool();
    updateStudioState({
      charts: update(charts, {
        $splice: [[index, 1]]
      })
    });
  }

  renderTransformTool() {
    const transformTool = this.props.transformTool;
    const { position, size } = transformTool;
    return (
      <TransformTool
        position={position} size={size}
        handleTransformMouseDown={this.handleTransformMouseDown}
        onCopyClick={this.handleCopyClick}
        onTrashcanClick={this.handleTrashcanClick}>
      </TransformTool>);
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
        onWheel={(e) => this.handleCanvasWheel(e)}
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
      const position = {
        left: left - DEFAULT_WIDTH / 2,
        top: top - DEFAULT_HEIGHT / 2
      };
      const size = { width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT };
      const imgSrc = item.imgSrc;
      component.appendChart(item.option, { position, size, imgSrc });
      return;
    }
  }
};

function collect(connect: DropTargetConnector, monitor: DropTargetMonitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

export const Canvas = DropTarget<ICanvasProps>(PREVIEW_CHART, boxTarget, collect)(RawCanvas);