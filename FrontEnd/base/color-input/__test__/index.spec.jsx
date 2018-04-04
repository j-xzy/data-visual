import React from 'react';
import { mount } from 'enzyme';
import { ChromePicker } from 'react-color';
import ColorInput from '../index';

describe('<ColorInput />', () => {
  test('defaultColor', () => {
    const root = mount(<ColorInput defaultColor='red' />);
    expect(root.state().color).toBe('red');
  });

  test('isShowColorPicker', () => {
    const root = mount(<ColorInput defaultColor='red' isShowColorPicker={false} />);
    expect(root.find(ChromePicker).length).toBe(0);
    root.setProps({ isShowColorPicker: true });
    expect(root.find(ChromePicker).length).toBe(1);
  });

  test('onColorPreviewClick', () => {
    const onColorPreviewClick = jest.fn();
    const root = mount(<ColorInput defaultColor='red' onColorPreviewClick={onColorPreviewClick} />);
    root.find('.color_preview_wrapper').simulate('click');
    expect(onColorPreviewClick.mock.calls.length).toBe(1);
  });

  test('onColorPickerChangeComplete', () => {
    const onColorPickerChangeComplete = jest.fn();
    const root = mount(<ColorInput defaultColor='red' isShowColorPicker={true} onColorPickerChangeComplete={onColorPickerChangeComplete} />);
    root.find(ChromePicker).prop('onChangeComplete')();
    expect(onColorPickerChangeComplete.mock.calls.length).toBe(1);
  });

  test('onColorChange', () => {
    const onColorChange = jest.fn();
    const root = mount(<ColorInput defaultColor='red' isShowColorPicker={true} onColorChange={onColorChange} />);
    root.find('.color_input').simulate('change', { target: { value: 'green' } });
    expect(root.state().color).toBe('green');
    expect(onColorChange.mock.calls[0][0]).toBe('green');

    root.find(ChromePicker).prop('onChange')({
      rgb: { a: 1, r: 255, g: 255, b: 255 },
      hex: '#fff'
    });
    expect(root.state().color).toBe('#fff');
    expect(onColorChange.mock.calls[1][0]).toBe('#fff');

    root.find(ChromePicker).prop('onChange')({
      rgb: { a: 0.5, r: 255, g: 255, b: 255 },
      hex: '#fff'
    });
    expect(root.state().color).toBe('rgba(255,255,255,0.5)');
    expect(onColorChange.mock.calls[2][0]).toBe('rgba(255,255,255,0.5)');
  });
});