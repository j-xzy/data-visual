import * as React from 'react';
import { InputNumber } from 'antd';

export interface InputProps {
  name: string;
  value: number;
  onChange: (value: number) => void;
}

export class Input extends React.Component<InputProps, undefined> {
  constructor(props: InputProps) {
    super(props);
  }
  render() {
    const { name, value, onChange } = this.props;
    return (
      <>
        <InputNumber value={value}
          onChange={(value: number) => onChange(value)} />
        <div className='name'>{name}</div>
      </>
    );
  }
}