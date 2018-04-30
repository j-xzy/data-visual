import * as React from 'react';
import update from 'immutability-helper';
import Panel from './panel';
import { Mode } from '@container/draggable-split';
import { IUpdateStudioState } from '@pages/studio';
import { IChartConfig } from '@components/chart';

import './style.styl';

type Size = {
  width?: string;
  height?: string;
};

interface IState {
  firstPanelMode: Mode | 'none';
  secondtPanelMode: Mode | 'none';
  firstPanelSize: Size;
  secondPanelSize: Size;
  topDelta: number;
  leftDelta: number;
}

interface IProps {
  mode: Mode | 'none';
  updateStudioState: IUpdateStudioState;
  charts: ReadonlyArray<IChartConfig>;
  hoverChartId: number;
}

export default class SplitContainer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleFirstDrop = this.handleFirstDrop.bind(this);
    this.handleSecondDrop = this.handleSecondDrop.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleDown = this.handleDown.bind(this);
    this.appendChart = this.appendChart.bind(this);

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
    this.secondPanelId = Date.now() + 0.1;
  }

  isOnChangeSize = false;
  elRef: React.RefObject<HTMLDivElement> = React.createRef();
  firstPanelId: number;
  secondPanelId: number;

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

  handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (e.buttons !== 1 || !this.isOnChangeSize) {
      this.isOnChangeSize = false;
      return;
    }
    let x = e.clientX, y = e.clientY;
    let rect = this.elRef.current.getBoundingClientRect();
    let width = rect.width, height = rect.height,
      top = rect.top, left = rect.left;

    if (this.props.mode === 'horizontal') {
      let ratio = (y - top) / height * 100;
      this.setState({
        firstPanelSize: { height: ratio + '%' },
        secondPanelSize: { height: 100 - ratio + '%' }
      });
    } else {
      let ratio = (x - left) / width * 100;
      this.setState({
        firstPanelSize: { width: ratio + '%' },
        secondPanelSize: { width: 100 - ratio + '%' }
      });
    }
  }

  handleDown() {
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

    // find chart by id
    let firshtChart: IChartConfig, secondChart: IChartConfig;
    for (let i = 0, length = charts.length; i < length; i++) {
      if (charts[i].id === this.firstPanelId) {
        firshtChart = charts[i];
      }
      if (charts[i].id === this.secondPanelId) {
        secondChart = charts[i];
      }
    }

    return (
      <div className='split_container' onMouseMove={this.handleMove} ref={this.elRef} style={{ flexDirection }} >
        <Panel size={firstPanelSize} borderType={mode === 'vertical' ? 'right' : 'bottom'}
          onDrop={this.handleFirstDrop} hoverChartId={hoverChartId} chart={firshtChart} id={this.firstPanelId}
          appendChart={this.appendChart}>
          {
            firstPanelMode !== 'none'
            && <SplitContainer charts={charts} hoverChartId={hoverChartId} updateStudioState={updateStudioState} mode={firstPanelMode} />
          }
        </Panel>
        <MiddleLine style={middleStyle} onDown={this.handleDown} />
        <Panel size={secondPanelSize} hoverChartId={hoverChartId} onDrop={this.handleSecondDrop} id={this.secondPanelId} chart={secondChart}
          appendChart={this.appendChart}>
          {
            secondtPanelMode !== 'none'
            && <SplitContainer charts={charts} hoverChartId={hoverChartId} updateStudioState={updateStudioState} mode={secondtPanelMode} />
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