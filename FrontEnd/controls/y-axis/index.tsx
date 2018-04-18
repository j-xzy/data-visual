import * as React from 'react';
import Axis from '@controls/axis';
import { IControlProps } from '@lib/controls';

export default class YAxis extends React.Component<IControlProps, undefined> {
  render() {
    return <Axis axisType='yAxis' {...this.props} />;
  }
}