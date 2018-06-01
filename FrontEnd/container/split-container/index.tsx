import * as React from 'react';
import update from 'immutability-helper';
import { Panel, BorderType } from './panel';
import { tree, INodeData, TreeNode } from './tree';
import { Mode } from '@container/draggable-split';
import { IUpdateStudioState, idMapIndexChart, NO_CHOOSED_SPLITID } from '@pages/studio';
import { IChartConfig } from '@components/chart';

import './style.styl';

interface Size<T extends number | string> {
  width?: T;
  height?: T;
}

interface IState {
  firstPanelMode: Mode | 'none';
  secondPanelMode: Mode | 'none';
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
  isBorder: boolean;
  unmount: () => void;
  choosedSplitId: number;
  containerId: number;
  highlightChartId: number;
  canvasScale: number;
}

function buildTree(mode: Mode | 'none', containerId: number, firstPanelId: number, secondPanelId: number) {
  const type = mode === 'horizontal' ? 'column' : 'row';
  const firstChild: INodeData = {
    id: firstPanelId, type: 'none',
    width: '50%', height: '50%'
  };
  const secondChild: INodeData = {
    id: secondPanelId, type: 'none',
    width: '50%', height: '50%'
  };
  let node: TreeNode;
  if (!tree.root) {
    const rootData: INodeData = {
      id: containerId, type,
      width: '100%', height: '100%'
    };
    node = tree.insertAsRoot(rootData);
  }
  else {
    node = tree.getNodeById(tree.root, containerId);
    node.updateData(update(node.getData(), { type: { $set: type } }));
  }
  tree.insertAsFirstChild(node, firstChild);
  tree.insertAsSecondChild(node, secondChild);
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
    this.handleContainerClick = this.handleContainerClick.bind(this);
    this.handleChartClick = this.handleChartClick.bind(this);
    this.handleChartTrashcanClick = this.handleChartTrashcanClick.bind(this);
    this.handleTrashcanClick = this.handleTrashcanClick.bind(this);

    let size = { width: '100%', height: '100%' };
    props.mode === 'horizontal' ? size.height = '50%' : size.width = '50%';

    this.state = {
      firstPanelMode: 'none',
      secondPanelMode: 'none',
      firstPanelSize: size,
      secondPanelSize: size,
      topDelta: 0,
      leftDelta: 0
    };

    this.firstPanelId = Date.now();
    this.secondPanelId = Date.now() + 1;

    buildTree(props.mode, props.containerId, this.firstPanelId, this.secondPanelId);
  }

  isOnChangeSize = false;
  elRef: React.RefObject<HTMLDivElement> = React.createRef();
  firstContainerRef: React.RefObject<SplitContainer> = React.createRef();
  secondContainerRef: React.RefObject<SplitContainer> = React.createRef();
  firstPanelId: number; // chart's id
  secondPanelId: number; // chart's id

  handleDrop(panel: 'first' | 'second', mode: Mode) {
    if (panel === 'first') {
      this.setState({
        firstPanelMode: mode
      });
    } else {
      this.setState({
        secondPanelMode: mode
      });
    }
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

    let firshtChartIdx = idMapIndexChart.get(this.firstPanelId);
    let secondChartIdx = idMapIndexChart.get(this.secondPanelId);

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

  handleContainerClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();

    const { updateStudioState, containerId } = this.props;
    updateStudioState({
      choosedChartIds: [],
      choosedSplitId: containerId
    });
  }

  handleChartClick(e: React.MouseEvent<HTMLDivElement>, id: number) {
    e.stopPropagation();
    const { updateStudioState, choosedChartIds } = this.props;
    if (e.shiftKey) {
      return;
    }

    let newChoosedChartIds = [id];
    if (e.ctrlKey) {
      newChoosedChartIds.push(...choosedChartIds);
    }
    updateStudioState({
      choosedChartIds: newChoosedChartIds,
      choosedSplitId: NO_CHOOSED_SPLITID
    });
  }

  handleChartTrashcanClick(id: number) {
    const { updateStudioState, charts } = this.props;
    const idx = idMapIndexChart.get(id);
    const newChart = [...charts.slice(0, idx), ...charts.slice(idx + 1)];
    updateStudioState({ charts: newChart, choosedChartIds: [] });
  }

  handleTrashcanClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    const { containerId, charts, updateStudioState } = this.props;
    const node = tree.getNodeById(tree.root, containerId);
    const childIds = tree.getNodeChildIds(node);
    const hasChart = charts.some((chart) => {
      return childIds.includes(chart.id);
    });

    if (hasChart) {
      alert('请先删除图表');
      return;
    }

    tree.deleteNode(node.firstChild);
    tree.deleteNode(node.secondChild);

    updateStudioState({
      choosedSplitId: NO_CHOOSED_SPLITID
    });

    this.props.unmount();
  }

  handleChildUnmout(child: 'first' | 'second') {
    child === 'first' ?
      this.setState({ firstPanelMode: 'none' }) :
      this.setState({ secondPanelMode: 'none' });
  }

  render(): JSX.Element {
    let { mode, updateStudioState, charts, highlightChartId, choosedChartIds, choosedSplitId, containerId, isBorder } = this.props;
    const { firstPanelSize, secondPanelSize, firstPanelMode, secondPanelMode,
      topDelta, leftDelta } = this.state;

    const flexDirection: any = mode === 'horizontal' ? 'column' : 'row';
    const containerChoosed = choosedSplitId === containerId;

    let topDeltaFoo = topDelta, leftDeltaFoo = leftDelta, widthRatio = 0, heightRatio = 0;
    if (this.elRef.current) {
      let delta = this.calculateDelta();
      topDeltaFoo = delta.topDelta;
      leftDeltaFoo = delta.leftDelta;

      const { width, height } = window.getComputedStyle(this.elRef.current, null);
      widthRatio = parseFloat(width) / 100;
      heightRatio = parseFloat(height) / 100;
    }

    let middleStyle: React.CSSProperties = {},
      trashcanStyle: React.CSSProperties = {};

    if (mode === 'horizontal') {
      const top = parseFloat(firstPanelSize.height) - topDeltaFoo;

      middleStyle.top = top + '%';
      middleStyle.width = '100%';
      containerChoosed || (middleStyle.cursor = 'ns-resize');

      trashcanStyle.top = top * heightRatio - 5;
      trashcanStyle.left = 50 * widthRatio - 5;
    } else {
      const left = parseFloat(firstPanelSize.width) - leftDeltaFoo;

      middleStyle.left = left + '%';
      middleStyle.height = '100%';
      containerChoosed || (middleStyle.cursor = 'ew-resize');

      trashcanStyle.top = 50 * heightRatio - 5;
      trashcanStyle.left = left * widthRatio - 5;
    }

    // border-type
    let borderType: BorderType = 'none';
    if (isBorder) {
      borderType = mode === 'vertical' ? 'right' : 'bottom';
    }

    // update treenode data
    const node = tree.getNodeById(tree.root, containerId);
    node.firstChild.data.height = firstPanelSize.height;
    node.firstChild.data.width = firstPanelSize.width;

    node.secondChild.data.height = secondPanelSize.height;
    node.secondChild.data.width = secondPanelSize.width;

    const firstChart = charts[idMapIndexChart.get(this.firstPanelId)];
    const firstChartchoosed = choosedChartIds.includes(this.firstPanelId);

    const secondChart = charts[idMapIndexChart.get(this.secondPanelId)];
    const secondChartchoosed = choosedChartIds.includes(this.secondPanelId);

    return (
      <div onClick={this.handleContainerClick} className='split_container' onMouseUp={this.handleMouseUp} onMouseMove={this.handleMouseMove} ref={this.elRef} style={{ flexDirection }} >
        <Panel onTrashcanClick={this.handleChartTrashcanClick} choosed={choosedChartIds.includes(this.firstPanelId)} masked={highlightChartId === this.firstPanelId} onChartClick={this.handleChartClick} size={firstPanelSize}
          borderType={borderType} onDrop={(mode) => this.handleDrop('first', mode)}
          chart={firstChart} id={this.firstPanelId} appendChart={this.appendChart} >
          {
            firstPanelMode !== 'none'
            && <SplitContainer isBorder={isBorder} choosedSplitId={choosedSplitId} containerId={this.firstPanelId} unmount={() => this.handleChildUnmout('first')} choosedChartIds={choosedChartIds} canvasScale={this.props.canvasScale}
              ref={this.firstContainerRef} charts={charts} highlightChartId={highlightChartId} updateStudioState={updateStudioState} mode={firstPanelMode} />
          }
        </Panel>
        <MiddleLine style={middleStyle} onDown={this.handleMousDown} />
        <Panel borderType='none' onTrashcanClick={this.handleChartTrashcanClick} choosed={choosedChartIds.includes(this.secondPanelId)} masked={highlightChartId === this.firstPanelId} onChartClick={this.handleChartClick} size={secondPanelSize}
          onDrop={(mode) => this.handleDrop('second', mode)} id={this.secondPanelId} chart={secondChart}
          appendChart={this.appendChart}>
          {
            secondPanelMode !== 'none'
            && <SplitContainer isBorder={isBorder} choosedSplitId={choosedSplitId} containerId={this.secondPanelId} unmount={() => this.handleChildUnmout('second')} choosedChartIds={choosedChartIds} canvasScale={this.props.canvasScale}
              ref={this.secondContainerRef} charts={charts} highlightChartId={highlightChartId} updateStudioState={updateStudioState} mode={secondPanelMode} />
          }
        </Panel>
        {
          containerChoosed &&
          <div className='split_tool' onDrop={(e) => e.stopPropagation()} >
            <i className='icon-trashcan icon' style={trashcanStyle} onClick={this.handleTrashcanClick}></i>
          </div>
        }
      </div>
    );
  }
}

interface IMiddleLineProps {
  onDown: () => void;
  style: React.CSSProperties;
}

function MiddleLine(props: IMiddleLineProps) {
  return (
    <div className='middleline' onDrop={(e) => e.stopPropagation()} onClick={(e) => e.stopPropagation()} onMouseDownCapture={props.onDown} style={{ ...props.style, zIndex: 800 }}></div>
  );
}