import * as React from 'react';
import { DragSource, DragSourceConnector, DragSourceMonitor, ConnectDragSource } from 'react-dnd';
import { IChartProps, Chart } from '@components/chart';
import { CHART } from '@lib/dragtype';

export interface IDraggableChartProps extends IChartProps {
  connectDragSource?: ConnectDragSource;
  key?: any;
  left: string;
  top: string;
}

export interface IDraggableChartResult {
  left: string;
  top: string;
}

class RawDraggableChart extends React.Component<IDraggableChartProps, undefined> {
  render() {
    const { connectDragSource, key, width, height, option } = this.props;
    let { left, top } = this.props;
    left = parseFloat(left) - parseFloat(width) / 2 + 'px',
      top = parseFloat(top) - parseFloat(height) / 2 + 'px';
    return connectDragSource(
      <div key={key} style={{ top, left, position: 'absolute' }}>
        <Chart width={width} height={height} option={option} />
      </div>
    );
  }
}

const source = {
  beginDrag(props: IDraggableChartProps): IDraggableChartResult {
    return {
      left: props.left,
      top: props.top
    };
  }
};

function collect(connect: DragSourceConnector, monitor: DragSourceMonitor) {
  return {
    connectDragSource: connect.dragSource()
  };
}

export const DraggableChart = DragSource<IChartProps>(CHART, source, collect)(RawDraggableChart);