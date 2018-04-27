import * as React from 'react';
import { DragSource, DragSourceConnector, DragSourceMonitor, ConnectDragSource, ConnectDragPreview } from 'react-dnd';
import { SPLIT } from '@lib/dragtype';
import './style.styl';

export type Mode = 'vertical' | 'horizontal';

interface IProps extends ISplitProps {
  connectDragSource: ConnectDragSource;
  connectDragPreview: ConnectDragPreview;
}

export interface IDraggableSplitResult {
  mode: Mode;
}

interface ISplitProps {
  mode: Mode;
}

class Split extends React.Component<IProps, undefined> {
  componentDidMount() {
    const img: any = new Image();
    img.src = require(`@assets/image/split-${this.props.mode}.png`);
    img.onload = () => this.props.connectDragPreview(img);
  }

  render() {
    const { mode, connectDragSource } = this.props;
    const cls = 'icon-split icon-split-' + mode;
    return connectDragSource(<span className={cls}></span>);
  }
}

const source = {
  beginDrag(props: IProps) {
    return {
      mode: props.mode
    };
  }
};

function collect(connect: DragSourceConnector, monitor: DragSourceMonitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview()
  };
}

export const DragableSplit = DragSource<ISplitProps>(SPLIT, source, collect)(Split);