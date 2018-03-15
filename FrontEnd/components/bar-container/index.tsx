import * as React from 'react';
import { DragableChartPreview } from '@components/draggable-chart-preview';
import { barList } from '@lib/chart';

export default class BarContainer extends React.Component {
  render() {
    return (
      <ul>
        {
          barList.map(({ name, imgSrc, option }) => {
            return <li key={name}><DragableChartPreview imgSrc={imgSrc} option={option} name={name} /></li>;
          })
        }
      </ul>
    );
  }
}