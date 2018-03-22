import * as React from 'react';
import { DragSource, DragSourceConnector, DragSourceMonitor, ConnectDragSource, ConnectDragPreview } from 'react-dnd';
import { PREVIEW_CHART } from '@lib/dragtype';
import { IChartPreview } from '@components/chart-preview';
import { ChartPreview } from '@components/chart-preview';

interface IProps extends IChartPreview {
  connectDragSource: ConnectDragSource;
  connectDragPreview: ConnectDragPreview;
}

export interface IDraggableChartPreivewResult {
  option: {};
}

class RawDragableChartPreview extends React.Component<IProps, undefined> {
  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
    const img: any = new Image();
    img.src = this.props.imgSrc;
    img.onload = () => this.props.connectDragPreview(img);
  }

  render() {
    const { connectDragSource, ...props } = this.props;
    return connectDragSource(
      <div>
        <ChartPreview {...props} />
      </div>
    );
  }
}

const source = {
  beginDrag(props: IProps): IDraggableChartPreivewResult {
    return {
      option: props.option
    };
  }
};

function collect(connect: DragSourceConnector, monitor: DragSourceMonitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview()
  };
}

export const DragableChartPreview = DragSource<IChartPreview>(PREVIEW_CHART, source, collect)(RawDragableChartPreview);