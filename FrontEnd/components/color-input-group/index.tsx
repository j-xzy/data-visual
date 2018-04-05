import * as React from 'react';
import update from 'immutability-helper';
import ColorInput from '@components/color-input';
import { IUpdateStudioState } from '@pages/studio';
interface IProps {
  colors: string[];
  updateStudioState: IUpdateStudioState;
}

interface IState {
  colors: ReadonlyArray<string>;
}

export default class ColorInputGroup extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleColorComplete = this.handleColorComplete.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.state = {
      colors: this.props.colors
    };
  }

  handleColorComplete(idx: number) {
    this.props.updateStudioState({
      colors: [...this.state.colors]
    });
  }

  handleColorChange(idx: number, color: string) {
    this.setState({
      colors: update(this.state.colors, {
        $splice: [[idx, 1, color]]
      })
    });
  }

  componentWillReceiveProps(nextProps: IProps) {
    this.setState({
      colors: nextProps.colors
    });
  }

  render() {
    const { colors } = this.state;
    return (
      <div className='color_input_group'>
        {colors.map((color, idx) => {
          return (
            <ColorInput key={idx} color={color} onColorChange={(color) => this.handleColorChange(idx, color)}
              onColorComplete={() => this.handleColorComplete(idx)} >
            </ColorInput>
          );
        })}
      </div>
    );
  }
}