import React from 'react';
import { shallow } from 'enzyme';
import App from '../app';
import { Studio } from '@pages/studio';

describe('<App />', () => {
  test('App have Studio', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(Studio)).toHaveLength(1);
  });
});