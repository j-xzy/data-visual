import * as React from 'react';
import { IChartPreview } from '@charts';
import './style.styl';

export function ChartPreview(props: IChartPreview) {
  return (
    <div className='preview-container'>
      <img src={props.imgSrc} />
      <span>{props.name}</span>
    </div>
  );
}