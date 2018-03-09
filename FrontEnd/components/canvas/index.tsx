import * as React from 'react';
import { DropTarget, DropTargetConnector, DropTargetMonitor, ConnectDropTarget } from 'react-dnd';
import { PREVIEW_CHART } from '@lib/dragtype';
import './style.styl';
import { IconProps } from 'antd/lib/icon';

export interface ICanvasProps {
  width: string;
  height: string;
  canvasScale: number;
  connectDropTarget?: ConnectDropTarget;
}

export interface ICanvasState {
}

export class RawCanvas extends React.Component<ICanvasProps, ICanvasState> {
  constructor(props: ICanvasProps) {
    super(props);
  }
  render() {
    const { width, height, canvasScale, connectDropTarget } = this.props;
    return connectDropTarget(
      <div className='canvas_container' style={{ width, height, transform: `scale(${canvasScale})` }}>
        <div className='canvas'></div>
      </div>
    );
  }
}

const boxTarget = {
  drop(pros: ICanvasProps, monitor: DropTargetMonitor) {
    const item: any = monitor.getItem();
    console.log(item.name);
  }
};

function collect(connect: DropTargetConnector, monitor: DropTargetMonitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

export const Canvas = DropTarget<ICanvasProps>(PREVIEW_CHART, boxTarget, collect)(RawCanvas);