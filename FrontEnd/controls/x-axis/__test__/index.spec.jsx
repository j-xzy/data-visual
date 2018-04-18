import React from 'react';
import { shallow } from 'enzyme';
import XAxis from '../index';

describe('<XAxis />', () => {
  test('props', () => {
    const root = shallow(<XAxis />);
    expect(root.prop('axisType')).toBe('xAxis');
  });
});