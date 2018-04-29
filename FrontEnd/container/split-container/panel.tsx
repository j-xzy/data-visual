import * as React from 'react';
import { DropTarget, DropTargetConnector, DropTargetMonitor, ConnectDropTarget } from 'react-dnd';
import { IBeginDragResult as IDraggableChartPreivewResult } from '@container/draggable-chart-preview';
import { SPLIT, PREVIEW_CHART } from '@lib/dragtype';
import { IDraggableSplitResult } from '@container/draggable-split';
import { IChartConfig, Chart } from '@components/chart';

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
  appendChart: (chart: IChartConfig) => void;
  hoverChartId: number;
  chart: IChartConfig;
  id: number;
}

export class Panel extends React.Component<IProps, undefined> {
  constructor(props: IProps) {
    super(props);
  }

  renderChart() {
    const { chart, id, hoverChartId } = this.props;
    const isMask = hoverChartId === id;
    return <Chart {...chart} onChartClick={() => { }} id={id} key={id} isMask={isMask} index={1} />;
  }

  render() {
    const { connectDropTarget, borderType, size, chart } = this.props;

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
      <div style={{ ...borderStyle, ...size }}>
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
      const { imgSrc, controls, type, seriesItemTemplate, option } = item;
      props.appendChart({ ...item, mode: 'responsive', scale: { x: 1, y: 1 }, size: { width: 1, height: 1 }, position: { top: 1, left: 1 }, colorFromGlobal: false, id: props.id });
    }
  }
};

function collect(connect: DropTargetConnector, monitor: DropTargetMonitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

export default DropTarget<ISplitProps>([SPLIT, PREVIEW_CHART], PanelTarget, collect)(Panel);