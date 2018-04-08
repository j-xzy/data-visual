import React from 'react';
import { shallow } from 'enzyme';
import GlobalColorInputGroup from '../index';

const colors = ['red', 'blue', 'green', '#dedede', 'rgba(255,255,0,1)'];

describe('<GlobalColorInputGroup />', () => {
  test('handleColorComplete', async () => {
    const updateStudioState = jest.fn();
    const root = shallow(<GlobalColorInputGroup colors={colors} updateStudioState={updateStudioState} />);

    expect(root.instance().props.colors).toEqual(colors);

    root.prop('onColorComplete')(['black']);

    expect(updateStudioState.mock.calls[0][0]).toEqual({ colors: ['black'] });
  });
});