import * as React from 'react';
import { ChromePicker, ColorResult } from 'react-color';
import './style.styl';

interface IProps {
  defaultColor: string;
  isShowColorPicker?: boolean;
  onColorPreviewClick?: () => void;
  onColorChange?: (color: string) => void;
  onColorPickerChangeComplete?: (colorResult: ColorResult) => void;
}

interface IState {
  color: string;
}

export default class ColorInput extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.handleColorPickerChange = this.handleColorPickerChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      color: this.props.defaultColor
    };
  }

  static defaultProps = {
    isShowColorPicker: false
  };

  handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      color: e.target.value
    });
    const { onColorChange } = this.props;
    onColorChange && this.props.onColorChange(e.target.value);
  }

  handleColorPickerChange(colorResult: ColorResult) {
    let color = colorResult.hex;
    if (colorResult.rgb.a !== 1) {
      const { r, g, b, a } = colorResult.rgb;
      color = `rgba(${r},${g},${b},${a})`;
    }
    this.setState({ color });
    const { onColorChange } = this.props;
    onColorChange && this.props.onColorChange(color);
  }

  render() {
    const { color } = this.state;
    const { onColorPreviewClick, isShowColorPicker, onColorPickerChangeComplete } = this.props;
    return (
      <div className='color_input_wrapper'>
        <div className='color_preview_wrapper' onClick={onColorPreviewClick} >
          <span style={{ background: color }} className='color_preview'></span>
          <div className='color_colorpicker'>
            {isShowColorPicker && <ChromePicker color={color} onChangeComplete={onColorPickerChangeComplete} onChange={this.handleColorPickerChange} />}
          </div>
        </div>
        <input className='color_input' value={color} onChange={this.handleInputChange} type='text' />
      </div>
    );
  }
}