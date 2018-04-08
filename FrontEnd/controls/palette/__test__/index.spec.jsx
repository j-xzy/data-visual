import React from 'react';
import { shallow } from 'enzyme';
import Palette from '../index';

const colors = ['red', 'blue', 'green', '#dedede', 'rgba(255,255,0,1)'];

describe('<GlobalColorInputGroup />', () => {
  test('handleColorComplete', () => {
    const updateStudioState = jest.fn();
    const root = shallow(<Palette colors={colors} updateStudioState={updateStudioState} />);

    expect(root.instance().props.colors).toEqual(colors);

    root.prop('onColorComplete')(['black']);

    expect(updateStudioState.mock.calls[0][0]).toEqual({ colors: ['black'] });
  });
});