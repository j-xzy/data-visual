import * as React from 'react';
import { DropTarget, DropTargetConnector, DropTargetMonitor, ConnectDropTarget } from 'react-dnd';
import { SPLIT } from '@lib/dragtype';
import { Mode, IDraggableSplitResult } from '@container/draggable-split';

interface IProps extends ISplitProps {
  connectDropTarget: ConnectDropTarget;
}

interface ISplitProps {
  borderType?: 'right' | 'bottom' | 'none';
  onDrop: (mode: string) => void;
  size: {
    height?: string;
    width?: string;
  };
}

export class Panel extends React.Component<IProps, undefined> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { connectDropTarget, borderType, size } = this.props;
    let borderStyle = {
      borderRight: 'none',
      borderBottom: 'none'
    };

    if (borderType === 'right') {
      borderStyle.borderRight = '1px solid #000';

    }
    if (borderType === 'bottom') {
      borderStyle.borderBottom = '1px solid #000';
    }

    return connectDropTarget(
      <div style={{ ...borderStyle, ...size }}>{this.props.children}</div>
    );
  }
}

const PanelTarget = {
  drop(props: ISplitProps, monitor: DropTargetMonitor) {
    if (!monitor.didDrop()) {
      props.onDrop((monitor.getItem() as IDraggableSplitResult).mode);
    }
  }
};

function collect(connect: DropTargetConnector, monitor: DropTargetMonitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

export default DropTarget<ISplitProps>(SPLIT, PanelTarget, collect)(Panel);