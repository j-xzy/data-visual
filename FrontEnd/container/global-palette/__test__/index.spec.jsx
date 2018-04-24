import React from 'react';
import { shallow } from 'enzyme';
import GlobalColorInputGroup from '../index';

const colors = ['red', 'blue', 'green', '#dedede', 'rgba(255,255,0,1)'];
const charts = [{
  colorFromGlobal: true,
  option: {
    color: ['red']
  }
}, {
  colorFromGlobal: false,
  option: {
    color: ['red']
  }
}]

describe('<GlobalColorInputGroup />', () => {
  test('handleColorComplete', async () => {
    const updateStudioState = jest.fn();
    const root = shallow(<GlobalColorInputGroup charts={charts} colors={colors} updateStudioState={updateStudioState} />);

    expect(root.instance().props.colors).toEqual(colors);

    root.prop('onColorComplete')(['black']);

    expect(updateStudioState.mock.calls[0][0].colors).toEqual(['black']);
    expect(updateStudioState.mock.calls[0][0].charts[0].option.color).toEqual(['black']);
    expect(updateStudioState.mock.calls[0][0].charts[1].option.color).toEqual(['red']);
  });
});