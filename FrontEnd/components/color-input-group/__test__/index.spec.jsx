import React from 'react';
import { shallow } from 'enzyme';
import ColorInput from '@components/color-input';
import ColorInputGroup from '../index';

const colors = ['red', 'blue', 'green', '#dedede', 'rgba(255,255,0,1)'];

describe('<ColorInputGroup />', () => {
  test('handleColorChange', () => {
    const root = shallow(<ColorInputGroup colors={colors} onColorComplete={onColorComplete} />);
    function onColorComplete(colors) {
      root.setProps({ colors });
    }

    expect(root.state().colors).toEqual(colors);
    expect(root.instance().props.colors).toEqual(colors);

    root.find(ColorInput).at(2).prop('onColorChange')('black');

    let newColors = [...colors];
    newColors.splice(2, 1, 'black');

    expect(root.state().colors).toEqual(newColors);
    expect(root.instance().props.colors).toEqual(colors);

    root.find(ColorInput).at(2).prop('onColorComplete')();

    expect(root.state().colors).toEqual(newColors);
    expect(root.instance().props.colors).toEqual(newColors);
  });

  test('disabled', () => {
    const root = shallow(<ColorInputGroup colors={colors} />);
    root.find(ColorInput).forEach((el) => {
      expect(el.prop('disabled')).toBe(false);
    });

    root.setProps({
      disabled: true
    });

    root.find(ColorInput).forEach((el) => {
      expect(el.prop('disabled')).toBe(true);
    });
  });
});