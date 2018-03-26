import * as React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import LayerItem from '@components/layer-item';
import { Charts } from '@pages/studio';
import './style.styl';

interface IProps {
  charts: Charts;
}

class RawLayer extends React.Component<IProps, undefined> {
  constructor(props: IProps) {
    super(props);
    this.renderLayer = this.renderLayer.bind(this);
  }

  renderLayer() {
    const charts = [...this.props.charts];
    return charts.reverse().map((chart, idx) => {
      return <LayerItem key={idx} imgSrc={chart.imgSrc} />;
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

export const Layer = DragDropContext(HTML5Backend)(RawLayer);