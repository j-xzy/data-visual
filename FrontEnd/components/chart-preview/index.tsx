import * as React from 'react';
import { IChartPreview } from '@lib/chart';
import './style.styl';

export class ChartPreview extends React.Component<IChartPreview, undefined> {
  constructor(props: IChartPreview) {
    super(props);
  }

  render() {
    const { imgSrc, name } = this.props;
    return (
      <div className='preview-container'>
        <img src={imgSrc} />
        <span>{name}</span>
      </div>
    );
  }
}
