import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget, DropTargetConnector, DropTargetMonitor, ConnectDropTarget } from 'react-dnd';
import { IBeginDragResult as IDraggableChartPreivewResult } from '@container/draggable-chart-preview';
import { SPLIT, PREVIEW_CHART } from '@lib/dragtype';
import { IDraggableSplitResult, Mode } from '@container/draggable-split';
import { IChartConfig, Chart } from '@components/chart';

interface IProps extends ISplitProps {
  connectDropTarget: ConnectDropTarget;
}

interface ISplitProps {
  borderType?: 'right' | 'bottom' | 'none';
  onDrop: (mode: Mode) => void;
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  size: {
    height?: string;
    width?: string;
  };
  appendChart: (chart: IChartConfig) => void;
  chart: IChartConfig;
  isMask: boolean;
  id: number;
}

export class Panel extends React.Component<IProps, undefined> {
  constructor(props: IProps) {
    super(props);
  }

  renderChart() {
    const { chart, id, isMask } = this.props;

    return <Chart {...chart} id={id} key={id} isMask={isMask} index={1} />;
  }

  render() {
    const { connectDropTarget, borderType, size, chart, onClick } = this.props;

    let borderStyle = {
      borderRight: 'none',
      borderBottom: 'none'
    };

    if (borderType === 'right') {
      borderStyle.borderRight = '1px solid #fff';

    }
    if (borderType === 'bottom') {
      borderStyle.borderBottom = '1px solid #fff';
    }

    return connectDropTarget(
      <div className='split_panel' style={{ ...borderStyle, ...size }} onClick={onClick}>
        {chart ? this.renderChart() : this.props.children}
      </div>
    );
  }
}

const PanelTarget = {
  drop(props: ISplitProps, monitor: DropTargetMonitor, component: Panel) {
    if (monitor.didDrop()) return;

    if (monitor.getItemType() === SPLIT) {
      props.onDrop((monitor.getItem() as IDraggableSplitResult).mode);
      return;
    }

    if (monitor.getItemType() === PREVIEW_CHART) {
      const item = monitor.getItem() as IDraggableChartPreivewResult;
      const style = window.getComputedStyle((findDOMNode(component) as Element), null);
      let width = parseFloat(style.width);
      let height = parseFloat(style.height);

      props.appendChart({
        ...item,
        mode: 'responsive',
        scale: { x: 1, y: 1 },
        size: { width, height },
        position: { top: 0, left: 0 },
        colorFromGlobal: false,
        id: props.id
      });
    }
  }
};

function collect(connect: DropTargetConnector, monitor: DropTargetMonitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

export default DropTarget<ISplitProps>([SPLIT, PREVIEW_CHART], PanelTarget, collect)(Panel);