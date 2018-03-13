import * as React from 'react';
import { DropTarget, DropTargetConnector, DropTargetMonitor, ConnectDropTarget } from 'react-dnd';
import { PREVIEW_CHART } from '@lib/dragtype';
import { IChartPreview } from '@lib/chart';
import './style.styl';

import * as s from '@charts/pie/normal'

export interface ICanvasProps {
  width: string;
  height: string;
  canvasScale: number;
  connectDropTarget?: ConnectDropTarget;
}

interface ICanvasState {
  charts: any;
}

export class RawCanvas extends React.Component<ICanvasProps, ICanvasState> {
  constructor(props: ICanvasProps) {
    super(props);
    this.state = {
      charts: []
    };
  }

  renderCharts(path: string) {
    import('@charts/pie/normal').then((c) => {
      console.log(c);
      this.setState({
        charts: <c.default />
      });
    });
  }

  render() {
    const { width, height, canvasScale, connectDropTarget } = this.props;
    return connectDropTarget(
      <div className='canvas_container' style={{ width, height, transform: `scale(${canvasScale})` }}>
        <div className='canvas'>
          {this.state.charts}
        </div>
      </div>
    );
  }
}

const boxTarget = {
  drop(pros: ICanvasProps, monitor: DropTargetMonitor, component: RawCanvas) {
    const item = monitor.getItem() as IChartPreview;
    component.renderCharts(item.path);
    // component.setState({
    //   charts: [item.path]
    // });
  }
};

function collect(connect: DropTargetConnector, monitor: DropTargetMonitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

export const Canvas = DropTarget<ICanvasProps>(PREVIEW_CHART, boxTarget, collect)(RawCanvas);