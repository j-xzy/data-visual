import * as React from 'react';
import update from 'immutability-helper';
import { Tooltip } from 'antd';
import LayerItem from '@container/draggable-layer-item';
import { Charts, IUpdateStudioState, NO_HOVER_CHART } from '@pages/studio';
import { IChartConfig } from '@components/chart';

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

export default class RawLayer extends React.Component<IProps, IState> {
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
    this.changeZIndex = this.changeZIndex.bind(this);

    this.state = {
      charts: []
    };
  }

  handleClick(e: React.MouseEvent<HTMLDivElement>, id: number) {
    const { updateStudioState, choosedChartIds } = this.props;
    if (e.ctrlKey === true) {
      this.props.updateStudioState({ choosedChartIds: [...choosedChartIds, id] });
    } else {
      this.props.updateStudioState({ choosedChartIds: [id] });
    }
  }

  handleMouseEnter(id: number) {
    const charts = this.state.charts;
    this.props.updateStudioState({
      hoverChartId: id
    });
  }

  handleMouseLeave() {
    this.props.updateStudioState({
      hoverChartId: NO_HOVER_CHART
    });
  }

  handleDeleteClick() {
    const { choosedChartIds, updateStudioState, charts } = this.props;
    if (choosedChartIds.length === 0)
      return;

    let newCharts: IChartConfig[] = [];
    charts.forEach((chart, idx) => {
      choosedChartIds.indexOf(chart.id) === -1 && newCharts.push(chart);
    });
    updateStudioState({
      charts: newCharts
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

  changeZIndex(zIndexType: ZIndexType) {
    const { choosedChartIds, updateStudioState, charts } = this.props;
    if (choosedChartIds.length === 0)
      return;

    let newCharts: IChartConfig[] = [];
    for (let i = 0, length = charts.length; i < length; i++) {
      const chart = charts[i];
      const id = chart.id;
      if (choosedChartIds.indexOf(id) === -1) {
        newCharts.push(chart);
        continue;
      }
      if (zIndexType === ZIndexType.Top) {

      }
      if (zIndexType === ZIndexType.Bottom) {

      }
      if (zIndexType === ZIndexType.Up) {

      }
      if (zIndexType === ZIndexType.Down) {

      }
    }
  }

  shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    return true;
  }

  componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.charts !== this.props.charts) {
      this.setState({ charts: [...nextProps.charts].reverse() });
    }
  }

  renderLayer() {
    const charts = [...this.state.charts];
    const { choosedChartIds } = this.props;
    return charts.map((chart, idx) => {
      const checked = choosedChartIds.indexOf(chart.id) !== -1;
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
            <i className='icon-up down icon' onClick={() => this.changeZIndex(ZIndexType.Down)}></i>
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