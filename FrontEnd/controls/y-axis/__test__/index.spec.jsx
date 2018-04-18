import React from 'react';
import { shallow } from 'enzyme';
import YAxis from '../index';

describe('<YAxis />', () => {
  test('props', () => {
    const root = shallow(<YAxis />);
    expect(root.prop('axisType')).toBe('yAxis');
  });
});