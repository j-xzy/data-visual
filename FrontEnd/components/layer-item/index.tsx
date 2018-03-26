import * as React from 'react';
import { Checkbox } from 'antd';
import './style.styl';

export interface IProps {
  imgSrc: string;
  style?: object;
}

export class LayerItem extends React.Component<IProps, undefined> {
  render() {
    const { imgSrc, style } = this.props;
    return (
      <div style={style} className='layer_item'>
        <Checkbox className='layer_check' />
        <div className='layer_img_container'>
          <img src={imgSrc} />
        </div>
        <i className='icon-menu'></i>
      </div>
    );
  }
}