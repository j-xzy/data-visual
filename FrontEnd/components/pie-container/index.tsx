import * as React from 'react';
import { Preview as NormalPie } from '@charts/pie/normal';

export default class PieContainer extends React.Component {
  render() {
    return (
      <ul>
        <li>
          <NormalPie />
        </li>
      </ul>
    );
  }
}