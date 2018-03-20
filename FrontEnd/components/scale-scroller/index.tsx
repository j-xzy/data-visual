import * as React from 'react';
import { Slider, Icon } from 'antd';
import './style.styl';

interface IProps {
  onChange: (scale: number) => void;
  value: number;
  minValue: number;
  maxValue: number;
}

export class ScaleScroller extends React.Component<IProps, undefined> {
  constructor(props: IProps) {
    super(props);
    this.handlePlusClick = this.handlePlusClick.bind(this);
    this.handleMinusClick = this.handleMinusClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }


  handlePlusClick() {
    this.props.onChange(this.props.value + 0.1);
  }

  handleMinusClick() {
    this.props.onChange(this.props.value - 0.1);
  }

  handleChange(value: number) {
    this.props.onChange(value);
  }

  shouldComponentUpdate(nextProps: IProps) {
    return nextProps.value !== this.props.value;
  }

  render() {
    const { value, minValue, maxValue } = this.props;
    return (
      <div className='scale-scroller-containr'>
        <Icon onClick={this.handleMinusClick} className='scroll-icon' type='minus-circle-o' />
        <Slider className='scroll' key='2' value={value} min={minValue} max={maxValue} step={0.1} onChange={(value: number) => this.handleChange(value)} />
        <Icon onClick={this.handlePlusClick} className='scroll-icon' type='plus-circle-o' />
      </div>);
  }
}