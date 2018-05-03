import * as React from 'react';
import update from 'immutability-helper';
import Panel from './panel';
import { tree, INodeData, TreeNode } from './tree';
import { Mode } from '@container/draggable-split';
import { IUpdateStudioState, idMapIndex } from '@pages/studio';
import { IChartConfig } from '@components/chart';

import './style.styl';

interface Size<T extends number | string> {
  width?: T;
  height?: T;
}

interface IState {
  firstPanelMode: Mode | 'none';
  secondtPanelMode: Mode | 'none';
  firstPanelSize: Size<string>;
  secondPanelSize: Size<string>;
  topDelta: number;
  leftDelta: number;
}

interface IProps {
  mode: Mode | 'none';
  choosedChartIds: ReadonlyArray<number>;
  updateStudioState: IUpdateStudioState;
  charts: ReadonlyArray<IChartConfig>;
  unmount: () => void;
  containerId: number;
  hoverChartId: number;
  canvasScale: number;
}

export default class SplitContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMousDown = this.handleMousDown.bind(this);
    this.appendChart = this.appendChart.bind(this);
    this.recurseSplit = this.recurseSplit.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handlePanelClick = this.handlePanelClick.bind(this);

    let size = { width: '100%', height: '100%' };
    props.mode === 'horizontal' ? size.height = '50%' : size.width = '50%';

    this.state = {
      firstPanelMode: 'none',
      secondtPanelMode: 'none',
      firstPanelSize: size,
      secondPanelSize: size,
      topDelta: 0,
      leftDelta: 0
    };

    this.firstPanelId = Date.now();
    this.secondPanelId = Date.now() + 1;

    // build tree
    const type = props.mode === 'horizontal' ? 'column' : 'row';

    const firstChild: INodeData = {
      id: this.firstPanelId, type: 'none',
      width: '50%', height: '50%'
    };
    const secondChild: INodeData = {
      id: this.secondPanelId, type: 'none',
      width: '50%', height: '50%'
    };
    let node: TreeNode;
    if (tree.root === null) {
      const rootData: INodeData = {
        id: this.firstPanelId, type,
        width: '100%', height: '100%'
      };
      node = tree.insertAsRoot(rootData);
    } else {
      node = tree.getNodeById(tree.root, this.props.containerId);
      node.updateData(update(node.getData(), { type }));
    }

    tree.insertAsFirstChild(node, firstChild);
    tree.insertAsFirstChild(node, secondChild);
  }

  isOnChangeSize = false;
  elRef: React.RefObject<HTMLDivElement> = React.createRef();
  firstContainerRef: React.RefObject<SplitContainer> = React.createRef();
  secondContainerRef: React.RefObject<SplitContainer> = React.createRef();
  firstPanelId: number; // chart's id
  secondPanelId: number; // chart's id

  handleDrop(panel: 'first' | 'second', mode: Mode) {
    const panelType: any = panel === 'first' ? 'firstPanelMode' : 'secondPanelMode';
    this.setState({
      [panelType]: mode
    });
  }

  handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (e.buttons !== 1 || !this.isOnChangeSize) {
      this.isOnChangeSize = false;
      return;
    }

    let x = e.clientX, y = e.clientY;
    let rect = this.elRef.current.getBoundingClientRect();
    let width = rect.width, height = rect.height,
      top = rect.top, left = rect.left;

    // set panel position and size
    let firstPanelSize = { ...this.state.firstPanelSize };
    let secondPanelSize = { ...this.state.secondPanelSize };
    let ratio: number;
    let flag: 'height' | 'width';

    if (this.props.mode === 'horizontal') {
      ratio = (y - top) / height * 100;
      flag = 'height';
    } else {
      ratio = (x - left) / width * 100;
      flag = 'width';
    }
    firstPanelSize[flag] = ratio + '%';
    secondPanelSize[flag] = 100 - ratio + '%';

    this.setState({ firstPanelSize, secondPanelSize });

    let newCharts: IChartConfig[] = [...this.props.charts];
    this.recurseSplit(newCharts, this.getChartPositionAndScale); // recursion
  }

  recurseSplit(newCharts: IChartConfig[], func: any) {
    const { charts, updateStudioState } = this.props;

    let firshtChartIdx = idMapIndex.get(this.firstPanelId);
    let secondChartIdx = idMapIndex.get(this.secondPanelId);

    if (typeof firshtChartIdx !== 'undefined') {
      let chart = func.apply(this, ['first', charts[firshtChartIdx]]);
      newCharts[firshtChartIdx] = chart;
    }

    if (typeof secondChartIdx !== 'undefined') {
      let chart = func.apply(this, ['second', charts[secondChartIdx]]);
      newCharts[secondChartIdx] = chart;
    }

    this.firstContainerRef.current && this.firstContainerRef.current.recurseSplit(newCharts, func);
    this.secondContainerRef.current && this.secondContainerRef.current.recurseSplit(newCharts, func);

    if (!this.firstContainerRef.current && !this.secondContainerRef.current) {
      updateStudioState({ charts: newCharts });
    }
  }

  getChartPositionAndScale(firstOrSecond: 'first' | 'second', chart: IChartConfig) {
    const panelSizeType = firstOrSecond === 'first' ? 'firstPanelSize' : 'secondPanelSize';
    const { width, height } = this.state[panelSizeType];

    const rect = this.elRef.current.getBoundingClientRect();
    let radioWidth = rect.width / 100, radioHeight = rect.height / 100;

    const panelSize = {
      width: radioWidth * parseFloat(width),
      height: radioHeight * parseFloat(height)
    };

    const chartScale = {
      x: panelSize.width / chart.size.width / this.props.canvasScale,
      y: panelSize.height / chart.size.height / this.props.canvasScale
    };
    const chartPosition = {
      left: chart.size.width * (chartScale.x - 1) / 2,
      top: chart.size.height * (chartScale.y - 1) / 2
    };

    return update(chart, {
      position: { $merge: chartPosition },
      scale: { $set: chartScale }
    });
  }

  getChartSize(firstOrSecond: 'first' | 'second', chart: IChartConfig) {
    const size = {
      width: chart.scale.x * chart.size.width,
      height: chart.scale.y * chart.size.height
    };
    return update(chart, {
      size: { $set: size },
      position: { $set: { left: 0, top: 0 } },
      scale: {
        $set: { x: 1, y: 1 }
      }
    });
  }

  handleMousDown() {
    this.isOnChangeSize = true;
  }

  handleMouseUp() {
    if (this.isOnChangeSize) {
      let newCharts: IChartConfig[] = [...this.props.charts];
      this.recurseSplit(newCharts, this.getChartSize); // recursion
    }
    this.isOnChangeSize = false;
  }

  componentDidMount() {
    const { topDelta, leftDelta } = this.calculateDelta();
    this.setState({ topDelta, leftDelta });
  }

  calculateDelta() {
    let { height, width } = window.getComputedStyle(this.elRef.current, null);
    let topDelta = (100 / parseFloat(height)) * 10;
    let leftDelta = (100 / parseFloat(width)) * 10;
    return { topDelta, leftDelta };
  }

  appendChart(chart: IChartConfig) {
    const { updateStudioState, charts } = this.props;
    updateStudioState({
      charts: update(charts, {
        $push: [chart]
      })
    });
  }

  handlePanelClick(e: React.MouseEvent<HTMLDivElement>, panel: 'first' | 'second') {
    e.stopPropagation();
    const { updateStudioState, choosedChartIds } = this.props;
    const chartId = panel === 'first' ? this.firstPanelId : this.secondPanelId;

    if (e.shiftKey) {
      return;
    }
    if (!idMapIndex.has(chartId)) {
      updateStudioState({
        choosedChartIds: []
      });
      return;
    }

    let newChoosedChartIds = [chartId];
    if (e.ctrlKey) {
      newChoosedChartIds.push(...choosedChartIds);
    }
    updateStudioState({
      choosedChartIds: newChoosedChartIds
    });
  }

  handleChildUnmout(child: 'first' | 'second') {
    child === 'first' ?
      this.setState({ firstPanelMode: 'none' }) :
      this.setState({ secondtPanelMode: 'none' });
  }

  render(): JSX.Element {
    let { mode, updateStudioState, charts, hoverChartId, choosedChartIds } = this.props;
    const { firstPanelSize, secondPanelSize, firstPanelMode, secondtPanelMode, topDelta, leftDelta } = this.state;

    const flexDirection: any = mode === 'horizontal' ? 'column' : 'row';

    let middleStyle: React.CSSProperties = {};
    let topDeltaFoo = topDelta, leftDeltaFoo = leftDelta;
    if (this.elRef.current) {
      let delta = this.calculateDelta();
      topDeltaFoo = delta.topDelta;
      leftDeltaFoo = delta.leftDelta;
    }

    if (mode === 'horizontal') {
      middleStyle.top = parseFloat(firstPanelSize.height) - topDeltaFoo + '%';
      middleStyle.width = '100%';
      middleStyle.cursor = 'ns-resize';
    } else {
      middleStyle.left = parseFloat(firstPanelSize.width) - leftDeltaFoo + '%';
      middleStyle.height = '100%';
      middleStyle.cursor = 'ew-resize';
    }

    const firstChart = charts[idMapIndex.get(this.firstPanelId)];
    const firstChartchoosed = choosedChartIds.includes(this.firstPanelId);

    const secondChart = charts[idMapIndex.get(this.secondPanelId)];
    const secondChartchoosed = choosedChartIds.includes(this.secondPanelId);

    return (
      <div className='split_container' onMouseUp={this.handleMouseUp} onMouseMove={this.handleMouseMove} ref={this.elRef} style={{ flexDirection }} >
        <Panel onClick={(e) => this.handlePanelClick(e, 'first')} size={firstPanelSize}
          borderType={mode === 'vertical' ? 'right' : 'bottom'} onDrop={(mode) => this.handleDrop('first', mode)}
          isMask={firstChartchoosed} chart={firstChart} id={this.firstPanelId} appendChart={this.appendChart}>
          {
            firstPanelMode !== 'none'
            && <SplitContainer containerId={this.firstPanelId} unmount={() => this.handleChildUnmout('first')} choosedChartIds={choosedChartIds} canvasScale={this.props.canvasScale}
              ref={this.firstContainerRef} charts={charts} hoverChartId={hoverChartId} updateStudioState={updateStudioState} mode={firstPanelMode} />
          }
        </Panel>
        <MiddleLine style={middleStyle} onDown={this.handleMousDown} onClick={null} />
        <Panel onClick={(e) => this.handlePanelClick(e, 'second')} size={secondPanelSize} onDrop={(mode) => this.handleDrop('second', mode)} id={this.secondPanelId} chart={secondChart}
          appendChart={this.appendChart} isMask={secondChartchoosed}>
          {
            secondtPanelMode !== 'none'
            && <SplitContainer containerId={this.secondPanelId} unmount={() => this.handleChildUnmout('second')} choosedChartIds={choosedChartIds} canvasScale={this.props.canvasScale}
              ref={this.secondContainerRef} charts={charts} hoverChartId={hoverChartId} updateStudioState={updateStudioState} mode={secondtPanelMode} />
          }
        </Panel>
      </div>
    );
  }
}

interface IMiddleLineProps {
  onDown: () => void;
  onClick: () => void;
  style: React.CSSProperties;
}

function MiddleLine(props: IMiddleLineProps) {
  return (
    <div className='middleline' onClick={props.onClick} onMouseDownCapture={props.onDown} style={{ ...props.style, zIndex: 800 }}></div>
  );
}