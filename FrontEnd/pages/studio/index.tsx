import * as React from 'react';
import Leftbar from '@components/leftbar';
import Setting from '@components/setting';
import { Canvas } from '@components/canvas';

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

export const Context: React.Context<IContextValue> = React.createContext();

export class Studio extends React.Component<undefined, IStudioState> {
  constructor() {
    super(undefined);
    this.updateCanvasPos = this.updateCanvasPos.bind(this);
    this.changeCanvasSize = this.changeCanvasSize.bind(this);
  }

  state = {
    canvasSize: DEFAULT_CANVASSIZE
  };

  private canvasPos = {
    paddingLeft: '0px',
    paddingTop: '0px'
  };

  private contentNode: HTMLElement;

  private contextValue: IContextValue = {
    defaultCanvasSize: DEFAULT_CANVASSIZE,
    updateCanvasPos: this.updateCanvasPos.bind(this),
    changeCanvasSize: this.changeCanvasSize.bind(this)
  };

  updateCanvasPos() {
    const { width, height } = document.defaultView.getComputedStyle(this.contentNode, null);
    const { canvasSize } = this.state;
    let canvasWidth = canvasSize.width,
      canvasHeight = canvasSize.height,
      paddingLeft = (parseFloat(width) - parseFloat(canvasWidth)) / 2 + 'px',
      paddingTop = (parseFloat(height) - parseFloat(canvasHeight)) / 2 + 'px';
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
    const { canvasSize } = this.state;

    return (
      <Context.Provider value={this.contextValue}>
        <div className='studio'>
          <div className='leftbar_container'>
            <Leftbar />
          </div>
          <div ref={(node) => this.contentNode = node} className='st_content'>
            <Canvas width={canvasSize.width} height={canvasSize.height} />
          </div>
          <div className='setting_container'>
            <Setting />
          </div>
        </div>
      </Context.Provider>
    );
  }
}