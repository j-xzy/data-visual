import * as React from 'react';
import update from 'immutability-helper';
import { DropTarget, DropTargetConnector, DropTargetMonitor, ConnectDropTarget } from 'react-dnd';
import { PREVIEW_CHART } from '@lib/dragtype';
import { IBeginDragResult as IDraggableChartPreivewResult } from '@container/draggable-chart-preview';
import { IChartConfig, Chart } from '@components/chart';
import { TransformTool, SideType } from '@components/transform-tool';
import { MIN_SCALE_VALUE, MAX_SCALE_VALUE, IUpdateStudioState, ITransformTool, NO_CHOOSED_CHART } from '@pages/studio';

import './style.styl';

export interface ICanvasProps {
  width: number;
  height: number;
  canvasScale: number;
  charts: ReadonlyArray<IChartConfig>;
  updateStudioState: IUpdateStudioState;
  choosedChartIndex: number;
}

interface ICanvasState {
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

export class RawCanvas extends React.Component<IRawCanvasProps, ICanvasState> {
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

    this.state = {
      transformTool: {
        position: { left: 0, top: 0 },
        size: { width: 0, height: 0 }
      }
    };
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
    this.props.updateStudioState({ choosedChartIndex: index });
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
            position: { $merge: this.state.transformTool.position },
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
    const { updateStudioState, charts, canvasScale } = this.props;
    const delta = {
      x: (e.clientX - this.mouseDownPosition.x) / canvasScale,
      y: (e.clientY - this.mouseDownPosition.y) / canvasScale
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

    this.setState({
      transformTool: {
        size,
        position
      }
    });

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
    const { charts } = this.props;
    const { index, imgSrc } = this.chartSnapShot;
    const { option, position: { left, top }, size } = charts[index];
    const position = {
      left: left + OFFSET_POSITION.left,
      top: top + OFFSET_POSITION.top
    };
    this.appendChart(option, { position, size, imgSrc }, () => {
      this.chartSnapShot = { ...charts[charts.length], index: charts.length };
    });
    this.setState({
      transformTool: { size, position }
    });
  }

  handleTrashcanClick() {
    const { charts, updateStudioState } = this.props;
    const index = this.chartSnapShot.index;
    updateStudioState({
      charts: update(charts, {
        $splice: [[index, 1]]
      }),
      choosedChartIndex: NO_CHOOSED_CHART
    });
  }

  renderTransformTool() {
    const transformTool = this.state.transformTool;
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

  componentWillReceiveProps(nextProps: ICanvasProps) {
    const choosedChartIndex = nextProps.choosedChartIndex;
    if (choosedChartIndex !== NO_CHOOSED_CHART && choosedChartIndex !== this.props.choosedChartIndex) {
      // show transformtool and update chartSnapShot
      this.chartSnapShot = { ...nextProps.charts[choosedChartIndex], index: choosedChartIndex };
      const { position, size } = this.chartSnapShot;
      this.setState({
        transformTool: { position, size }
      });
    }
  }

  render() {
    const { width, height, canvasScale, connectDropTarget, choosedChartIndex } = this.props;
    return connectDropTarget(
      <div className='canvas_container' style={{ width, height, transform: `scale(${canvasScale})` }}
        onMouseDown={(e) => this.handleCanvasMouseDown(e)}
        onMouseMove={(e) => this.handleCanvasMouseMove(e)}
        onWheel={(e) => this.handleCanvasWheel(e)}
        onClick={(e) => this.handleClick(e)}
        onMouseUp={this.handleCanvasMouseUp}>
        <div className='canvas' ref={(e) => this.canvasDiv = e}>
          {this.renderCharts()}
          {choosedChartIndex !== NO_CHOOSED_CHART && this.renderTransformTool()}
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