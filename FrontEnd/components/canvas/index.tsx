import * as React from 'react';

import './style.styl';

export interface ICanvasProps {
  width: string;
  height: string;
  canvasScale: number;
}

export interface ICanvasState {
}

export class Canvas extends React.Component<ICanvasProps, ICanvasState> {
  constructor(props: ICanvasProps) {
    super(props);
  }
  render() {
    const { width, height, canvasScale } = this.props;
    return (
      <div className='canvas_container' style={{ width, height, transform: `scale(${canvasScale})` }}>
        <div className='canvas'></div>
      </div>
    );
  }
}