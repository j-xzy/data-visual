import * as React from 'react';
import { DragSource, DragSourceConnector, DragSourceMonitor, ConnectDragSource, ConnectDragPreview } from 'react-dnd';
import { PREVIEW_CHART } from '@lib/dragtype';
import { IChartPreview, IChartOption, Controls } from '@lib/chart';
import { ChartPreview } from '@components/chart-preview';

interface IProps extends IChartPreview {
  connectDragSource: ConnectDragSource;
  connectDragPreview: ConnectDragPreview;
}

export interface IBeginDragResult {
  option: IChartOption;
  imgSrc: string;
  controls: Controls;
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
  beginDrag(props: IProps): IBeginDragResult {
    return {
      option: props.option,
      imgSrc: props.imgSrc,
      controls: props.controls
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