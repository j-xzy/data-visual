import * as React from 'react';
import { Color } from 'csstype';

interface TitileProps {
  isShow: boolean;
  align: 'left' | 'center' | 'right';
  title: string;
  color: Color;
  size: number;
  weight: 'normal' | 'lighter' | 'bold';
  subTitle: string;
  subColor: Color;
  subsize: number;
  subweight: 'normal' | 'lighter' | 'bold';
}

function connectControl() {

}

class TitileControl extends React.Component<TitileProps, undefined> {
  constructor(props: TitileProps) {
    super(props);
    this.handleIsShowChange = this.handleIsShowChange.bind(this);
  }

  handleIsShowChange() {

  }

  render() {
    const { isShow, align, title, color, size, weight, subTitle, subColor, subsize, subweight } = this.props;

    return (
      <div>
        <div onClick={this.handleIsShowChange}>{isShow}</div>
        <div>{align}</div>
        <div>{color}</div>
        <div>{title}</div>
        <div>{size}</div>
        <div>{weight}</div>
      </div>
    );
  }
}