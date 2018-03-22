import React from 'react';
import { mount } from 'enzyme';
import DoubleInput from '../index';
import { InputNumber } from 'antd';

const Input = DoubleInput.Input;

describe('<DoubleInput/>', () => {
  test('change event', () => {
    const change = jest.fn();
    const wrapper = mount(
      <DoubleInput>
        <Input name='one' value={10} onChange={change} />
        <Input name='two' value={20} />
      </DoubleInput>
    );
    wrapper.find(InputNumber).at(0).find('input').simulate('change');
    expect(change.mock.calls[0][0]).toBe(10);
    wrapper.find(InputNumber).at(0).prop('onChange')(30);
    expect(change.mock.calls[1][0]).toBe(30);
  });
});