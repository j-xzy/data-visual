import * as React from 'react';
import { Slider as AtSlider, Icon } from 'antd';
import './style.styl';

interface IProps {
  onChange: (scale: number) => void;
  value: number;
  minValue: number;
  maxValue: number;
  step: number;
  width?: string | number;
}

export default class Slider extends React.Component<IProps, undefined> {
  constructor(props: IProps) {
    super(props);
    this.handlePlusClick = this.handlePlusClick.bind(this);
    this.handleMinusClick = this.handleMinusClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  static defaultProps = {
    step: 0.1,
    width: '100%'
  };

  handlePlusClick() {
    const { value, step } = this.props;
    this.props.onChange(value + step);
  }

  handleMinusClick() {
    const { value, step } = this.props;
    this.props.onChange(value - step);
  }

  handleChange(value: number) {
    this.props.onChange(value);
  }

  shouldComponentUpdate(nextProps: IProps) {
    return nextProps.value !== this.props.value;
  }

  render() {
    const { value, minValue, maxValue, step, width } = this.props;
    return (
      <div className='scale-scroller-containr' style={{ width }}>
        <Icon onClick={this.handleMinusClick} className='scroll-icon' type='minus-circle-o' />
        <AtSlider className='scroll' key='2' value={value} min={minValue} max={maxValue} step={step} onChange={(value: number) => this.handleChange(value)} />
        <Icon onClick={this.handlePlusClick} className='scroll-icon' type='plus-circle-o' />
      </div>);
  }
}