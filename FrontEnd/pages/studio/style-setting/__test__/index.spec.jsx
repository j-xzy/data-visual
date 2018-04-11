import React from 'react';
import { mount } from 'enzyme';
import Item from '@components/setting-item';
import StyleSetting from '../index';

function Control1() {
  return <div>control1</div>;
}

function Control2() {
  return <div>control2</div>;
}

const chart = {
  controls: {
    style: [
      {
        name: 'control1',
        Component: Control1
      }, {
        name: 'control2',
        Component: Control2
      }
    ]
  }
};

describe('<StyleSetting />', () => {
  test('render', () => {
    const root = mount(<StyleSetting chart={chart} />);
    
  expect(root.find(Item).at(0).prop('name')).toBe('control1');
  expect(root.find(Item).at(0).contains([<div>control1</div>])).toBe(true);

  expect(root.find(Item).at(1).prop('name')).toBe('control2');
  expect(root.find(Item).at(1).contains([<div>control2</div>])).toBe(true);
  });
});