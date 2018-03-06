import * as React from 'react';

import './style.styl';

export interface ICanvasProps {
  width: string;
  height: string;
}

export interface ICanvasState {
}

export class Canvas extends React.Component<ICanvasProps, ICanvasState> {
  constructor(props: ICanvasProps) {
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