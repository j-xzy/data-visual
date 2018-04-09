import * as React from 'react';
import { Switch } from 'antd';
import update from 'immutability-helper';
import ColorInputGroup from '@components/color-input-group';
import { IControlProps } from '@lib/controls';

import './style.styl';

export default class Palette extends React.Component<IControlProps, undefined> {
  constructor(props: IControlProps) {
    super(props);
    this.handleColorComplete = this.handleColorComplete.bind(this);
    this.handleSwitchChange = this.handleSwitchChange.bind(this);
  }

  handleColorComplete(colors: string[]) {
    const { updateChart, chart } = this.props;
    updateChart(update(chart, {
      option: {
        color: { $set: colors }
      }
    }));
  }

  handleSwitchChange(checked: boolean) {
    const { updateChart, chart } = this.props;
    updateChart(update(chart, {
      colorFromGlobal: { $set: checked }
    }));
  }

  render() {
    const { chart, colors: globalColor } = this.props;
    const { colorFromGlobal, option: { color: chartColors } } = chart;
    let colors = colorFromGlobal || chartColors.length === 0 ? globalColor : chartColors;
    return (
      <div>
        <div className='palette_switch_wrapper'>
          <span className='palette_text'>全局色系</span>
          <Switch className={`palette_switch ${colorFromGlobal || 'palette_switch_background'}`} checked={colorFromGlobal} onChange={this.handleSwitchChange} />
        </div>
        <ColorInputGroup disabled={colorFromGlobal} colors={colors} onColorComplete={this.handleColorComplete} />
      </div>
    );
  }
}