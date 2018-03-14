import * as React from 'react';
import Preivew from '@components/chart-preview';
import { barList } from '@lib/chart';

export default class BarContainer extends React.Component {
  render() {
    return (
      <ul>
        {
          barList.map(({ name, imgSrc, getChartAsync }) => {
            return <li key={name}><Preivew imgSrc={imgSrc} getChartAsync={getChartAsync} name={name} /></li>;
          })
        }
      </ul>
    );
  }
}