import * as React from 'react';
import Item from '@components/setting-item';
import { IControlProps } from '@lib/controls';

interface IProps extends IControlProps { }

export default class StyleSetting extends React.Component<IProps, undefined> {
  constructor(props: IProps) {
    super(props);
  }

  renderControls() {
    const { chart } = this.props;
    const { style } = chart.controls;
    return style.map((control, idx) => {
      const { name, Component } = control;
      return <Item name={name} key={name} ><Component {...this.props} /></Item>;
    });
  }

  render() {
    return this.renderControls();
  }
}