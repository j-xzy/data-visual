import * as React from 'react';
import update from 'immutability-helper';
import { Tooltip } from 'antd';
import LayerItem from '@container/draggable-layer-item';
import { Charts, IUpdateStudioState, NO_HIGHLIGHT_CHART } from '@pages/studio';
import { IChartConfig } from '@components/chart';
import * as tools from '@lib/tools';

import './style.styl';

interface IProps {
  charts: Charts;
  choosedChartIds: ReadonlyArray<number>;
  updateStudioState: IUpdateStudioState;
}

interface IState {
  charts: Charts;
}
enum ZIndexType { Top, Bottom, Up, Down }

export default class Layer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.renderLayer = this.renderLayer.bind(this);
    this.moveChart = this.moveChart.bind(this);
    this.moveDone = this.moveDone.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.handleCheckChange = this.handleCheckChange.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.topZIndex = this.topZIndex.bind(this);
    this.bottomZIndex = this.bottomZIndex.bind(this);
    this.upZIndex = this.upZIndex.bind(this);
    this.downZIndex = this.downZIndex.bind(this);
    this.changeZIndex = this.changeZIndex.bind(this);

    this.state = {
      charts: []
    };
  }

  handleClick(e: React.MouseEvent<HTMLDivElement>, id: number) {
    const { choosedChartIds } = this.props;
    let ids: number[] = [];
    if (e.ctrlKey === true) {
      const idx = choosedChartIds.indexOf(id);
      if (idx !== -1) {
        ids = [...choosedChartIds];
        ids.splice(idx, 1);
      } else {
        ids = [...choosedChartIds, id];
      }
    } else {
      ids = [id];
    }
    this.props.updateStudioState({ choosedChartIds: ids });
  }

  handleMouseEnter(id: number) {
    this.props.updateStudioState({
      highlightChartId: id
    });
  }

  handleMouseLeave() {
    this.props.updateStudioState({
      highlightChartId: NO_HIGHLIGHT_CHART
    });
  }

  handleDeleteClick() {
    const { choosedChartIds, updateStudioState, charts } = this.props;
    if (choosedChartIds.length === 0)
      return;

    let newCharts: IChartConfig[] = [];
    charts.forEach((chart, idx) => {
      !choosedChartIds.includes(chart.id) && newCharts.push(chart);
    });
    updateStudioState({
      charts: newCharts,
      choosedChartIds: []
    });
  }

  handleCheckChange(id: number, checked: boolean) {
    const { updateStudioState, choosedChartIds } = this.props;
    let newIds = [...choosedChartIds];
    checked ? newIds.push(id) : newIds.splice(newIds.indexOf(id), 1);
    updateStudioState({
      choosedChartIds: newIds
    });
  }

  moveChart(dragIndex: number, hoverIndex: number) {
    const charts = this.state.charts;
    const dragChart = charts[dragIndex];
    this.setState({
      charts: update(charts, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragChart]]
      })
    });
  }

  moveDone() {
    const charts = [...this.state.charts];
    this.props.updateStudioState({
      charts: update(charts, {
        $set: charts.reverse()
      })
    });
  }

  changeZIndex(type: ZIndexType) {
    const { charts, choosedChartIds, updateStudioState } = this.props;
    let newCharts = [...charts];
    if (choosedChartIds.length === 0) return;

    switch (type) {
      case ZIndexType.Top: this.topZIndex(choosedChartIds, newCharts); break;
      case ZIndexType.Bottom: this.bottomZIndex(choosedChartIds, newCharts); break;
      case ZIndexType.Up: this.upZIndex(choosedChartIds, newCharts); break;
      case ZIndexType.Down: this.downZIndex(choosedChartIds, newCharts); break;
    }

    updateStudioState({
      charts: newCharts
    });
  }

  topZIndex(choosedChartIds: ReadonlyArray<number>, newCharts: IChartConfig[]) {
    for (let i = 0, length = newCharts.length; i < length;) {
      const id = newCharts[i].id;
      if (choosedChartIds.includes(id)) {
        tools.topIndex(newCharts, i);
        length--;
      } else {
        i++;
      }
    }
    return newCharts;
  }

  bottomZIndex(choosedChartIds: ReadonlyArray<number>, newCharts: IChartConfig[]) {
    if (choosedChartIds.length === 0) return;
    for (let i = newCharts.length - 1, n = 0; i >= n;) {
      const id = newCharts[i].id;
      if (choosedChartIds.includes(id)) {
        tools.bottomIndex(newCharts, i);
        n++;
      } else {
        i--;
      }
    }
    return newCharts;
  }

  upZIndex(choosedChartIds: ReadonlyArray<number>, newCharts: IChartConfig[]) {
    for (let i = newCharts.length - 2; i >= 0; i--) {
      const id = newCharts[i].id;
      if (choosedChartIds.includes(id)) {
        if (!choosedChartIds.includes(newCharts[i + 1].id))
          tools.swap(newCharts, i, i + 1);
      }
    }
    return newCharts;
  }

  downZIndex(choosedChartIds: ReadonlyArray<number>, newCharts: IChartConfig[]) {
    for (let i = 1; i < newCharts.length; i++) {
      const id = newCharts[i].id;
      if (choosedChartIds.includes(id)) {
        if (!choosedChartIds.includes(newCharts[i - 1].id))
          tools.swap(newCharts, i, i - 1);
      }
    }
    return newCharts;
  }

  componentWillReceiveProps(nextProps: IProps, prevState: IState) {
    if (nextProps.charts !== this.props.charts) {
      this.setState({ charts: [...nextProps.charts].reverse() });
    }
  }

  renderLayer() {
    const charts = [...this.state.charts];
    const { choosedChartIds } = this.props;
    return charts.map((chart, idx) => {
      const checked = choosedChartIds.includes(chart.id);
      return (
        <LayerItem
          onCheckChange={this.handleCheckChange}
          onClick={this.handleClick} moveDone={this.moveDone} checked={checked} id={chart.id}
          moveChart={this.moveChart} key={chart.id} onMouseLeave={this.handleMouseLeave}
          index={idx} imgSrc={chart.imgSrc} onMouseEnter={this.handleMouseEnter} >
        </LayerItem>
      );
    });
  }

  render() {
    return (
      <div className='layer_container'>
        <div className='layer_order_wrapper layer_wrapper'>
          <Tooltip title='置顶'>
            <i className='icon-top icon' onClick={() => this.changeZIndex(ZIndexType.Top)}></i>
          </Tooltip>
          <Tooltip title='置底'>
            <i className='icon-bottom icon' onClick={() => this.changeZIndex(ZIndexType.Bottom)}></i>
          </Tooltip>
          <Tooltip title='上移一层'>
            <i className='icon-up icon' onClick={() => this.changeZIndex(ZIndexType.Up)}></i>
          </Tooltip>
          <Tooltip title='下移一层'>
            <i className='icon-down down icon' onClick={() => this.changeZIndex(ZIndexType.Down)}></i>
          </Tooltip>
        </div>
        <div className='layer_list'>
          {this.renderLayer()}
        </div>
        <div onClick={this.handleDeleteClick} className='layer_delete_wrapper layer_wrapper'>
          <i className='icon-trashcan'></i>
          <span>删除</span>
        </div>
      </div>
    );
  }
}