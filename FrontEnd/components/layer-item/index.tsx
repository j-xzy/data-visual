import * as React from 'react';
import { Checkbox } from 'antd';
import * as classNames from 'classnames';
import './style.styl';

export interface IProps {
  imgSrc: string;
  checked: boolean;
  style?: object;
}

interface ILayerItemProps extends IProps {
  onCheckChange: (checked: boolean) => void;
}

export class LayerItem extends React.Component<ILayerItemProps, undefined> {
  render() {
    const { imgSrc, style, checked, onCheckChange } = this.props;
    const cls = classNames('layer_item', {
      layer_highlight: checked
    });
    return (
      <div style={style} className={cls}>
        <Checkbox onChange={() => onCheckChange(!checked)} checked={checked} className='layer_check' />
        <div className='layer_img_container'>
          <img src={imgSrc} />
        </div>
        <i className='icon-menu'></i>
      </div>
    );
  }
}