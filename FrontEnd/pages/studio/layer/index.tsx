import * as React from 'react';
import update from 'immutability-helper';
import LayerItem from '@container/draggable-layer-item';
import { Charts, IUpdateStudioState } from '@pages/studio';

import './style.styl';

interface IProps {
  charts: Charts;
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

    this.state = {
      charts: []
    };
  }

  handleClick(index: number) {
    const chart = this.state.charts[index];
    this.props.updateStudioState({
      transformTool: {
        position: chart.position,
        size: chart.size
      },
      isShowTransformTool: true
    });
  }

  renderLayer() {
    const charts = [...this.state.charts];
    return charts.map((chart, idx) => {
      return <LayerItem onClick={this.handleClick} moveDone={this.moveDone} moveChart={this.moveChart} key={chart.id} index={idx} imgSrc={chart.imgSrc} />;
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

  render() {
    return (
      <div className='layer_container'>
        {this.renderLayer()}
      </div>
    );
  }
}