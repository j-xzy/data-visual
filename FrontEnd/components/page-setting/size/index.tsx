import * as React from 'react';
import { InputNumber } from 'antd';

import './style.styl';

interface IProps {
  changeCanvasSize: Function;
  defaultCanvasSize: any;
}

interface ISize {
  width?: number;
  height?: number;
}

export default class PageSize extends React.Component<IProps, undefined> {
  constructor(props: IProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  private defaultSize: any;

  componentWillMount() {
    this.defaultSize = this.props.defaultCanvasSize;
  }

  handleChange({ width, height }: ISize) {
    const { changeCanvasSize, defaultCanvasSize } = this.props;
    if (typeof width === 'undefined') {
      changeCanvasSize(defaultCanvasSize.width + 'px', height + 'px');
    } else {
      changeCanvasSize(width + 'px', defaultCanvasSize.height + 'px');
    }
  }

  render() {
    return (
      <div className='number-container'>
        <div className='number'>
          <InputNumber defaultValue={parseInt(this.defaultSize.width)} onChange={(width: number) => this.handleChange({ width })} />
          <div>宽度</div>
        </div>
        <div className='number'>
          <InputNumber defaultValue={parseInt(this.defaultSize.height)} onChange={(height: number) => this.handleChange({ height })} />
          <div>高度</div>
        </div>
      </div>
    );
  }
}