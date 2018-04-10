import * as React from 'react';
import { IControlProps } from '@lib/controls';

interface IProps extends IControlProps { }

export default class DataSetting extends React.Component<IProps, undefined> {
  constructor(props: IProps) {
    super(props);
  }

  renderControls() {
    const { chart } = this.props;
    const { data } = chart.controls;
    return data.map((control, idx) => {
      const { name, Component } = control;
      return <Component key={name} {...this.props} />;
    });
  }

  render() {
    return this.renderControls();
  }
}