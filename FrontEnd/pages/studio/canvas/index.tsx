import * as React from 'react';
import update from 'immutability-helper';
import { DropTarget, DropTargetConnector, DropTargetMonitor, ConnectDropTarget } from 'react-dnd';
import { PREVIEW_CHART } from '@lib/dragtype';
import { IBeginDragResult as IDraggableChartPreivewResult } from '@container/draggable-chart-preview';
import { IChartConfig, Chart } from '@components/chart';
import { TransformTool, SideType, ITransformConfig } from '@components/transform-tool';
import { MIN_SCALE_VALUE, MAX_SCALE_VALUE, IUpdateStudioState, NO_HOVER_CHART } from '@pages/studio';

import './style.styl';

export interface ICanvasProps {
  width: number;
  height: number;
  canvasScale: number;
  charts: ReadonlyArray<IChartConfig>;
  updateStudioState: IUpdateStudioState;
  choosedChartIds: ReadonlyArray<number>;
  hoverChartId: number;
}

type ITransformTools = {
  [p: string]: ITransformConfig;  // p is chartId
};

interface ICanvasState {
  transformTools: ITransformTools;
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
export const CHART_MINI_SIZE = {
  width: 50,
  height: 50
};

export class RawCanvas extends React.Component<IRawCanvasProps, ICanvasState> {
  constructor(props: IRawCanvasProps) {
    super(props);
    this.chartClick = this.chartClick.bind(this);
    this.handleTransformMouseDown = this.handleTransformMouseDown.bind(this);
    this.handleCanvasMouseUp = this.handleCanvasMouseUp.bind(this);
    this.handleCanvasMouseMove = this.handleCanvasMouseMove.bind(this);
    this.handleCanvasMouseDown = this.handleCanvasMouseDown.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCopyClick = this.handleCopyClick.bind(this);
    this.handleTrashcanClick = this.handleTrashcanClick.bind(this);
    this.handleCanvasWheel = this.handleCanvasWheel.bind(this);
    this.getChartAfterMouseMove = this.getChartAfterMouseMove.bind(this);
    this.getChartConfigWhileMousemove = this.getChartConfigWhileMousemove.bind(this);

    this.state = {
      transformTools: {} // depends on props.choosedChartIds
    };
  }

  canvasDiv: HTMLDivElement;
  lastMousePosition: Coordinate;
  sideType = SideType.None;
  idMapIndex: Map<number, number> = new Map(); // chart'id map charts's index

  appendChart(option: object, config: { position: Position, size: Size, imgSrc: string }, callback?: () => void) {
    const { position, size, imgSrc } = config;
    const guid = Date.now();
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
    return guid;
  }

  getPotionByCanvas(clientX: number, clientY: number) {
    let { left, top } = this.canvasDiv.getBoundingClientRect();
    const { canvasScale } = this.props;
    left = (clientX - left) / canvasScale;
    top = (clientY - top) / canvasScale;
    return { left, top };
  }

  chartClick(e: React.MouseEvent<HTMLDivElement>, id: number) {
    const ids = this.props.choosedChartIds;
    if (e.ctrlKey === true) {
      this.props.updateStudioState({ choosedChartIds: [...ids, id] });
    } else {
      this.props.updateStudioState({ choosedChartIds: [id] });
    }
  }

  handleTransformMouseDown(e: React.MouseEvent<HTMLDivElement>, type: SideType) {
    this.sideType = type;
    this.handleCanvasMouseDown(e);
  }

  handleCanvasMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    this.lastMousePosition = {
      x: e.clientX,
      y: e.clientY
    };
  }

  handleCanvasMouseUp() {
    if (this.sideType !== SideType.None) {
      const newCharts = this.mergeNewCharts(this.getChartAfterMouseMove);
      this.props.updateStudioState({ charts: newCharts });
    }
    this.sideType = SideType.None;
  }

  getChartAfterMouseMove(id: number) {
    const index = this.idMapIndex.get(id);
    const charts = this.props.charts;
    const transformTool = this.state.transformTools[id];
    const chart = charts[index];
    const size = {
      width: chart.scale.x * chart.size.width,
      height: chart.scale.y * chart.size.height
    };

    return update(charts[index], {
      size: { $merge: size },
      position: { $merge: transformTool.position },
      scale: {
        $set: { x: 1, y: 1 }
      }
    });
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

    const ps = { x: e.clientX, y: e.clientY };
    const newCharts = this.mergeNewCharts(this.getChartConfigWhileMousemove, ps);
    this.props.updateStudioState({ charts: newCharts });

    this.lastMousePosition = {
      x: e.clientX,
      y: e.clientY
    };
  }

  mergeNewCharts<T>(func: (chartId: number, ...rest: T[]) => IChartConfig, ...rest: T[]) {
    let newCharts: IChartConfig[] = [];
    const { charts, choosedChartIds } = this.props;
    for (let i = 0, length = charts.length; i < length; i++) {
      const id = charts[i].id;
      let chart = charts[i];
      if (choosedChartIds.indexOf(id) !== -1) {
        chart = func(id, ...rest);
      }
      newCharts.push(chart);
    }
    return newCharts;
  }

  getChartConfigWhileMousemove(chartId: number, postion: Coordinate) {
    const { charts, canvasScale } = this.props;
    const { transformTools } = this.state;
    const transformTool = transformTools[chartId];

    const delta = {
      x: (postion.x - this.lastMousePosition.x) / canvasScale,
      y: (postion.y - this.lastMousePosition.y) / canvasScale
    };
    const chartIndex = this.idMapIndex.get(chartId);
    const chart = this.props.charts[chartIndex];

    let size = { ...transformTool.size };
    let position = { ...transformTool.position };

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
      return charts[chartIndex];
    }

    return update(charts[chartIndex], {
      position: { $merge: chartPosition },
      scale: { $set: chartScale }
    });
  }

  handleCopyClick(id: number) {
    const { charts } = this.props;
    const index = this.idMapIndex.get(id);
    const { option, position: { left, top }, size, imgSrc } = charts[index];
    const position = {
      left: left + OFFSET_POSITION.left,
      top: top + OFFSET_POSITION.top
    };
    const newChartId = this.appendChart(option, { position, size, imgSrc });
    this.props.updateStudioState({ choosedChartIds: [newChartId] });
  }

  handleTrashcanClick(id: number) {
    const { charts, updateStudioState } = this.props;
    const index = this.idMapIndex.get(id);
    updateStudioState({
      charts: update(charts, {
        $splice: [[index, 1]]
      }),
      choosedChartIds: []
    });
  }

  renderTransformTools() {
    const transformTools = this.state.transformTools;
    return Object.keys(transformTools).map((key) => {
      const { position, size } = transformTools[key];
      return (
        <TransformTool
          position={position} size={size} key={key} id={parseInt(key)}
          handleTransformMouseDown={this.handleTransformMouseDown}
          onCopyClick={this.handleCopyClick}
          onTrashcanClick={this.handleTrashcanClick}>
        </TransformTool>);
    });
  }

  // Re-build the mapping with each render
  renderCharts() {
    const { charts, hoverChartId } = this.props;
    this.idMapIndex.clear();
    return charts.map((chart, idx) => {
      const { id, ...onIdProps } = chart;  // key must be chartId
      const isMask = hoverChartId !== NO_HOVER_CHART && hoverChartId === id;
      this.idMapIndex.set(id, idx);
      return <Chart isMask={isMask} onChartClick={this.chartClick} {...onIdProps} key={id} id={id} index={idx} />;
    });
  }

  handleClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  setTransformToolsState(charts: ReadonlyArray<IChartConfig>, choosedChartIds: ReadonlyArray<number>) {
    let newTransformTools: ITransformTools = {};
    for (const chart of charts) {
      if (choosedChartIds.indexOf(chart.id) === -1) {
        continue;
      }
      const {
        position: { left, top },
        size: { width, height }, id,
        scale: { x: scaleX, y: scaleY }
      } = chart;

      const toolSize = {
        width: scaleX * width,
        height: scaleY * height
      };

      const toolPosition = {
        left: left - width * (scaleX - 1) / 2,
        top: top - height * (scaleY - 1) / 2
      };

      newTransformTools[id] = { position: toolPosition, size: toolSize, id };
    }
    this.setState({
      transformTools: newTransformTools
    });
  }

  componentWillReceiveProps(nextProps: ICanvasProps) {
    this.setTransformToolsState(nextProps.charts, nextProps.choosedChartIds);
  }

  render() {
    const { width, height, canvasScale, connectDropTarget } = this.props;
    return connectDropTarget(
      <div className='canvas_container' style={{ width, height, transform: `scale(${canvasScale})` }}
        onMouseDown={(e) => this.handleCanvasMouseDown(e)}
        onMouseMove={(e) => this.handleCanvasMouseMove(e)}
        onWheel={(e) => this.handleCanvasWheel(e)}
        onClick={(e) => this.handleClick(e)}
        onMouseUp={this.handleCanvasMouseUp}>
        <div className='canvas' ref={(e) => this.canvasDiv = e}>
          {this.renderCharts()}
          {this.renderTransformTools()}
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