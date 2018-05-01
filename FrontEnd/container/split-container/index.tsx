import * as React from 'react';
import update from 'immutability-helper';
import Panel from './panel';
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
  updateStudioState: IUpdateStudioState;
  charts: ReadonlyArray<IChartConfig>;
  hoverChartId: number;
  canvasScale: number;
}

export default class SplitContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleFirstDrop = this.handleFirstDrop.bind(this);
    this.handleSecondDrop = this.handleSecondDrop.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMousDown = this.handleMousDown.bind(this);
    this.appendChart = this.appendChart.bind(this);
    this.handleChangeSize = this.handleChangeSize.bind(this);

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
  }

  isOnChangeSize = false;
  elRef: React.RefObject<HTMLDivElement> = React.createRef();
  firstContainerRef: React.RefObject<SplitContainer> = React.createRef();
  secondContainerRef: React.RefObject<SplitContainer> = React.createRef();
  firstPanelId: number; // chart's id
  secondPanelId: number; // chart's id

  handleFirstDrop(mode: Mode) {
    this.setState({
      firstPanelMode: mode
    });
  }

  handleSecondDrop(mode: Mode) {
    this.setState({
      secondtPanelMode: mode
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
    this.handleChangeSize(newCharts); // recursion
  }

  handleChangeSize(newCharts: IChartConfig[]) {
    const { charts, updateStudioState } = this.props;

    let firshtChartIdx = idMapIndex.get(this.firstPanelId);
    let secondChartIdx = idMapIndex.get(this.secondPanelId);

    if (typeof firshtChartIdx !== 'undefined') {
      let chart = this.getChartPositionAndScale('first', charts[firshtChartIdx]);
      newCharts[firshtChartIdx] = chart;
    }

    if (typeof secondChartIdx !== 'undefined') {
      let chart = this.getChartPositionAndScale('second', charts[secondChartIdx]);
      newCharts[secondChartIdx] = chart;
    }

    this.firstContainerRef.current && this.firstContainerRef.current.handleChangeSize(newCharts);
    this.secondContainerRef.current && this.secondContainerRef.current.handleChangeSize(newCharts);

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

  handleMousDown() {
    this.isOnChangeSize = true;
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

  render(): JSX.Element {
    let { mode, updateStudioState, charts, hoverChartId } = this.props;
    const { firstPanelSize, secondPanelSize, firstPanelMode, secondtPanelMode, topDelta, leftDelta } = this.state;

    let flexDirection: any = mode === 'horizontal' ? 'column' : 'row';

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

    let firshtChart = charts[idMapIndex.get(this.firstPanelId)];
    let secondChart = charts[idMapIndex.get(this.secondPanelId)];

    return (
      <div className='split_container' onMouseMove={this.handleMouseMove} ref={this.elRef} style={{ flexDirection }} >
        <Panel size={firstPanelSize} borderType={mode === 'vertical' ? 'right' : 'bottom'}
          onDrop={this.handleFirstDrop} hoverChartId={hoverChartId} chart={firshtChart} id={this.firstPanelId}
          appendChart={this.appendChart}>
          {
            firstPanelMode !== 'none'
            && <SplitContainer canvasScale={this.props.canvasScale} ref={this.firstContainerRef} charts={charts} hoverChartId={hoverChartId} updateStudioState={updateStudioState} mode={firstPanelMode} />
          }
        </Panel>
        <MiddleLine style={middleStyle} onDown={this.handleMousDown} />
        <Panel size={secondPanelSize} hoverChartId={hoverChartId} onDrop={this.handleSecondDrop} id={this.secondPanelId} chart={secondChart}
          appendChart={this.appendChart}>
          {
            secondtPanelMode !== 'none'
            && <SplitContainer canvasScale={this.props.canvasScale} ref={this.secondContainerRef} charts={charts} hoverChartId={hoverChartId} updateStudioState={updateStudioState} mode={secondtPanelMode} />
          }
        </Panel>
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
    <div className='middleline' onMouseDownCapture={props.onDown} style={{ ...props.style, zIndex: 800 }}></div>
  );
}