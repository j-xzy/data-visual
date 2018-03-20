import * as React from 'react';
import { InputNumber } from 'antd';
import { CanvasSize, IChangeCanvasSize } from '@pages/studio';
import './style.styl';

interface IProps {
  changeCanvasSize: IChangeCanvasSize;
  defaultCanvasSize: CanvasSize;
}

export default class PageSize extends React.Component<IProps, undefined> {
  constructor(props: IProps) {
    super(props);
    this.changewidth = this.changewidth.bind(this);
    this.changeHeight = this.changeHeight.bind(this);
  }
  private canvasSize = this.props.defaultCanvasSize;

  changewidth(width: number) {
    this.canvasSize.width = width;
    this.props.changeCanvasSize(width, this.canvasSize.height);
  }

  changeHeight(height: number) {
    this.canvasSize.height = height;
    this.props.changeCanvasSize(this.canvasSize.width, height);
  }

  handleChange(width: number, height: number) {
    this.canvasSize = {
      width: width,
      height: height
    };
    this.props.changeCanvasSize(width, height);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className='number-container'>
        <div className='number'>
          <InputNumber defaultValue={parseInt('800px')}
            onChange={(value: number) => this.changewidth(value)} />
          <div>宽度</div>
        </div>
        <div className='number'>
          <InputNumber defaultValue={parseInt('600px')}
            onChange={(value: number) => this.changeHeight(value)} />
          <div>高度</div>
        </div>
      </div>
    );
  }
}