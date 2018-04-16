import * as React from 'react';
import { InputNumber } from 'antd';

export interface InputProps {
  name: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export class Input extends React.Component<InputProps, undefined> {
  constructor(props: InputProps) {
    super(props);
  }
  render() {
    const { name, value, onChange, min, max } = this.props;
    return (
      <>
        <InputNumber min={min} max={max} value={value}
          onChange={(value: number) => onChange(value)} />
        <div className='name'>{name}</div>
      </>
    );
  }
}