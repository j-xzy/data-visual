import * as React from 'react';
import RawInputColor from '@base/color-input';
import { ColorResult } from 'react-color';

import './style.styl';

interface IProps {
  color: string;
  disabled?: boolean;
  onColorChange: (color: string) => void;
  onColorComplete: (color: string) => void;
}

interface IState {
  isShowColorPicker: boolean;
  colorPickStyle: React.CSSProperties;
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
      isShowColorPicker: false,
      colorPickStyle: {}
    };
  }

  inputRef: React.RefObject<HTMLDivElement> = React.createRef();

  static defaultProps = {
    disabled: false
  };

  handleColorPickerChangeComplete(colorResult: ColorResult) {
    const { r, g, b, a } = colorResult.rgb;
    const color = `rgba(${r},${g},${b},${a})`;
    this.props.onColorComplete(color);
  }

  handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    e.key.toLocaleLowerCase() === 'enter' && this.props.onColorComplete(e.currentTarget.value);
  }

  showColorPicker() {
    if (this.props.disabled) return;
    let rect = this.inputRef.current.getBoundingClientRect();
    this.setState({
      isShowColorPicker: true,
      colorPickStyle: {
        zIndex: 1,
        position: 'fixed',
        top: rect.top + 25,
        left: rect.left - 200
      }
    });
  }

  hideColorPicker() {
    this.setState({ isShowColorPicker: false });
  }

  shouldComponentUpdate(nextProps: IProps, nextState: IState) {
    return this.props.disabled !== nextProps.disabled || this.props.color !== nextProps.color || this.state.isShowColorPicker !== nextState.isShowColorPicker;
  }

  render() {
    const { color, onColorChange, disabled } = this.props;
    const { isShowColorPicker, colorPickStyle } = this.state;
    return (
      <div ref={this.inputRef} style={{ display: 'inline-block' }}>
        <div className='color_mask' onClick={this.hideColorPicker} hidden={!isShowColorPicker} style={{ ...MaskStyle }}></div>
        <RawInputColor colorPickerStyle={colorPickStyle} disabled={disabled} onColorChange={onColorChange} onInputKeyDown={this.handleInputKeyDown} onColorPickerChangeComplete={this.handleColorPickerChangeComplete} style={{ position: 'relative' }}
          isShowColorPicker={isShowColorPicker} onColorPreviewClick={this.showColorPicker} color={color} >
        </RawInputColor>
      </div>
    );
  }
}