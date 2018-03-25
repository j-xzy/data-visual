import * as React from 'react';
import { Checkbox } from 'antd';
import './style.styl';

interface IProps {
  imgSrc: string;
}

export default class LayerItem extends React.Component<IProps, undefined> {
  render() {
    const { imgSrc } = this.props;
    return (
      <div className='layer_item'>
        <Checkbox className='layer_check' />
        <div className='layer_img_container'>
          <img src={imgSrc} />
        </div>
        <i className='icon-menu'></i>
      </div>
    );
  }
}