import * as React from 'react';
import Axis from '@controls/axis';
import { IControlProps } from'@controls/index';

export default class XAxis extends React.Component<IControlProps, undefined> {
  render() {
    return <Axis axisType='xAxis' {...this.props} />;
  }
}