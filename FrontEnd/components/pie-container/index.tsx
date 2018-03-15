import * as React from 'react';
import { DragableChartPreview } from '@components/draggable-chart-preview';
import { pieList } from '@lib/chart';

export default class PieContainer extends React.Component {
  render() {
    return (
      <ul>
        {
          pieList.map(({ name, imgSrc, option }) => {
            return <li key={name}><DragableChartPreview imgSrc={imgSrc} option={option} name={name} /></li>;
          })
        }
      </ul>
    );
  }
}