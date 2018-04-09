import React from 'react';
import { mount } from 'enzyme';
import { ChromePicker } from 'react-color';
import ColorInput from '../index';

describe('<ColorInput />', () => {
  test('isShowColorPicker', () => {
    const root = mount(<ColorInput color='red' isShowColorPicker={false} />);
    expect(root.find(ChromePicker).length).toBe(0);
    root.setProps({ isShowColorPicker: true });
    expect(root.find(ChromePicker).length).toBe(1);
  });

  test('onColorPreviewClick', () => {
    const onColorPreviewClick = jest.fn();
    const root = mount(<ColorInput color='red' onColorPreviewClick={onColorPreviewClick} />);
    root.find('.color_preview_wrapper').simulate('click');
    expect(onColorPreviewClick.mock.calls.length).toBe(1);
  });

  test('onColorPickerChangeComplete', () => {
    const onColorPickerChangeComplete = jest.fn();
    const root = mount(<ColorInput color='red' isShowColorPicker={true} onColorPickerChangeComplete={onColorPickerChangeComplete} />);
    root.find(ChromePicker).prop('onChangeComplete')();
    expect(onColorPickerChangeComplete.mock.calls.length).toBe(1);
  });

  test('onColorChange', () => {
    function onColorChange(color) {
      root.setProps({ color });
    }
    const root = mount(<ColorInput color='red' isShowColorPicker={true} onColorChange={onColorChange} />);

    root.find('.color_input').simulate('change', { target: { value: 'green' } });
    expect(root.prop('color')).toBe('green');
    expect(root.find('.color_input').prop('value')).toBe('green');
    expect(root.find(ChromePicker).prop('color')).toBe('green');

    root.find(ChromePicker).prop('onChange')({
      rgb: { a: 1, r: 255, g: 255, b: 255 },
      hex: '#fff'
    });
    expect(root.prop('color')).toBe('#fff');
    expect(root.find('.color_input').prop('value')).toBe('#fff');
    expect(root.find(ChromePicker).prop('color')).toBe('#fff');

    root.find(ChromePicker).prop('onChange')({
      rgb: { a: 0.5, r: 255, g: 255, b: 255 },
      hex: '#fff'
    });
    expect(root.prop('color')).toBe('rgba(255,255,255,0.5)');
    expect(root.find('.color_input').prop('value')).toBe('rgba(255,255,255,0.5)');
    expect(root.find(ChromePicker).prop('color')).toBe('rgba(255,255,255,0.5)');
  });

  test('onInputKeyDown', () => {
    const onInputKeyDown = jest.fn();
    const root = mount(<ColorInput color='red' onInputKeyDown={onInputKeyDown} />);
    root.find('.color_input').simulate('keydown', { key: 12 });
    expect(onInputKeyDown.mock.calls[0][0].key).toBe(12);
  });

  test('disabled', () => {
    const root = mount(<ColorInput color='red' isShowColorPicker={false} />);
    
    expect(root.find('.color_input_wrapper').prop('className').includes('color_input_wrapper_disable')).toBe(false);

    root.setProps({ disabled: true });
  
    expect(root.find('.color_input_wrapper').prop('className').includes('color_input_wrapper_disable')).toBe(true);
  });
});