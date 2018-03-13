import * as React from 'react';
import { DragSource, DragSourceConnector, DragSourceMonitor, ConnectDragSource, ConnectDragPreview } from 'react-dnd';
import { PREVIEW_CHART } from '@lib/dragtype';
import { IChartPreview } from '@lib/chart';
import './style.styl';

interface IProps extends IChartPreview {
  connectDragSource?: ConnectDragSource;
  connectDragPreview?: ConnectDragPreview;
}

class RawPreviewContainer extends React.Component<IProps, undefined> {
  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
    const img: any = new Image();
    img.src = this.props.imgSrc;
    img.onload = () => this.props.connectDragPreview(img);
  }

  render() {
    const { connectDragSource, imgSrc, name } = this.props;
    return connectDragSource(
      <div className='preview-container'>
        <img src={imgSrc} />
        <span >{name}</span>
      </div>
    );
  }
}

const source = {
  beginDrag(props: IProps) {
    return {
      path: props.path,
      name: props.name,
      imgSrc: props.imgSrc
    };
  }
};

function collect(connect: DragSourceConnector, monitor: DragSourceMonitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview()
  };
}

export default DragSource<IProps>(PREVIEW_CHART, source, collect)(RawPreviewContainer);