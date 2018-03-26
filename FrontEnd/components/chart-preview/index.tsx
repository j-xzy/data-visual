import * as React from 'react';
import './style.styl';

export interface IChartPreview {
  name: string;
  imgSrc: string;
  option: object;
}

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
