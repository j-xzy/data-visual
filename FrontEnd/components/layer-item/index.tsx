import * as React from 'react';
import { Checkbox } from 'antd';
import './style.styl';

export interface IProps {
  imgSrc: string;
  checked: boolean;
  style?: object;
}

export class LayerItem extends React.Component<IProps, undefined> {
  render() {
    const { imgSrc, style, checked} = this.props;
    return (
      <div style={style} className='layer_item'>
        <Checkbox checked={checked} className='layer_check' />
        <div className='layer_img_container'>
          <img src={imgSrc} />
        </div>
        <i className='icon-menu'></i>
      </div>
    );
  }
}