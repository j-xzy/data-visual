import * as React from 'react';
import update from 'immutability-helper';
import LayerItem from '@container/draggable-layer-item';
import { Charts, IUpdateStudioState, NO_HOVER_CHART } from '@pages/studio';

import './style.styl';

interface IProps {
  charts: Charts;
  choosedChartIndex: number;
  updateStudioState: IUpdateStudioState;
}

interface IState {
  charts: Charts;
}

export default class RawLayer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.renderLayer = this.renderLayer.bind(this);
    this.moveChart = this.moveChart.bind(this);
    this.moveDone = this.moveDone.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

    this.state = {
      charts: []
    };
  }

  handleClick(index: number) {
    const charts = this.state.charts;
    this.props.updateStudioState({
      choosedChartIndex: charts.length - index - 1
    });
  }

  handleMouseEnter(index: number) {
    const charts = this.state.charts;
    this.props.updateStudioState({
      hoverChartIndex: charts.length - index - 1
    });
  }

  handleMouseLeave(index: number) {
    this.props.updateStudioState({
      hoverChartIndex: NO_HOVER_CHART
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

  shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    return this.state.charts !== nextState.charts;
  }

  componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.charts !== this.props.charts) {
      this.setState({ charts: [...nextProps.charts].reverse() });
    }
  }

  renderLayer() {
    const charts = [...this.state.charts];
    const choosedChartIndex = this.props.choosedChartIndex;
    return charts.map((chart, idx) => {
      return (
        <LayerItem
          onClick={this.handleClick} moveDone={this.moveDone} checked={false}
          moveChart={this.moveChart} key={chart.id} onMouseLeave={this.handleMouseLeave}
          index={idx} imgSrc={chart.imgSrc} onMouseEnter={this.handleMouseEnter} >
        </LayerItem>
      );
    });
  }

  render() {
    return (
      <div className='layer_container'>
        {this.renderLayer()}
      </div>
    );
  }
}