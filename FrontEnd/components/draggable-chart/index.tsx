import * as React from 'react';
import { DragSource, DragSourceConnector, DragSourceMonitor, ConnectDragSource } from 'react-dnd';
import { IChartProps, Chart } from '@components/chart';
import { CHART } from '@lib/dragtype';

interface IProps extends IChartProps {
  connectDragSource: ConnectDragSource;
}

interface IDraggableChart {
  left: string;
  top: string;
}

class RawDraggableChart extends React.Component<IProps, undefined> {
  render() {
    const { connectDragSource, ...props } = this.props;
    return connectDragSource(
      <div>
        <Chart {...props} />
      </div>
    );
  }
}

const source = {
  beginDrag(props: IProps): IDraggableChart {
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