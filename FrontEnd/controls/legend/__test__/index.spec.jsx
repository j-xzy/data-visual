import React from 'react';
import { shallow } from 'enzyme';
import { Switch, InputNumber, Select } from 'antd';
import DoubleInput from '@components/double-input';
import ColorInput from '@components/color-input';
import Legend from '../index';

const Input = DoubleInput.Input;

const chart = {
  option: {
    series: [
      {
        name: '',
        data: [
          { value: 35, name: '视频' },
          { value: 20, name: '邮件' },
          { value: 34, name: '广告' }
        ]
      }
    ],
    legend: {
      show: true,
      left: 0,
      top: 0,
      textStyle: {
        fontWeight: 'normal',
        fontSize: 12,
        color: '#fff',
      }
    }
  }
};

describe('<Legend />', () => {
  test('handlePositionInputChange', () => {
    const updateChart = jest.fn();
    const root = shallow(<Legend chart={chart} updateChart={updateChart} />);

    root.find(DoubleInput.Input).at(0).prop('onChange')(100);
    expect(updateChart.mock.calls[0][0].option.legend.left).toBe(100);

    root.find(DoubleInput.Input).at(1).prop('onChange')(200);
    expect(updateChart.mock.calls[1][0].option.legend.top).toBe(200);
  });

  test('handleColorChange', () => {
    const updateChart = jest.fn();
    const root = shallow(<Legend chart={chart} updateChart={updateChart} />);

    root.find(ColorInput).at(0).prop('onColorChange')('#000');
    expect(root.state().color).toBe('#000');
  });

  test('handleColorComplete', () => {
    const updateChart = jest.fn();
    const root = shallow(<Legend chart={chart} updateChart={updateChart} />);

    root.find(ColorInput).at(0).prop('onColorComplete')('#000');
    expect(updateChart.mock.calls[0][0].option.legend.textStyle.color).toBe('#000');
  });

  test('handleSwitchChange', () => {
    const updateChart = jest.fn();
    const root = shallow(<Legend chart={chart} updateChart={updateChart} />);

    root.find(Switch).at(0).prop('onChange')(false);
    expect(updateChart.mock.calls[0][0].option.legend.show).toBe(false);
  });

  test('handleSwitchChange', () => {
    const updateChart = jest.fn();
    const root = shallow(<Legend chart={chart} updateChart={updateChart} />);

    root.find(Switch).at(0).prop('onChange')(false);
    expect(updateChart.mock.calls[0][0].option.legend.show).toBe(false);
  });

  test('handleFontSizeChange', () => {
    const updateChart = jest.fn();
    const root = shallow(<Legend chart={chart} updateChart={updateChart} />);

    root.find(InputNumber).at(0).prop('onChange')(123);
    expect(updateChart.mock.calls[0][0].option.legend.textStyle.fontSize).toBe(123);
  });

  test('handleFontWeightChange', () => {
    const updateChart = jest.fn();
    const root = shallow(<Legend chart={chart} updateChart={updateChart} />);

    root.find(Select).at(1).prop('onChange')('bold');
    expect(updateChart.mock.calls[0][0].option.legend.textStyle.fontWeight).toBe('bold');
  });

  test('handleSelectChange', () => {
    const updateChart = jest.fn();
    const root = shallow(<Legend chart={chart} updateChart={updateChart} />);

    root.find(Select).at(0).prop('onChange')(['abc']);
    expect(updateChart.mock.calls[0][0].option.legend.data).toEqual(['abc']);
  });
});