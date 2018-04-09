import React from 'react';
import { shallow } from 'enzyme';
import ColorInputGroup from '@components/color-input-group';
import Palette from '../index';

const colors = ['red', 'blue', 'green'];

const chart = {
  option: { color: [] },
  colorFromGlobal: false
};

const chartColorFromGlobal = {
  option: { color: [] },
  colorFromGlobal: true
};

describe('<Palette />', () => {
  test('disabled', () => {
    const root = shallow(<Palette chart={chartColorFromGlobal} colors={colors} />);
    expect(root.find(ColorInputGroup).prop('disabled')).toBe(true);
    root.setProps({ chart });
    expect(root.find(ColorInputGroup).prop('disabled')).toBe(false);
  });

  test('updateChart', () => {
    const updateChart = jest.fn();
    const root = shallow(<Palette chart={chartColorFromGlobal} colors={colors} updateChart={updateChart} />);

    // handleColorComplete
    root.find(ColorInputGroup).prop('onColorComplete')(['#fff', '#000']);
    let newChart = {
      option: { color: ['#fff', '#000'] },
      colorFromGlobal: true
    };
    expect(updateChart.mock.calls[0][0]).toEqual(newChart);

    // handleSwitchChange
    root.find('.palette_switch').prop('onChange')(false);
    newChart.colorFromGlobal = false;
    newChart.option.color = [];
    expect(updateChart.mock.calls[1][0]).toEqual(newChart);
  });

  test('color', () => {
    const root = shallow(<Palette chart={chartColorFromGlobal} colors={colors} />);
    expect(root.find(ColorInputGroup).prop('colors')).toEqual(colors);

    let chart = {
      option: { color: ['red'] },
      colorFromGlobal: true
    };
    root.setProps({ chart });

    expect(root.find(ColorInputGroup).prop('colors')).toEqual(colors);

    chart = {
      option: { color: ['red'] },
      colorFromGlobal: false
    };
    root.setProps({ chart });

    expect(root.find(ColorInputGroup).prop('colors')).toEqual(['red']);

    chart = {
      option: { color: [] },
      colorFromGlobal: false
    };
    root.setProps({ chart });

    expect(root.find(ColorInputGroup).prop('colors')).toEqual(colors);
  });
});