import * as React from 'react';
import { Slider as AtSlider, Icon } from 'antd';
import './style.styl';

interface IProps {
  value: number;
  minValue: number;
  maxValue: number;
  step: number;
  onMinusClick?: () => void;
  onPlusClick?: () => void;
  onChange?: (value: number) => void;
  width?: string | number;
}

export default class Slider extends React.Component<IProps, undefined> {
  constructor(props: IProps) {
    super(props);
  }

  static defaultProps = {
    step: 0.1,
    width: '100%'
  };

  shouldComponentUpdate(nextProps: IProps) {
    return nextProps.value !== this.props.value;
  }

  render() {
    const { value, minValue, maxValue, step, width, onMinusClick, onPlusClick, onChange } = this.props;
    return (
      <div className='scale-scroller-containr' style={{ width }}>
        <Icon onClick={onMinusClick} className='scroll-icon' type='minus-circle-o' />
        <AtSlider className='scroll' key='2' value={value} min={minValue} max={maxValue} step={step} onChange={(value: number) => onChange(value)} />
        <Icon onClick={onPlusClick} className='scroll-icon' type='plus-circle-o' />
      </div>);
  }
}