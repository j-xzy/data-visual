import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Slider from '@base/slider';
import Leftbar from '@pages/studio/leftbar';
import { Canvas } from '@pages/studio/canvas';
import Setting from '@pages/studio/setting';

import './style.styl';

export type CanvasPos = {
  paddingLeft: string,
  paddingTop: string
};

export type CanvasSizeType = {
  width: number,
  height: number
};

export interface IStudioState {
  canvasSize: CanvasSizeType;
  isShowTransformTool: boolean;
  canvasScale: number;
}

export interface IChangeCanvasSize {
  (width: number, height: number): void;
}

export interface IContextValue {
  canvasSize: CanvasSizeType;
  updateCanvasPos: () => void;
  changeCanvasSize: IChangeCanvasSize;
}

const DEFAULT_CANVASSIZE: CanvasSizeType = {
  width: 800,
  height: 600
};
const DEFAULT_CANVASSCALE = 1;
const MIN_SCALE_VALUE = 0.1;
const MAX_SCALE_VALUE = 20;

export const Context: React.Context<IContextValue> = React.createContext();

class RawStudio extends React.Component<undefined, IStudioState> {
  constructor() {
    super(undefined);
    this.updateCanvasPos = this.updateCanvasPos.bind(this);
    this.changeCanvasSize = this.changeCanvasSize.bind(this);
    this.handleScaleChange = this.handleScaleChange.bind(this);
    this.handleCanvasWheel = this.handleCanvasWheel.bind(this);
    this.handleContentClick = this.handleContentClick.bind(this);
    this.showTransformTool = this.showTransformTool.bind(this);
    this.hideTransformTool = this.hideTransformTool.bind(this);

    this.state = {
      canvasSize: DEFAULT_CANVASSIZE,
      canvasScale: DEFAULT_CANVASSCALE,
      isShowTransformTool: false
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

  changeCanvasSize(width: number, height: number) {
    this.setState({
      canvasSize: {
        width: width,
        height: height
      }
    });
  }

  handleCanvasWheel(e: React.WheelEvent<HTMLDivElement>) {
    const scale = this.state.canvasScale;
    if (e.deltaY > 0) {
      scale >= MIN_SCALE_VALUE && this.handleScaleChange(scale - 0.05);
    } else {
      scale <= MAX_SCALE_VALUE && this.handleScaleChange(scale + 0.05);
    }
  }

  handleContentClick() {
    this.hideTransformTool();
  }

  hideTransformTool() {
    this.setState({ isShowTransformTool: false });
  }

  showTransformTool() {
    this.setState({ isShowTransformTool: true });
  }

  handleScaleChange(scale: number) {
    this.setState({ canvasScale: scale });
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
    const { canvasSize, canvasScale, isShowTransformTool } = this.state;
    return (
      <Context.Provider value={{
        canvasSize: this.state.canvasSize,
        updateCanvasPos: this.updateCanvasPos.bind(this),
        changeCanvasSize: this.changeCanvasSize.bind(this)
      }}>
        <div className='studio'>
          <div className='leftbar_container'>
            <Leftbar />
          </div>
          <div className='st_content' onClick={this.handleContentClick}>
            <div ref={(node) => this.contentNode = node} className='canvas_wrapper'>
              <Canvas
                onChartClick={this.showTransformTool} isShowTransformTool={isShowTransformTool}
                onWheel={this.handleCanvasWheel} canvasScale={canvasScale} hideTransformTool={this.hideTransformTool}
                width={canvasSize.width} height={canvasSize.height} >
              </Canvas>
            </div>
            <div className='scroll-wrapper' >
              <div className='scroll-postion'>
                <Slider step={0.1} width={200} maxValue={MAX_SCALE_VALUE} minValue={MIN_SCALE_VALUE} value={canvasScale} onChange={this.handleScaleChange} />
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