import * as React from 'react';
import Leftbar from '@components/leftbar';
import Setting from '@components/setting';
import { Canvas } from '@components/canvas';
import { ScaleScroller } from '@components/scale-scroller';

import './style.styl';

export type CanvasPos = {
  paddingLeft: string,
  paddingTop: string
};

export type CanvasSize = {
  width: string,
  height: string
};

export interface IStudioState {
  canvasSize: CanvasSize;
  canvasScale: number;
}

export interface IChangeCanvasSize {
  (width: string, height: string): void;
}

export interface IContextValue {
  defaultCanvasSize: CanvasSize;
  updateCanvasPos: () => void;
  changeCanvasSize: IChangeCanvasSize;
}

const DEFAULT_CANVASSIZE: CanvasSize = {
  width: '800px',
  height: '600px'
};
const DEFAULT_CANVASSCALE = 1;

export const Context: React.Context<IContextValue> = React.createContext();

export class Studio extends React.Component<undefined, IStudioState> {
  constructor() {
    super(undefined);
    this.updateCanvasPos = this.updateCanvasPos.bind(this);
    this.changeCanvasSize = this.changeCanvasSize.bind(this);
    this.changeCanvasScale = this.changeCanvasScale.bind(this);
  }

  state = {
    canvasSize: DEFAULT_CANVASSIZE,
    canvasScale: DEFAULT_CANVASSCALE
  };

  private contentNode: HTMLElement;

  private contextValue: IContextValue = {
    defaultCanvasSize: DEFAULT_CANVASSIZE,
    updateCanvasPos: this.updateCanvasPos.bind(this),
    changeCanvasSize: this.changeCanvasSize.bind(this)
  };

  updateCanvasPos() {
    const { width, height } = document.defaultView.getComputedStyle(this.contentNode, null);
    const { canvasSize, canvasScale } = this.state;
    let canvasWidth = parseFloat(canvasSize.width) * canvasScale,
      canvasHeight = parseFloat(canvasSize.height) * canvasScale,
      paddingLeft = (parseFloat(width) - canvasWidth) / 2 + 'px',
      paddingTop = (parseFloat(height) - canvasHeight) / 2 + 'px';
    paddingLeft = parseFloat(paddingLeft) < 0 ? '50px' : paddingLeft;
    paddingTop = parseFloat(paddingTop) < 0 ? '50px' : paddingTop;
    this.contentNode.style.paddingLeft = paddingLeft;
    this.contentNode.style.paddingTop = paddingTop;
  }

  changeCanvasSize(width: string, height: string) {
    this.setState({
      canvasSize: {
        width: width,
        height: height
      }
    });
  }

  changeCanvasScale(scale: number) {
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
    const { canvasSize, canvasScale } = this.state;

    return (
      <Context.Provider value={this.contextValue}>
        <div className='studio'>
          <div className='leftbar_container'>
            <Leftbar />
          </div>
          <div className='st_content'>
            <div ref={(node) => this.contentNode = node} className='canvas_wrapper'>
              <Canvas canvasScale={canvasScale} width={canvasSize.width} height={canvasSize.height} />
            </div>
            <div className='scroll-wrapper' >
              <div className='scroll-postion'>
                <ScaleScroller defaultValue={DEFAULT_CANVASSCALE} onChange={this.changeCanvasScale} />
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