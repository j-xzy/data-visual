import * as React from 'react';
import RawInputColor from '@base/color-input';
import { ColorResult } from 'react-color';

import './style.styl';

interface IProps {
  color: string;
  onColorChange: (color: string) => void;
  onColorComplete: (color: string) => void;
}

interface IState {
  isShowColorPicker: boolean;
}

const MaskStyle = {
  position: 'fixed' as 'fixed',
  left: 0,
  top: 0,
  zIndex: 1,
  width: '100%',
  height: '100%'
};

export default class ColorInput extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.showColorPicker = this.showColorPicker.bind(this);
    this.hideColorPicker = this.hideColorPicker.bind(this);
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    this.handleColorPickerChangeComplete = this.handleColorPickerChangeComplete.bind(this);

    this.state = {
      isShowColorPicker: false
    };
  }

  handleColorPickerChangeComplete(colorResult: ColorResult) {
    const { r, g, b, a } = colorResult.rgb;
    const color = `rgba(${r},${g},${b},${a})`;
    this.props.onColorComplete(color);
  }

  handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    e.key === 'Enter' && this.props.onColorComplete(e.currentTarget.value);
  }

  showColorPicker() {
    this.setState({ isShowColorPicker: true });
  }

  hideColorPicker() {
    this.setState({ isShowColorPicker: false });
  }

  shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    return this.props.color !== nextProps.color || this.state.isShowColorPicker !== nextState.isShowColorPicker;
  }

  render() {
    const { color, onColorChange } = this.props;
    const { isShowColorPicker } = this.state;
    return (
      <div style={{ display: 'inline-block' }}>
        <div className='color_mask' onClick={this.hideColorPicker} hidden={!isShowColorPicker} style={{ ...MaskStyle }}></div>
        <RawInputColor onColorChange={onColorChange} onInputKeyDown={this.handleInputKeyDown} onColorPickerChangeComplete={this.handleColorPickerChangeComplete} style={{ position: 'relative' }}
          isShowColorPicker={isShowColorPicker} onColorPreviewClick={this.showColorPicker} color={color} >
        </RawInputColor>
      </div>
    );
  }
}