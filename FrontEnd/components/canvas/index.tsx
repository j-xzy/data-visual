import * as React from 'react';

import './style.styl';

interface CanvasProps {
  width: string;
  height: string;
}

interface CanvasState {
}

export default class Canvas extends React.Component<CanvasProps, CanvasState> {
  constructor(props: CanvasProps) {
    super(props);
  }
  render() {
    const { width, height } = this.props;
    return (
      <div className='canvas_container' style={{width, height}}>
        <div className='canvas'></div>
      </div>
    );
  }
}