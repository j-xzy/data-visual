import * as React from 'react';
import { InputNumber } from 'antd';

export interface InputProps {
  name: string;
  value: number;
  min?: number;
  max?: number;
  type?: 'percentage' | 'number';
  onChange: (value: number) => void;
}

export class Input extends React.Component<InputProps, undefined> {
  constructor(props: InputProps) {
    super(props);
    this.formatter = this.formatter.bind(this);
  }

  formatter(value: string) {
    const { type } = this.props;
    if (type === 'number') {
      return value;
    } else {
      return `${value}%`;
    }
  }

  render() {
    const { name, value, onChange, min, max } = this.props;

    return (
      <>
        <InputNumber formatter={this.formatter} min={min} max={max} value={value}
          onChange={(value: number) => onChange(value)} />
        <div className='name'>{name}</div>
      </>
    );
  }
}