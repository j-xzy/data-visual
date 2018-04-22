import React from 'react';
import { shallow } from 'enzyme';
import DoubleInput from '@components/double-input';
import CenterRadius from '../index';

const chart = {
  seriesItemTemplate: {
    center: ['50%', '50%'],
    radius: ['10%', '55%']
  },
  option: {
    series: [
      {
        center: ['10%', '10%'],
        radius: ['10%', '55%']
      }
    ]
  }
};

describe('<CenterRadius />', () => {
  test('handleCenterChange', () => {
    const updateChart = jest.fn();
    const root = shallow(<CenterRadius updateChart={updateChart} chart={chart} />);

    root.find(DoubleInput.Input).at(0).prop('onChange')(30);
    expect(updateChart.mock.calls[0][0].option.series[0].center[0]).toBe('30%');

    root.find(DoubleInput.Input).at(1).prop('onChange')(60);
    expect(updateChart.mock.calls[1][0].option.series[0].center[1]).toBe('60%');
  });

  test('handleRadiusChange', () => {
    const updateChart = jest.fn();
    const root = shallow(<CenterRadius updateChart={updateChart} chart={chart} />);

    root.find(DoubleInput.Input).at(2).prop('onChange')(30);
    expect(updateChart.mock.calls[0][0].option.series[0].radius[0]).toBe('30%');

    root.find(DoubleInput.Input).at(3).prop('onChange')(60);
    expect(updateChart.mock.calls[1][0].option.series[0].radius[1]).toBe('60%');

  });
});