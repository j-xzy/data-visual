import * as React from 'react';
import { Slider } from 'antd';
import './style.styl';

interface IProps {
  onChange: (scale: number) => void;
}

export class ScaleScroller extends React.Component<IProps, undefined> {
  constructor(props: IProps) {
    super(props);
  }
  render() {
    return <Slider defaultValue={1} min={0.1} max={20} step={0.1} onChange={this.props.onChange} />;
  }
}