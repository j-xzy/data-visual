import * as React from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import './style.styl';

interface IProps {
  color: string;
  onColorChange?: (color: string) => void;
  isShowColorPicker?: boolean;
  onColorPreviewClick?: () => void;
  onColorPickerChangeComplete?: (colorResult: ColorResult) => void;
  onInputKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}

export default class ColorInput extends React.Component<IProps, undefined> {
  constructor(props: IProps) {
    super(props);
    this.handleColorPickerChange = this.handleColorPickerChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  static defaultProps = {
    isShowColorPicker: false
  };

  handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.props.onColorChange(e.target.value);
  }

  handleColorPickerChange(colorResult: ColorResult) {
    let color = colorResult.hex;
    if (colorResult.rgb.a !== 1) {
      const { r, g, b, a } = colorResult.rgb;
      color = `rgba(${r},${g},${b},${a})`;
    }
    this.props.onColorChange(color);
  }

  render() {
    const { color } = this.props;
    const { onColorPreviewClick, isShowColorPicker, onColorPickerChangeComplete, onInputKeyDown } = this.props;
    return (
      <div className='color_input_wrapper'>
        <div className='color_preview_wrapper' onClick={onColorPreviewClick} >
          <span style={{ background: color }} className='color_preview'></span>
        </div>
        <input type='text' className='color_input' value={color} onKeyDown={onInputKeyDown} onChange={this.handleInputChange} />
        <div className='color_colorpicker'>
          {isShowColorPicker && <ChromePicker color={color} onChangeComplete={onColorPickerChangeComplete} onChange={this.handleColorPickerChange} />}
        </div>
      </div>
    );
  }
}