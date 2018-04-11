import * as React from 'react';
import { Switch } from 'antd';
import { IControlProps } from '@lib/controls';
import ColorInput from '@components/color-input';
import Item from '@components/setting-item';

import './style.styl';

export default class Titile extends React.Component<IControlProps, undefined> {
  constructor(props: IControlProps) {
    super(props);
  }

  render() {
    return (
      <div className='title_control_wrapper'>
        <Item style={{ margin: '-5px 8px 0px 8px' }} name='显示'>
          <Switch />
        </Item>
        <Item name='标题'>
          <input />
        </Item>
        <Item name='副标题'>
          <input />
        </Item>
        <Item name='颜色'>
          <ColorInput 　color='#fff' onColorChange={() => { }} onColorComplete={() => { }} />
        </Item>
      </div>
    );
  }
}