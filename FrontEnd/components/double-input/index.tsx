import * as React from 'react';
import { Input, InputProps } from './input';
import './style.styl';

interface IProps {
  type?: 'percentage' | 'number';
}

export default class DoubleInput extends React.Component<IProps, undefined> {
  constructor(props: IProps) {
    super(props);
    this.renderInput = this.renderInput.bind(this);
  }

  static defaultProps = {
    type: 'number'
  };

  static Input = Input;

  renderInput(c: React.ReactElement<InputProps>, idx: number) {
    if (idx > 1) return;
    return (
      <div key={idx} className='number'>
        {React.cloneElement(c, { type: this.props.type })}
      </div>
    );
  }

  render() {
    return (
      <div className='number-container'>
        {React.Children.map(this.props.children, this.renderInput)}
      </div>
    );
  }
}