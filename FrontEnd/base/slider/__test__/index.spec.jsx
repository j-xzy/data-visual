import React from 'react';
import { mount } from 'enzyme';
import Slider from '../index';

describe('<Slider />', () => {
  test('value change', () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      <Slider width={200} maxValue={10} minValue={0} value={5} step={0.1} onChange={handleChange} />
    );
    wrapper.find('.scroll-icon').at(0).simulate('click');
    expect(handleChange.mock.calls[0][0]).toBe(4.9);
    wrapper.find('.scroll-icon').at(2).simulate('click');
    expect(handleChange.mock.calls[1][0]).toBe(5.1);
  });
});