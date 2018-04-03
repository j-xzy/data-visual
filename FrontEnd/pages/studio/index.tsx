import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Slider from '@base/slider';
import Leftbar from '@pages/studio/leftbar';
import { Canvas, OFFSET_POSITION } from '@pages/studio/canvas';
import Setting from '@pages/studio/setting';
import { IChartConfig } from '@components/chart';

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
  choosedChartIds: ReadonlyArray<number>;
  hoverChartId: number;
}

export interface IUpdateStudioState {
  (state: Partial<IStudioState>, callback?: () => void): void;
}

export interface IContextValue {
  canvasSize: CanvasSizeType;
  charts: Charts;
  choosedChartIds: ReadonlyArray<number>;
  updateCanvasPos: () => void;
  updateStudioState: IUpdateStudioState;
}

const DEFAULT_CANVASSIZE: CanvasSizeType = {
  width: 800,
  height: 600
};

const DEFAULT_CANVASSCALE = 1;
export const NO_HOVER_CHART = -1;
export const MIN_SCALE_VALUE = 0.01;
export const MAX_SCALE_VALUE = 10;

export const Context: React.Context<IContextValue> = React.createContext();

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

    this.state = {
      canvasSize: DEFAULT_CANVASSIZE,
      canvasScale: DEFAULT_CANVASSCALE,
      charts: [],
      choosedChartIds: [],
      hoverChartId: NO_HOVER_CHART
    };
  }

  private contentNode: HTMLElement;
  private chartsClipboard: IChartConfig[] = [];

  updateCanvasPos() {
    const { width, height } = document.defaultView.getComputedStyle(this.contentNode, null);
    const { canvasSize, canvasScale } = this.state;
    let canvasWidth = canvasSize.width * canvasScale,
      canvasHeight = canvasSize.height * canvasScale,
      paddingLeft = (parseFloat(width) - canvasWidth) / 2 + 'px',
      paddingTop = (parseFloat(height) - canvasHeight) / 2 + 'px';
    paddingLeft = parseFloat(paddingLeft) < 0 ? '50px' : paddingLeft;
    paddingTop = parseFloat(paddingTop) < 0 ? '50px' : paddingTop;
    this.contentNode.style.paddingLeft = paddingLeft;
    this.contentNode.style.paddingTop = paddingTop;
  }

  updateStudioState(state: IStudioState, callback?: () => void) {
    this.setState({ ...state }, () => { typeof callback === 'function' && callback(); });
  }

  handleContentClick() {
    this.setState({ choosedChartIds: [] });
  }

  onKeyDown(e: KeyboardEvent) {
    if (e.key === 'Delete') {
      this.deleteChoosedChart();
    }
    if (e.ctrlKey && e.key === 'c') {
      this.toChartsClipboard();
    }
    if (e.ctrlKey && e.key === 'v') {
      this.copyChoosedChart();
    }
  }

  toChartsClipboard() {
    if (this.state.choosedChartIds.length === 0)
      return;

    const { charts, choosedChartIds } = this.state;
    this.chartsClipboard = [];

    charts.forEach((chart, idx) => {
      if (choosedChartIds.indexOf(chart.id) !== -1) {
        let chartConfig: IChartConfig;
        const { position: { left, top }, id, ...config } = chart;
        const position = {
          left: left + OFFSET_POSITION.left,
          top: top + OFFSET_POSITION.top
        };
        chartConfig = { ...config, position, id: Date.now() + 100000000 * idx };
        this.chartsClipboard.push(chartConfig);
      }
    });
  }

  copyChoosedChart() {
    this.setState(({ charts }) => {
      return {
        charts: [...charts, ...this.chartsClipboard],
        choosedChartIds: (() => {
          return this.chartsClipboard.map(({ id }) => {
            return id;
          });
        })()
      };
    });
  }

  deleteChoosedChart() {
    if (this.state.choosedChartIds.length === 0)
      return;
    this.setState(({ charts, choosedChartIds }) => {
      let newCharts: IChartConfig[] = [];
      charts.forEach((chart, idx) => {
        choosedChartIds.indexOf(chart.id) === -1 && newCharts.push(chart);
      });
      return {
        charts: newCharts
      };
    });
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
    const { canvasSize, canvasScale, charts, choosedChartIds, hoverChartId } = this.state;
    return (
      <Context.Provider value={{
        canvasSize: this.state.canvasSize,
        charts: this.state.charts,
        choosedChartIds: this.state.choosedChartIds,
        updateCanvasPos: this.updateCanvasPos.bind(this),
        updateStudioState: this.updateStudioState.bind(this)
      }}>
        <div className='studio'>
          <div className='leftbar_container'>
            <Leftbar />
          </div>
          <div className='st_content' onClick={this.handleContentClick}>
            <div ref={(node) => this.contentNode = node} className='canvas_wrapper'>
              <Canvas
                canvasScale={canvasScale} width={canvasSize.width} hoverChartId={hoverChartId}
                height={canvasSize.height} charts={charts} updateStudioState={this.updateStudioState}
                choosedChartIds={choosedChartIds} >
              </Canvas>
            </div>
            <div className='scroll-wrapper' >
              <div className='scroll-postion'>
                <Slider step={0.01} width={200} maxValue={MAX_SCALE_VALUE} minValue={MIN_SCALE_VALUE} value={canvasScale} updateStudioState={this.updateStudioState} />
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