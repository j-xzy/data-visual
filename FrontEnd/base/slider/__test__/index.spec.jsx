import React from 'react';
import { mount } from 'enzyme';
import Slider from '../index';

describe('<Slider />', () => {
  test('value change', () => {
    const onMinusClick = jest.fn();
    const onPlusClick = jest.fn();

    const wrapper = mount(
      <Slider width={200} maxValue={10} minValue={0} value={5} step={0.1} onPlusClick={onPlusClick} onMinusClick={onMinusClick} />
    );
    wrapper.find('.scroll-icon').at(0).simulate('click');
    expect(onMinusClick.mock.calls.length).toBe(1);
    expect(onPlusClick.mock.calls.length).toBe(0);

    wrapper.find('.scroll-icon').at(2).simulate('click');
    expect(onMinusClick.mock.calls.length).toBe(1);
    expect(onPlusClick.mock.calls.length).toBe(1)
  });
});