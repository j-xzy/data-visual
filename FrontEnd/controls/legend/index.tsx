import * as React from 'react';
import update from 'immutability-helper';
import Item from '@components/setting-item';
import DoubleInput from '@components/double-input';
import ColorInput from '@components/color-input';
import { Switch, Select, InputNumber } from 'antd';
import { IControlProps } from '@lib/controls';

import './style.styl';

export default class Legend extends React.Component<IControlProps, undefined> {
  constructor(props: IControlProps) {
    super(props);
  }

  shouldComponentUpdate(nextProps: IControlProps) {
    return true;
  }

  render() {
    const { show, left, top, data, textStyle } = this.props.chart.option.legend;
    const { color, fontSize, fontWeight } = textStyle;
    return (
      <div className='legend_wrapper'>
        <Item name='显示'>
          <Switch checked={show} />
        </Item>
        <Item name='位置'>
          <DoubleInput>
            <DoubleInput.Input name='横轴' value={left} onChange={() => { }} />
            <DoubleInput.Input name='纵轴' value={top} onChange={() => { }} />
          </DoubleInput>
        </Item>
        <Item name='字体颜色'>
          <ColorInput color={color} onColorChange={() => { }} onColorComplete={() => { }} />
        </Item>
        <Item name='字体大小'>
          <InputNumber value={fontSize} size='small' />
          <Select size='small' defaultValue={fontWeight} onChange={(value: string) => { }}>
            <Select.Option value='normal' >normal</Select.Option>
            <Select.Option value='lighter' >lighter</Select.Option>
            <Select.Option value='bold' >bold</Select.Option>
          </Select>
        </Item>
      </div>
    );
  }
}