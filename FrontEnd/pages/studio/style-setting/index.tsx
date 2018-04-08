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
    const { controls } = chart;
    return controls.map((Control, idx) => {
      return <Control {...this.props} key={idx} />;
    });
  }

  render() {
    return this.renderControls();
  }
}