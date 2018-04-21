import React from 'react';
import { shallow } from 'enzyme';
import { Switch, InputNumber, Select } from 'antd';
import ColorInput from '@components/color-input';
import Label from '../index';

const label = {
  show: false,
  fontSize: 12,
  fontStyle: 'normal',
  fontWeight: 'normal',
  rotate: 0,
  color: '#fff'
};

const chart = {
  type: 'bar',
  seriesItemTemplate: {
    type: 'bar',
    name: '',
    data: [120, 200, 150],
    label
  },
  option: {
    series: [{
      label,
      name: '图例1',
      data: [120, 200, 150],
      type: 'bar'
    },
    {
      label,
      name: '图例2',
      data: [90, 230, 60],
      type: 'bar'
    }]
  }
};

describe('<Label />', () => {
  test('handleShowChange', () => {
    const updateChart = jest.fn();
    const root = shallow(<Label updateChart={updateChart} chart={chart} />)
    root.find(Switch).prop('onChange')(true);

    expect(updateChart.mock.calls[0][0].seriesItemTemplate.label.show).toBe(true);
    expect(updateChart.mock.calls[0][0].option.series[0].label.show).toBe(true);
    expect(updateChart.mock.calls[0][0].option.series[1].label.show).toBe(true);
  });

  test('handleFontColorChange', () => {
    const updateChart = jest.fn();
    const root = shallow(<Label updateChart={updateChart} chart={chart} />)
    root.find(ColorInput).prop('onColorChange')('#000');

    expect(root.state().color).toBe('#000');
  });

  test('handleFontColorComplete', () => {
    const updateChart = jest.fn();
    const root = shallow(<Label updateChart={updateChart} chart={chart} />)
    root.find(ColorInput).prop('onColorComplete')('red');

    expect(updateChart.mock.calls[0][0].seriesItemTemplate.label.color).toBe('red');
    expect(updateChart.mock.calls[0][0].option.series[0].label.color).toBe('red');
    expect(updateChart.mock.calls[0][0].option.series[1].label.color).toBe('red');
  });

  test('handleFontSizeChange', () => {
    const updateChart = jest.fn();
    const root = shallow(<Label updateChart={updateChart} chart={chart} />)
    root.find(InputNumber).at(0).prop('onChange')(132);

    expect(updateChart.mock.calls[0][0].seriesItemTemplate.label.fontSize).toBe(132);
    expect(updateChart.mock.calls[0][0].option.series[0].label.fontSize).toBe(132);
    expect(updateChart.mock.calls[0][0].option.series[1].label.fontSize).toBe(132);
  });

  test('handleFontWeightChange', () => {
    const updateChart = jest.fn();
    const root = shallow(<Label updateChart={updateChart} chart={chart} />)
    root.find(Select).at(0).prop('onChange')('bold');

    expect(updateChart.mock.calls[0][0].seriesItemTemplate.label.fontWeight).toBe('bold');
    expect(updateChart.mock.calls[0][0].option.series[0].label.fontWeight).toBe('bold');
    expect(updateChart.mock.calls[0][0].option.series[1].label.fontWeight).toBe('bold');
  });

  test('handleFontStyle', () => {
    const updateChart = jest.fn();
    const root = shallow(<Label updateChart={updateChart} chart={chart} />)
    root.find(Select).at(1).prop('onChange')('italic');

    expect(updateChart.mock.calls[0][0].seriesItemTemplate.label.fontStyle).toBe('italic');
    expect(updateChart.mock.calls[0][0].option.series[0].label.fontStyle).toBe('italic');
    expect(updateChart.mock.calls[0][0].option.series[1].label.fontStyle).toBe('italic');
  });

  test('handleRotateChange', () => {
    const updateChart = jest.fn();
    const root = shallow(<Label updateChart={updateChart} chart={chart} />)
    root.find(InputNumber).at(1).prop('onChange')(90);

    expect(updateChart.mock.calls[0][0].seriesItemTemplate.label.rotate).toBe(90);
    expect(updateChart.mock.calls[0][0].option.series[0].label.rotate).toBe(90);
    expect(updateChart.mock.calls[0][0].option.series[1].label.rotate).toBe(90);
  });

  test('pie not have fontColor and rotate', () => {
    const updateChart = jest.fn();
    const root = shallow(<Label updateChart={updateChart} chart={chart} />)

    expect(root.find(ColorInput).length).toBe(1);
    expect(root.find(InputNumber).length).toBe(2);

    let pieChart = {...chart};
    pieChart.type = 'pie';

    root.setProps({
      chart:pieChart
    });

    expect(root.find(ColorInput).length).toBe(0);
    expect(root.find(InputNumber).length).toBe(1);
  });
});