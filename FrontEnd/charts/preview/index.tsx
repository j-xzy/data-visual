import * as React from 'react';
import { DragSource, DragSourceConnector, DragSourceMonitor, ConnectDragSource, ConnectDragPreview } from 'react-dnd';
import { PREVIEW_CHART } from '@lib/dragtype';
import './style.styl';
import { IconProps } from 'antd/lib/icon';

interface IProps {
  imgSrc: string;
  name: string;
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
      name: props.name
    };
  }
};

function collect(connect: DragSourceConnector, monitor: DragSourceMonitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview()
  };
}

const PreviewContainer = DragSource<IProps>(PREVIEW_CHART, source, collect)(RawPreviewContainer);

export default PreviewContainer;