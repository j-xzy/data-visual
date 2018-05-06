import * as React from 'react';
import { findDOMNode } from 'react-dom';
import { DropTarget, DropTargetConnector, DropTargetMonitor, ConnectDropTarget } from 'react-dnd';
import { IBeginDragResult as IDraggableChartPreivewResult } from '@container/draggable-chart-preview';
import { SPLIT, PREVIEW_CHART } from '@lib/dragtype';
import { IDraggableSplitResult, Mode } from '@container/draggable-split';
import { IChartConfig, Chart } from '@components/chart';

export type BorderType = 'right' | 'bottom' | 'none';

interface IProps extends ISplitProps {
  connectDropTarget: ConnectDropTarget;
}

interface ISplitProps {
  borderType: BorderType;
  onDrop: (mode: Mode) => void;
  onChartClick: (e: React.MouseEvent<HTMLDivElement>, id: number) => void;
  onTrashcanClick: (id: number) => void;
  size: {
    height?: string;
    width?: string;
  };
  appendChart: (chart: IChartConfig) => void;
  chart: IChartConfig;
  choosed: boolean;
  masked: boolean;
  id: number;
}

export class RawPanel extends React.Component<IProps, undefined> {
  constructor(props: IProps) {
    super(props);
    this.handleChartClick = this.handleChartClick.bind(this);
  }

  handleChartClick(e: React.MouseEvent<HTMLElement>, id: number) {
    e.stopPropagation();
  }

  renderChart() {
    const { chart, id, masked, onChartClick } = this.props;
    return <Chart  {...chart} onChartClick={onChartClick} id={id} key={id} isMask={masked} index={1} />;
  }

  render() {
    const { connectDropTarget, borderType, size, chart, choosed, onTrashcanClick, id } = this.props;

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
      <div className='split_panel' style={{ ...borderStyle, ...size }} >
        {chart ? this.renderChart() : this.props.children}
        {
          choosed &&
          <div className='split_tool' onClick={(e) => e.stopPropagation()}>
            <i className='icon-trashcan icon panel_icon' onClick={() => onTrashcanClick(id)}></i>
          </div>
        }
      </div>
    );
  }
}

const PanelTarget = {
  drop(props: ISplitProps, monitor: DropTargetMonitor, component: RawPanel) {
    if (monitor.didDrop()) return;

    if (monitor.getItemType() === SPLIT) {
      props.onDrop((monitor.getItem() as IDraggableSplitResult).mode);
      return;
    }

    if (monitor.getItemType() === PREVIEW_CHART) {
      if (props.chart) return;

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
        colorFromGlobal: true,
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

export const Panel = DropTarget<ISplitProps>([SPLIT, PREVIEW_CHART], PanelTarget, collect)(RawPanel);