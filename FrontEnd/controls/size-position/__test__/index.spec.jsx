import React from 'react';
import { shallow } from 'enzyme';
import DoubleInput from '@components/double-input';
import SizePosition from '../index';

const Input = DoubleInput.Input;

const chart = {
  position: {
    top: 100,
    left: 200
  },
  size: {
    width: 300,
    height: 400
  }
};

describe('<SizePosition />', () => {
  test('handleWidthChange', () => {
    const updateChart = jest.fn();
    const root = shallow(<SizePosition chart={chart} updateChart={updateChart} />);
    
    root.find(Input).at(0).prop('onChange')(350);
    expect(updateChart.mock.calls[0][0].size.width).toBe(350);
  });

  test('handleHeightChange', () => {
    const updateChart = jest.fn();
    const root = shallow(<SizePosition chart={chart} updateChart={updateChart} />);
    
    root.find(Input).at(1).prop('onChange')(490);
    expect(updateChart.mock.calls[0][0].size.height).toBe(490);
  });

  test('handleLeftChange', () => {
    const updateChart = jest.fn();
    const root = shallow(<SizePosition chart={chart} updateChart={updateChart} />);
    
    root.find(Input).at(2).prop('onChange')(290);
    expect(updateChart.mock.calls[0][0].position.left).toBe(290);
  });

  test('handleTopChange', () => {
    const updateChart = jest.fn();
    const root = shallow(<SizePosition chart={chart} updateChart={updateChart} />);
    
    root.find(Input).at(3).prop('onChange')(290);
    expect(updateChart.mock.calls[0][0].position.top).toBe(290);
  });
});