import React from 'react';
import { mount } from 'enzyme';
import DataSetting from '../index';

function Control1() {
  return <div>control1</div>;
}

function Control2() {
  return <div>control2</div>;
}

const chart = {
  controls: {
    data: [
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

describe('<DataSetting />', () => {
  test('render', () => {
    const root = mount(<DataSetting chart={chart} />);
    expect(root.containsAllMatchingElements([<div>control1</div>, <div>control2</div>])).toBe(true);
  });
});