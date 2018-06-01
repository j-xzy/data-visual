import * as React from 'react';
import update from 'immutability-helper';
import ColorInput from '@components/color-input';

interface IProps {
  colors: string[];
  disabled?: boolean;
  onColorComplete: (colors: string[]) => void;
}

interface IState {
  colors: ReadonlyArray<string>;
}

export default class ColorInputGroup extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleColorComplete = this.handleColorComplete.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.state = { colors: [] };
  }

  static defaultProps = {
    disabled: false
  };

  handleColorComplete() {
    this.props.onColorComplete([...this.state.colors]);
  }

  handleColorChange(idx: number, color: string) {
    this.setState({
      colors: update(this.state.colors, {
        $splice: [[idx, 1, color]]
      })
    });
  }

  static getDerivedStateFromProps(nextProps: IProps, nextState: IState) {
    if (nextState.colors.length === 0) {
      // 只需在创建时coolrs来自父组件
      return { colors: nextProps.colors };
    }
    return null;
  }

  render() {
    const { colors } = this.state;
    return (
      <div className='color_input_group'>
        {colors.map((color, idx) => {
          return (
            <ColorInput disabled={this.props.disabled} key={idx} color={color} onColorChange={(color) => this.handleColorChange(idx, color)}
              onColorComplete={this.handleColorComplete} >
            </ColorInput>
          );
        })}
      </div>
    );
  }
}