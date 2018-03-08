import * as React from 'react';
import { Slider, Icon } from 'antd';
import './style.styl';

interface IProps {
  onChange: (scale: number) => void;
  defaultValue: number;
}

interface IState {
  inputValue: number;
}

export class ScaleScroller extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handlePlusClick = this.handlePlusClick.bind(this);
    this.handleMinusClick = this.handleMinusClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  state = {
    inputValue: this.props.defaultValue
  };

  handleInputChange(value: number) {
    this.setState({
      inputValue: value
    });
    this.props.onChange(value);
  }

  handlePlusClick() {
    this.setState((preState) => {
      return {
        inputValue: preState.inputValue + 0.1
      };
    }, () => {
      this.props.onChange(this.state.inputValue);
    });
  }

  handleMinusClick() {
    this.setState((preState) => {
      return {
        inputValue: preState.inputValue - 0.1
      };
    }, () => {
      this.props.onChange(this.state.inputValue);
    });
  }

  shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    return nextState.inputValue !== this.state.inputValue;
  }

  render() {
    const { onChange, defaultValue } = this.props;
    const { inputValue } = this.state;
    return (
      <div className='scale-scroller-containr'>
        <Icon onClick={this.handleMinusClick} className='scroll-icon' type='minus-circle-o' />
        <Slider className='scroll' key='2' defaultValue={defaultValue} value={inputValue} min={0.1} max={20} step={0.1} onChange={this.handleInputChange} />
        <Icon onClick={this.handlePlusClick} className='scroll-icon' type='plus-circle-o' />
      </div>);
  }
}