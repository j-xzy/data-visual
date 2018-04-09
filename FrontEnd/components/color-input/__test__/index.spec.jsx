import React from 'react';
import { shallow } from 'enzyme';
import RawColorInput from '@base/color-input';
import ColorInput from '../index';

describe('<ColorInput />', () => {
  test('onInputKeyDown', () => {
    const onColorComplete = jest.fn();
    const root = shallow(<ColorInput color='red' onColorComplete={onColorComplete} />);

    root.find(RawColorInput).prop('onInputKeyDown')({
      key: 'c',
      currentTarget: { value: 'red' }
    });

    expect(onColorComplete.mock.calls.length).toBe(0);

    root.find(RawColorInput).prop('onInputKeyDown')({
      key: 'Enter',
      currentTarget: { value: 'green' }
    });

    expect(onColorComplete.mock.calls[0][0]).toBe('green');
  });

  test('handleColorPickerChangeComplete', () => {
    const onColorComplete = jest.fn();
    const root = shallow(<ColorInput color='red' onColorComplete={onColorComplete} />);

    root.find(RawColorInput).prop('onColorPickerChangeComplete')({
      rgb: { r: 255, g: 255, b: 0, a: 0.5 }
    });

    expect(onColorComplete.mock.calls[0][0]).toBe('rgba(255,255,0,0.5)');
  });

  test('toggle mask', () => {
    const root = shallow(<ColorInput color='red' />);

    expect(root.find('.color_mask').prop('hidden')).toBe(true);
    expect(root.state().isShowColorPicker).toBe(false);

    root.find(RawColorInput).prop('onColorPreviewClick')();
    root.update();

    expect(root.find('.color_mask').prop('hidden')).toBe(false);
    expect(root.state().isShowColorPicker).toBe(true);

    root.find('.color_mask').simulate('click');
    root.update();

    expect(root.find('.color_mask').prop('hidden')).toBe(true);
    expect(root.state().isShowColorPicker).toBe(false);
  });

  test('disabled', () => {
    const root = shallow(<ColorInput color='red' />);

    expect(root.find(RawColorInput).prop('disabled')).toBe(false);

    root.setProps({
      disabled: true
    });

    expect(root.find(RawColorInput).prop('disabled')).toBe(true);

    root.find(RawColorInput).prop('onColorPreviewClick')();
    root.update();

    expect(root.find('.color_mask').prop('hidden')).toBe(true);
  });
});