import * as React from 'react';
import Preivew from '@components/chart-preview';
import { pieList } from '@lib/chart';

export default class PieContainer extends React.Component {
  render() {
    return (
      <ul>
        {
          pieList.map(({ name, imgSrc, option }) => {
            return <li key={name}><Preivew imgSrc={imgSrc} option={option} name={name} /></li>;
          })
        }
      </ul>
    );
  }
}