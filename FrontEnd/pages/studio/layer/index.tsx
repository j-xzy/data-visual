import * as React from 'react';
import update from 'immutability-helper';
import LayerItem from '@container/draggable-layer-item';
import { Charts } from '@pages/studio';

import './style.styl';

interface IProps {
  charts: Charts;
}

interface IState {
  charts: Charts;
}

export default class RawLayer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.renderLayer = this.renderLayer.bind(this);
    this.moveChart = this.moveChart.bind(this);
    this.state = {
      charts: []
    };
  }

  renderLayer() {
    const charts = [...this.state.charts];
    return charts.reverse().map((chart, idx) => {
      return <LayerItem moveChart={this.moveChart} key={chart.id} index={idx} imgSrc={chart.imgSrc} />;
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

  shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    return this.state.charts !== nextState.charts;
  }

  componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.charts !== this.props.charts) {
      this.setState({ charts: [...nextProps.charts] });
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