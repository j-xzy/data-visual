import * as React from 'react';
import { Input, InputProps } from './input';
import './style.styl';

export default class DoubleInput extends React.Component<undefined, undefined> {
  constructor(props: undefined) {
    super(props);
    this.renderInput = this.renderInput.bind(this);
  }

  static Input = Input;

  renderInput(c: React.ReactElement<InputProps>, idx: number) {
    if (idx > 1) return;
    return (
      <div key={idx} className='number'>
        {React.cloneElement(c)}
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