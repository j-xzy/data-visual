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
    this.handleChange = this.handleChange.bind(this);
  }

  shouldComponentUpdate() {
    return false;
  }

  private canvasSize = this.props.defaultCanvasSize;

  handleChange(width: number, height: number) {
    this.props.changeCanvasSize(width + 'px', height + 'px');
  }

  render() {
    const { width, height } = this.canvasSize;
    return (
      <div className='number-container'>
        <div className='number'>
          <InputNumber defaultValue={parseInt(width)}
            onChange={(value: number) => this.handleChange(value, parseInt(height))} />
          <div>宽度</div>
        </div>
        <div className='number'>
          <InputNumber defaultValue={parseInt(height)}
            onChange={(value: number) => this.handleChange(parseInt(width), value)} />
          <div>高度</div>
        </div>
      </div>
    );
  }
}