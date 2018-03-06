import * as React from 'react';
import Leftbar from '@components/leftbar';
import Setting from '@components/setting';
import { Canvas } from '@components/canvas';

import './style.styl';

type CanvasPos = {
  paddingLeft: string,
  paddingTop: string
};

type CanvasSize = {
  width: string,
  height: string
};

interface IStudioState {
  canvasPos: CanvasPos;
  canvasSize: CanvasSize;
}

export const Context = React.createContext();

export class Studio extends React.Component<undefined, IStudioState> {
  constructor() {
    super(undefined);
  }

  state = {
    canvasSize: {
      width: '800px',
      height: '600px'
    },
    canvasPos: {
      paddingLeft: '0px',
      paddingTop: '0px'
    }
  };

  private contentNode: HTMLElement;

  private contextValue = {
    updateCanvasPos: this.updateCanvasPos.bind(this),
    changeCanvasSize: this.changeCanvasSize.bind(this),
    defaultCanvasSize: Object.assign({}, this.state.canvasSize)
  };

  updateCanvasPos() {
    let { width, height } = document.defaultView.getComputedStyle(this.contentNode, null);
    this.setState((preState) => {
      let canvasWidth = preState.canvasSize.width,
        canvasHeight = preState.canvasSize.height,
        paddingLeft = (parseFloat(width) - parseFloat(canvasWidth)) / 2 + 'px',
        paddingTop = (parseFloat(height) - parseFloat(canvasHeight)) / 2 + 'px';
      paddingLeft = parseFloat(paddingLeft) < 0 ? '50px' : paddingLeft;
      paddingTop = parseFloat(paddingTop) < 0 ? '50px' : paddingTop;
      return {
        canvasPos: { paddingLeft, paddingTop }
      };
    });
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

  render() {
    const { canvasSize, canvasPos } = this.state;
    return (
      <Context.Provider value={this.contextValue}>
        <div className='studio'>
          <div className='leftbar_container'>
            <Leftbar />
          </div>
          <div ref={(node) => this.contentNode = node} className='st_content' style={{ ...canvasPos }}>
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