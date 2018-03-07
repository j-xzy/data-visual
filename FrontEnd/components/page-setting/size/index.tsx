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
    this.canvasSize.width = width + 'px';
    this.props.changeCanvasSize(width + 'px', this.canvasSize.height + 'px');
  }

  changeHeight(height: number) {
    this.canvasSize.height = height + 'px';
    this.props.changeCanvasSize(this.canvasSize.width + 'px', height + 'px');
  }

  handleChange(width: number, height: number) {
    this.canvasSize = {
      width: width + 'px',
      height: height + 'px'
    };
    this.props.changeCanvasSize(width + 'px', height + 'px');
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