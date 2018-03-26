import * as React from 'react';
import cloneDeep from 'lodash.clonedeep';
import LayerItem from '@container/draggable-layer-item';
import { Charts } from '@pages/studio';

import './style.styl';

interface IProps {
  charts: Charts;
}

export default class RawLayer extends React.Component<IProps, undefined> {
  constructor(props: IProps) {
    super(props);
    this.renderLayer = this.renderLayer.bind(this);
    this.setDragStatus = this.setDragStatus.bind(this);
  }

  duplicateCharts: Charts;
  isDragging = false;

  setDragStatus(isDragging: boolean) {
    this.isDragging = isDragging;
  }

  renderLayer() {
    const charts = this.isDragging ? [...this.duplicateCharts] : [...this.props.charts];
    return charts.reverse().map((chart, idx) => {
      return <LayerItem setDragStatus={this.setDragStatus} key={idx} index={idx} imgSrc={chart.imgSrc} />;
    });
  }

  shouldComponentUpdate(nextProps: IProps) {
    console.log( nextProps.charts === this.props.charts);
    return nextProps.charts !== this.props.charts;
  }

  componentWillReceiveProps(nextProps: IProps) {
   // this.duplicateCharts = cloneDeep(nextProps.charts);
  }

  render() {
    return (
      <div className='layer_container'>
        {this.renderLayer()}
      </div>
    );
  }
}