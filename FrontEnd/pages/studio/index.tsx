import * as React from 'react';
import Leftbar from '@components/leftbar';
import Setting from '@components/setting';
import Canvas from '@components/canvas';

import './style.styl';

type CanvasPos = {
  paddingLeft: string,
  paddingTop: string
};

type CanvasSize = {
  width: string,
  height: string
};

interface StudioState {
  canvasPos: CanvasPos;
  canvasSize: CanvasSize;
}

export default class Studio extends React.Component<undefined, StudioState> {
  constructor() {
    super(undefined);
    this.updateCanvasPos = this.updateCanvasPos.bind(this);
    this.state = {
      canvasSize: {
        width: '1024px',
        height: '800px'
      },
      canvasPos: {
        paddingLeft: '0px',
        paddingTop: '0px'
      }
    };
  }

  private contentNode: HTMLElement;

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
    );
  }
}