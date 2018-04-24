import * as React from 'react';
import { Switch } from 'antd';
import update from 'immutability-helper';
import ColorInputGroup from '@components/color-input-group';
import Item from '@components/setting-item';
import { IControlProps } from '@controls/index';

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
    const { updateChart, chart, colors } = this.props;
    let newColors = [...chart.option.color];
    checked && (newColors = [...colors]);
    updateChart(update(chart, {
      option: {
        color: { $set: newColors }
      },
      colorFromGlobal: { $set: checked }
    }));
  }

  shouldComponentUpdate(nextProps: IControlProps) {
    return nextProps.colors !== this.props.colors
      || nextProps.chart.colorFromGlobal !== this.props.chart.colorFromGlobal
      || nextProps.chart.option.color !== this.props.chart.option.color;
  }

  render() {
    const { chart, colors: globalColor, name } = this.props;
    const { colorFromGlobal, option: { color: chartColors } } = chart;
    let colors = colorFromGlobal || chartColors.length === 0 ? globalColor : chartColors;
    return (
      <Item style={{ margin: '-5px 0 0 0', borderBottom: 'none' }} name={name}>
        <div>
          <div className='palette_switch_wrapper'>
            <span className='palette_text'>全局色系</span>
            <Switch className='palette_switch' checked={colorFromGlobal} onChange={this.handleSwitchChange} />
          </div>
          <ColorInputGroup disabled={colorFromGlobal} colors={colors} onColorComplete={this.handleColorComplete} />
        </div>
      </Item>
    );
  }
}