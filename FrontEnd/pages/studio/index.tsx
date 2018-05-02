import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import { Alert } from 'antd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import Slider from '@base/slider';
import Leftbar from '@pages/studio/leftbar';
import { Canvas, OFFSET_POSITION } from '@pages/studio/canvas';
import Setting from '@pages/studio/setting';
import Banner from '@pages/studio/banner';
import { IChartConfig } from '@components/chart';
import { defaultColor } from '@charts';

import './style.styl';

export type CanvasPos = {
  paddingLeft: string,
  paddingTop: string
};

export type CanvasSizeType = {
  width: number,
  height: number
};

export type Charts = ReadonlyArray<IChartConfig>;

export interface IStudioState {
  canvasSize: CanvasSizeType;
  canvasScale: number;
  charts: Charts;
  colors: string[];
  choosedChartIds: ReadonlyArray<number>;
  highlightChartId: number;
}

export interface IUpdateStudioState {
  (state: Partial<IStudioState>, callback?: () => void): void;
}

export interface IContextValue {
  canvasSize: CanvasSizeType;
  charts: Charts;
  colors: string[];
  choosedChartIds: ReadonlyArray<number>;
  updateCanvasPos: () => void;
  updateStudioState: IUpdateStudioState;
}

const DEFAULT_CANVASSIZE: CanvasSizeType = {
  width: 800,
  height: 600
};

const DEFAULT_CANVASSCALE = 1;
export const NO_HIGHLIGHT_CHART = -1;
export const MIN_SCALE_VALUE = 0.01;
export const MAX_SCALE_VALUE = 10;

export const Context: React.Context<IContextValue> = React.createContext();

// chart'id map charts's index
export const idMapIndex: Map<number, number> = new Map();

// important: must use updateStudioState method to change state !!!
class RawStudio extends React.Component<undefined, IStudioState> {
  constructor() {
    super(undefined);
    this.updateCanvasPos = this.updateCanvasPos.bind(this);
    this.updateStudioState = this.updateStudioState.bind(this);
    this.handleContentClick = this.handleContentClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.deleteChoosedChart = this.deleteChoosedChart.bind(this);
    this.copyChoosedChart = this.copyChoosedChart.bind(this);
    this.toChartsClipboard = this.toChartsClipboard.bind(this);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.handleSliderPlusClick = this.handleSliderPlusClick.bind(this);
    this.handleSliderMinusClick = this.handleSliderMinusClick.bind(this);

    this.state = {
      canvasSize: DEFAULT_CANVASSIZE,
      canvasScale: DEFAULT_CANVASSCALE,
      colors: defaultColor,
      charts: [],
      choosedChartIds: [],
      highlightChartId: NO_HIGHLIGHT_CHART
    };
  }

  private contentRef: React.RefObject<HTMLDivElement> = React.createRef();

  // Note: id maybe duplicated in chartsClipboard,
  // so it will be re-assigned when copy
  private chartsClipboard: IChartConfig[] = [];

  updateCanvasPos() {
    const { width, height } = document.defaultView.getComputedStyle(this.contentRef.current, null);
    const { canvasSize, canvasScale } = this.state;
    let canvasWidth = canvasSize.width * canvasScale,
      canvasHeight = canvasSize.height * canvasScale,
      paddingLeft = (parseFloat(width) - canvasWidth) / 2 + 'px',
      paddingTop = (parseFloat(height) - canvasHeight) / 2 + 'px';
    paddingLeft = parseFloat(paddingLeft) < 0 ? '50px' : paddingLeft;
    paddingTop = parseFloat(paddingTop) < 0 ? '50px' : paddingTop;
    this.contentRef.current.style.paddingLeft = paddingLeft;
    this.contentRef.current.style.paddingTop = paddingTop;
  }

  updateStudioState: IUpdateStudioState = (state: IStudioState, callback?: () => void) => {
    // re-build map
    if (state.charts) {
      idMapIndex.clear();
      state.charts.forEach((chart, idx) => {
        idMapIndex.set(chart.id, idx);
      });
    }
    this.setState({ ...state }, () => { typeof callback === 'function' && callback(); });
  }

  handleContentClick() {
    this.updateStudioState({ choosedChartIds: [], highlightChartId: NO_HIGHLIGHT_CHART });
  }

  handleSliderChange(value: number) {
    this.updateStudioState({ canvasScale: value });
  }

  handleSliderPlusClick() {
    let canvasScale = this.state.canvasScale;
    this.updateStudioState({ canvasScale: canvasScale + 0.3 });
  }

  handleSliderMinusClick() {
    let canvasScale = this.state.canvasScale;
    this.updateStudioState({ canvasScale: canvasScale - 0.3 });
  }

  onKeyDown(e: KeyboardEvent) {
    if (e.target !== document.body) {
      return;
    }
    let key = e.key.toLocaleLowerCase();
    if (key === 'delete') {
      this.deleteChoosedChart();
    }
    if (e.ctrlKey && key === 'c') {
      this.toChartsClipboard();
    }
    if (e.ctrlKey && key === 'v') {
      this.copyChoosedChart();
    }
  }

  toChartsClipboard() {
    if (this.state.choosedChartIds.length === 0)
      return;

    const { charts, choosedChartIds } = this.state;
    this.chartsClipboard = [];

    charts.forEach((chart, idx) => {
      if (choosedChartIds.includes(chart.id)) {
        let chartConfig: IChartConfig;
        const { position: { left, top }, option, ...props } = chart;
        const position = {
          left: left + OFFSET_POSITION.left,
          top: top + OFFSET_POSITION.top
        };
        chartConfig = { option, position, ...props };
        this.chartsClipboard.push(chartConfig);
      }
    });
  }

  copyChoosedChart() {
    // reassign id
    let chartsClipboardCopyed: IChartConfig[] = [];
    for (let i = 0, length = this.chartsClipboard.length; i < length; i++) {
      chartsClipboardCopyed.push(Object.assign({}, this.chartsClipboard[i]));
      chartsClipboardCopyed[i].id = Date.now() + 1525010857275 + i;
    }

    this.updateStudioState({
      charts: update(this.state.charts, {
        $push: chartsClipboardCopyed
      }),
      choosedChartIds: (() => {
        return chartsClipboardCopyed.map(({ id }) => {
          return id;
        });
      })()
    });
  }

  deleteChoosedChart() {
    if (this.state.choosedChartIds.length === 0)
      return;
    let newCharts: IChartConfig[] = [];
    const { charts, choosedChartIds } = this.state;
    charts.forEach((chart, idx) => {
      !choosedChartIds.includes(chart.id) && newCharts.push(chart);
    });
    this.updateStudioState({ charts: newCharts, choosedChartIds: [] });
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateCanvasPos);
    window.addEventListener('keydown', this.onKeyDown);
    this.updateCanvasPos();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateCanvasPos);
    window.removeEventListener('keydown', this.onKeyDown);
  }

  componentDidUpdate() {
    this.updateCanvasPos();
  }

  render() {
    const { canvasSize, canvasScale, charts, choosedChartIds, highlightChartId, colors } = this.state;
    return (
      <Context.Provider value={{
        canvasSize: this.state.canvasSize,
        charts: this.state.charts,
        colors: this.state.colors,
        choosedChartIds: this.state.choosedChartIds,
        updateCanvasPos: this.updateCanvasPos.bind(this),
        updateStudioState: this.updateStudioState.bind(this)
      }}>
        <Banner charts={charts} canvasSize={canvasSize} />
        <div className='studio'>
          <div className='leftbar_container'>
            <Leftbar />
          </div>
          <div className='st_content' onClick={this.handleContentClick}>
            <div ref={this.contentRef} className='canvas_wrapper'>
              <Canvas
                canvasScale={canvasScale} size={canvasSize} highlightChartId={highlightChartId}
                charts={charts} updateStudioState={this.updateStudioState}
                choosedChartIds={choosedChartIds} colors={colors}>
              </Canvas>
            </div>
            <div className='scroll-wrapper' >
              <div className='scroll-postion'>
                <Slider step={0.01} width={200} maxValue={MAX_SCALE_VALUE} minValue={MIN_SCALE_VALUE}
                  value={canvasScale} onChange={this.handleSliderChange}
                  onMinusClick={this.handleSliderMinusClick} onPlusClick={this.handleSliderPlusClick} >
                </Slider>
              </div>
            </div>
          </div>
          <div className='setting_container'>
            <Setting />
          </div>
        </div>
      </Context.Provider>
    );
  }
}

export const Studio = DragDropContext(HTML5Backend)(RawStudio);