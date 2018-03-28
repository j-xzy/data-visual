import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Slider from '@base/slider';
import Leftbar from '@pages/studio/leftbar';
import { Canvas } from '@pages/studio/canvas';
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

export interface ITransformTool {
  position: {
    left: number;
    top: number;
  };
  size: CanvasSizeType;
}

export interface IStudioState {
  canvasSize: CanvasSizeType;
  canvasScale: number;
  charts: Charts;
  choosedChartIndex: number;
  hoverChartIndex: number;
}

export interface IUpdateStudioState {
  (state: Partial<IStudioState>, callback?: () => void): void;
}

export interface IContextValue {
  canvasSize: CanvasSizeType;
  charts: Charts;
  choosedChartIndex: number;
  updateCanvasPos: () => void;
  updateStudioState: IUpdateStudioState;
}

const DEFAULT_CANVASSIZE: CanvasSizeType = {
  width: 800,
  height: 600
};

const DEFAULT_CANVASSCALE = 1;
export const NO_CHOOSED_CHART = -1;
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
    this.state = {
      canvasSize: DEFAULT_CANVASSIZE,
      canvasScale: DEFAULT_CANVASSCALE,
      charts: [],
      choosedChartIndex: NO_CHOOSED_CHART,
      hoverChartIndex: NO_HOVER_CHART
    };
  }

  private contentNode: HTMLElement;

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

  updateStudioState(state: IStudioState, callback: () => void) {
    this.setState({ ...state }, () => { typeof callback === 'function' && callback(); });
  }

  handleContentClick() {
    this.setState({ choosedChartIndex: NO_CHOOSED_CHART });
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateCanvasPos);
    this.updateCanvasPos();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateCanvasPos);
  }

  componentDidUpdate() {
    this.updateCanvasPos();
  }

  render() {
    const { canvasSize, canvasScale, charts, choosedChartIndex, hoverChartIndex } = this.state;
    return (
      <Context.Provider value={{
        canvasSize: this.state.canvasSize,
        charts: this.state.charts,
        choosedChartIndex: this.state.choosedChartIndex,
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
                canvasScale={canvasScale} width={canvasSize.width} hoverChartIndex={hoverChartIndex}
                height={canvasSize.height} charts={charts} updateStudioState={this.updateStudioState}
                choosedChartIndex={choosedChartIndex} >
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